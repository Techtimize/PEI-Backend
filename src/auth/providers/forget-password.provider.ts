import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { MailService } from 'src/emailModule/email.provider';
import { JwtProvider } from '../Jwt/jwt.provider';
import { ForgetPasswordDto } from '../dto/forget-password.dto';
import { handleException } from 'src/Api-Response-Messages/handle-exception';
import {
  generateOtp,
  exclude,
} from 'src/GlobalFunctions/common-global-functions';
import {
  successResponse,
  unauthorizedError,
} from 'src/Api-Response-Messages/api-responses';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ForgetPasswordProvider {
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

  async forgetPassword(forgetPasswordDto: ForgetPasswordDto) {
    try {
      const existingUser = await this.prismaService.user.findUnique({
        where: { email: forgetPasswordDto.email },
      });
      if (!existingUser) {
        return unauthorizedError('user not found');
      }
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
      const safeUser = exclude(existingUser, [
        'password',
        'otp',
        'otpExpiresAt',
        'otpVerified',
        'accessToken',
        'refreshToken',
      ]);

      return successResponse('otp send to your email', safeUser);
    } catch (error) {
      return handleException('error while forget password', error);
    }
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: updatePasswordDto.userId },
      });
      if (!user) {
        return unauthorizedError('user not found');
      }
      if (
        user?.otp !== updatePasswordDto.otp ||
        user?.otpExpiresAt < new Date()
      ) {
        return unauthorizedError('invalid otp');
      }
      const hashedPassword = await bcrypt.hash(updatePasswordDto.password, 10);

      const updatedUser = await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          otp: null,
          otpExpiresAt: null,
        },
      });
      const safeUser = exclude(updatedUser, [
        'password',
        'otp',
        'otpExpiresAt',
        'otpVerified',
        'accessToken',
        'refreshToken',
      ]);
      return successResponse('password updated successfully', {
        user: safeUser,
      });
    } catch (error) {
      return handleException('error while updating password', error);
    }
  }
}
