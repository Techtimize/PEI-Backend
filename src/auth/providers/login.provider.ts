import { PrismaService } from 'prisma/prisma.service';
import { MailService } from 'src/emailModule/email.provider';
import { JwtProvider } from '../Jwt/jwt.provider';
import { LoginDto } from '../dto/login.dto';
import { handleException } from 'src/Api-Response-Messages/handle-exception';
import * as bcrypt from 'bcrypt';
import {
  otpNotVerifiedErrorResponse,
  successResponse,
  unauthorizedError,
} from 'src/Api-Response-Messages/Api-Responses';
import {
  generateOtp,
  exclude,
} from 'src/GlobalFunctions/common-global-functions';
import { Injectable } from '@nestjs/common';
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

  async login(loginDto: LoginDto) {
    try {
      const existingUser = await this.prismaService.user.findUnique({
        where: { email: loginDto.email },
      });
      if (!existingUser) {
        return unauthorizedError('invalid login credentials');
      }

      if (existingUser && !existingUser.otpVerified) {
        const safeUser = exclude(existingUser, [
          'password',
          'otp',
          'otpExpiresAt',
          'otpVerified',
        ]);
        const otp = generateOtp();
        await this.mailService.sendOtpEmail(
          existingUser.email,
          existingUser.name,
          otp,
        );
        await this.prismaService.user.update({
          where: { email: existingUser.email },
          data: {
            otp,
            otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
          },
        });

        return otpNotVerifiedErrorResponse('otp not verified', safeUser);
      }
      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        existingUser.password,
      );
      if (!isPasswordValid) {
        return unauthorizedError('invalid login credentials');
      }
      const { accessToken, refreshToken } =
        await this.jwtProvider.generateTokens({
          id: existingUser.id,
          role: existingUser.role,
        });
      const updatedUser = await this.prismaService.user.update({
        where: { id: existingUser.id },
        data: {
          refreshToken: refreshToken,
          accessToken: accessToken,
        },
      });
      const safeUser = exclude(updatedUser, [
        'password',
        'otp',
        'otpExpiresAt',
        'otpVerified',
      ]);
      return successResponse('login successful', safeUser);
    } catch (error) {
      return handleException('error while logging', error);
    }
  }
}
