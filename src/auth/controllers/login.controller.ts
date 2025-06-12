import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginProvider } from '../providers/login.provider';

import { MicrosoftTokenDto } from '../dto/microsoft.token.dto';

@ApiTags('Authentication')
@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginProvider) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 201, description: 'User logged in successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() tokenDto: MicrosoftTokenDto) {
    return await this.loginService.login(tokenDto);
  }
}
