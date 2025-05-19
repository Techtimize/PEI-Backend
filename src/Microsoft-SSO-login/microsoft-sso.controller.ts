import { Body, Controller, Post } from '@nestjs/common';
import { MicrosoftAuthService } from './microsoft-sso.provider';
import { VerifyTokenDto } from './dtos/verify-token.dto';

@Controller('microsoft-auth')
export class MicrosoftAuthController {
  constructor(private readonly authService: MicrosoftAuthService) {}

  @Post('verify')
  async verify(@Body() verifyTokenDto: VerifyTokenDto) {
    const userInfo = await this.authService.verifyToken(verifyTokenDto);
    return {
      message: 'Token verified successfully',
      user: userInfo,
    };
  }
}
