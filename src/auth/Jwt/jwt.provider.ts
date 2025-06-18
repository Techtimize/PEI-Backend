import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../Jwt/jwt-config';
import { JwtUserPayLoad } from '../Jwt/interfaces/interfaces';
import { handleTokenExpiryError } from 'src/Api-Response-Messages/handle-exception';
import { PrismaService } from 'prisma/prisma.service';
import { successResponse } from 'src/Api-Response-Messages/api-responses';

@Injectable()
export class JwtProvider {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  signToken(micrsoftId: string, expiresIn: number, role: string) {
    return this.jwtService.sign(
      { sub: micrsoftId, role },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }

  async generateTokens(user: JwtUserPayLoad) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(
        user.microsoftId,
        this.jwtConfiguration.accessTokenTtl,
        user.role,
      ),

      this.signToken(
        user.microsoftId,
        this.jwtConfiguration.refreshTokenTtl,
        user.role,
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
  async verifyToken(authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException(
        'Invalid authorization format. Expected Bearer token.',
      );
    }
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      return payload;
    } catch (error) {
      console.log(error);
      return handleTokenExpiryError(error);
    }
  }
  async generateAccessTokenFromRefreshToken(authorization: string) {
    try {
      const decoded = await this.verifyToken(authorization);
      if (!('sub' in decoded)) {
        throw new UnauthorizedException('Invalid or expired token');
      }
      if (!decoded.sub) {
        throw new UnauthorizedException('Invalid or expired token');
      }

      const { accessToken, refreshToken } = await this.generateTokens({
        microsoftId: decoded.sub,
        role: 'USER',
      });
      const result = await this.prismaService.user.update({
        where: {
          microsoftId: decoded.sub,
        },
        data: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      });
      return successResponse('access token generated successfully', result);
    } catch (error) {
      console.log(error);

      return handleTokenExpiryError(error);
    }
  }
}
