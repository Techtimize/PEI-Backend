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
  userAlreadyExistError,
} from 'src/Api-Response-Messages/Api-Responses';
import { MailService } from 'src/emailModule/email.provider';
import { VerifyOtpDto } from '../dto/verify.otp';
import { JwtProvider } from '../Jwt/jwt.provider';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ResendOtpDto } from '../dto/resend-otp.dto';

@Injectable()
export class UserCreationService {
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
  async signup(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.prismaService.user.findUnique({
        where: { email: createUserDto.email },
      });
      if (existingUser?.otpVerified) {
        return userAlreadyExistError('user already exists');
      }
      const otp = generateOtp();
      if (existingUser && !existingUser.otpVerified) {
        await this.prismaService.user.update({
          where: { email: createUserDto.email },
          data: {
            otp,
            otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
          },
        });
        await this.mailService.sendOtpEmail(
          createUserDto.email,
          createUserDto.name,
          otp,
        );
        const safeUser = exclude(existingUser, [
          'password',
          'otp',
          'otpExpiresAt',
          'otpVerified',
        ]);
        return successResponse('otp send to your email', safeUser);
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const user = await this.prismaService.user.create({
        data: {
          ...createUserDto,
          otp: otp,
          otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
          otpVerified: false,
          role: Role.USER,
          password: hashedPassword,
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
      const { accessToken, refreshToken } =
        await this.jwtProvider.generateTokens({
          id: verifyOtpDto.userId,
          role: Role.USER,
        });
      const updatedUser = await this.prismaService.user.update({
        where: { id: verifyOtpDto.userId },
        data: {
          otpVerified: true,
          otp: null,
          otpExpiresAt: null,
          accessToken: accessToken,
          refreshToken: refreshToken,
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
  async resendOtp(resendOtpDto: ResendOtpDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: resendOtpDto.userId },
      });
      if (!user) {
        return unauthorizedError('user not found');
      }
      const otp = generateOtp();
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          otp,
          otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
        },
      });
      await this.mailService.sendOtpEmail(user.email, user.name, otp);
      const safeUser = exclude(user, [
        'password',
        'otp',
        'otpExpiresAt',
        'otpVerified',
        'accessToken',
        'refreshToken',
      ]);

      return successResponse('otp send to your email', safeUser);
    } catch (error) {
      return handleException('error while resending otp', error);
    }
  }
}
