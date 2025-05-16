import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-auth.dto';
import { handleException } from 'src/Api-Response-Messages/handle-exception';
import { PrismaService } from 'prisma/prisma.service';
import {
  generateOtp,
  exclude,
} from 'src/GlobalFunctions/common-global-functions';
import {
  successResponse,
  unauthorizedError,
} from 'src/Api-Response-Messages/Api-Responses';
import { MailService } from 'src/emailModule/email.provider';
import { VerifyOtpDto } from '../dto/verify.otp';

@Injectable()
export class UserCreationService {
  private readonly prismaService: PrismaService;
  private readonly mailService: MailService;
  constructor(prismaService: PrismaService, mailService: MailService) {
    this.prismaService = prismaService;
    this.mailService = mailService;
  }
  async signup(createUserDto: CreateUserDto) {
    try {
      const otp = generateOtp();
      const user = await this.prismaService.user.create({
        data: {
          ...createUserDto,
          otp: otp,
          otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
          otpVerified: false,
        },
      });
      await this.mailService.sendOtpEmail(
        createUserDto.email,
        createUserDto.name,
        otp,
      );
      const safeUser = exclude(user, [
        'password',
        'otp',
        'otpExpiresAt',
        'otpVerified',
      ]);

      return successResponse('otp send to your email', safeUser);
    } catch (error) {
      return handleException('error while signup', error);
    }
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: verifyOtpDto.userId },
      });
      if (!user) {
        return unauthorizedError('user not found');
      }
      if (user.otp !== verifyOtpDto.otp || user.otpExpiresAt < new Date()) {
        return unauthorizedError('invalid or expired otp');
      }
      const updatedUser = await this.prismaService.user.update({
        where: { id: verifyOtpDto.userId },
        data: {
          otpVerified: true,
          otp: null,
          otpExpiresAt: null,
        },
      });
      const safeUser = exclude(updatedUser, [
        'password',
        'otp',
        'otpExpiresAt',
        'otpVerified',
      ]);
      return successResponse('otp verified successfully', safeUser);
    } catch (error) {
      return handleException('error while verifying otp', error);
    }
  }
}
