import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginProvider } from '../providers/login.provider';
import { LoginDto } from '../dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginProvider) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 201, description: 'User logged in successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 423,
    description: 'User have not completed his otp verification',
  })
  async login(@Body() loginDto: LoginDto) {
    return await this.loginService.login(loginDto);
  }
}
