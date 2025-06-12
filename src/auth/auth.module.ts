import { Module } from '@nestjs/common';
import { LoginProvider } from './providers/login.provider';
import { LoginController } from './controllers/login.controller';

@Module({
  controllers: [LoginController],
  providers: [LoginProvider],
})
export class AuthModule {}
