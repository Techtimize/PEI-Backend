import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-auth.dto';
import { UserCreationService } from '../providers/user.creation.provider';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VerifyOtpDto } from '../dto/verify.otp';
import { ResendOtpDto } from '../dto/resend-otp.dto';
import { ForgetPasswordDto } from '../dto/forget-password.dto';
import { ForgetPasswordProvider } from '../providers/forget-password.provider';
import { UpdatePasswordDto } from '../dto/update-password.dto';

@ApiTags('Authentication')
@Controller('auth')
export class UserCreationController {
  constructor(
    private readonly userService: UserCreationService,
    private readonly forgetPasswordService: ForgetPasswordProvider,
  ) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.userService.signup(createUserDto);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP for user' })
  @ApiResponse({ status: 200, description: 'OTP verified successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return await this.userService.verifyOtp(verifyOtpDto);
  }
  @Post('resend-otp')
  @ApiOperation({ summary: 'Resend OTP for user' })
  @ApiResponse({ status: 200, description: 'OTP resent successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async resendOtp(@Body() resendOtpDto: ResendOtpDto) {
    return await this.userService.resendOtp(resendOtpDto);
  }
  @Post('forget-password')
  @ApiOperation({ summary: 'Forget password' })
  @ApiResponse({ status: 200, description: 'OTP sent successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async forgetPassword(@Body() forgetPassword: ForgetPasswordDto) {
    return await this.forgetPasswordService.forgetPassword(forgetPassword);
  }

  @Post('update-password')
  @ApiOperation({ summary: 'Update password' })
  @ApiResponse({ status: 200, description: 'Password updated successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return await this.forgetPasswordService.updatePassword(updatePasswordDto);
  }
}
