import { PrismaService } from 'prisma/prisma.service';
import { MailService } from 'src/emailModule/email.provider';
import { JwtProvider } from '../Jwt/jwt.provider';

import { handleException } from 'src/Api-Response-Messages/handle-exception';

import axios from 'axios';
import { successResponse } from 'src/Api-Response-Messages/api-responses';

import { Injectable } from '@nestjs/common';
import { MicrosoftTokenDto } from '../dto/microsoft.token.dto';
@Injectable()
export class LoginProvider {
  private readonly prismaService: PrismaService;
  private readonly mailService: MailService;
  private readonly jwtProvider: JwtProvider;
  constructor(
    prismaService: PrismaService,
    mailService: MailService,
    jwtProvider: JwtProvider,
  ) {
    this.prismaService = prismaService;
    this.mailService = mailService;
    this.jwtProvider = jwtProvider;
  }

  async login(accessTokenDto: MicrosoftTokenDto) {
    try {
      const res = await axios.get('https://graph.microsoft.com/v1.0/me', {
        headers: {
          Authorization: `Bearer ${accessTokenDto.access_token}`,
        },
      });
      const data = res.data;
      const { accessToken, refreshToken } =
        await this.jwtProvider.generateTokens({
          microsoftId: data.id,
          role: 'USER',
        });
      const existingUser = await this.prismaService.user.findUnique({
        where: { microsoftId: data.id },
      });
      if (existingUser) {
        const result = await this.prismaService.user.update({
          where: { microsoftId: data.id },
          data: {
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
        });
        return successResponse('login successful', result);
      }

      await this.prismaService.user.create({
        data: {
          microsoftId: data.id,
          displayName: data.displayName,
          givenName: data.givenName,
          surname: data.surname,
          email: data.mail,
          accessToken,
          refreshToken,
          role: 'USER',
        },
      });
      return successResponse('login successful', res.data);
    } catch (error) {
      return handleException('error while logging', error);
    }
  }
}
