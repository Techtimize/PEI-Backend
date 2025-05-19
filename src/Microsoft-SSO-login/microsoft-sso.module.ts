import { Module } from '@nestjs/common';
import { MicrosoftAuthController } from './microsoft-sso.controller';
import { MicrosoftAuthService } from './microsoft-sso.provider';

@Module({
  controllers: [MicrosoftAuthController],
  providers: [MicrosoftAuthService],
})
export class MicrosoftAuthModule {}
