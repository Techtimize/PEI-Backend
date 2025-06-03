import { Module } from '@nestjs/common';
import { UserCreationService } from './providers/user.creation.provider';
import { UserCreationController } from './controllers/user.creation.controller';
import { LoginProvider } from './providers/login.provider';
import { LoginController } from './controllers/login.controller';
import { ForgetPasswordProvider } from './providers/forget-password.provider';

@Module({
  controllers: [UserCreationController, LoginController],
  providers: [UserCreationService, LoginProvider, ForgetPasswordProvider],
})
export class AuthModule {}
