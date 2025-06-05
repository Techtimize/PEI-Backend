import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../Jwt/jwt-config';
import { JwtUserPayLoad } from '../Jwt/interfaces/interfaces';
import { handleTokenExpiryError } from 'src/Api-Response-Messages/handle-exception';
import { Role } from '@prisma/client';
@Injectable()
export class JwtProvider {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  signToken(userId: string, expiresIn: number, role: Role) {
    return this.jwtService.sign(
      { sub: userId, role },
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
      this.signToken(user.id, this.jwtConfiguration.accessTokenTtl, user.role),

      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl, user.role),
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
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });
      return payload.sub;
    } catch (error) {
      return handleTokenExpiryError(error);
    }
  }
  async findUserInDb() {}
}
