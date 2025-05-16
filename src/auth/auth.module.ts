import { Module } from '@nestjs/common';
import { UserCreationService } from './providers/user.creation.provider';
import { UserCreationController } from './controllers/user.creation.controller';

@Module({
  controllers: [UserCreationController],
  providers: [UserCreationService],
})
export class AuthModule {}
