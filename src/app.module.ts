import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AuthJwtModule } from './auth/Jwt/jwt.module';
import { MailModule } from './emailModule/email.module';

@Module({
  imports: [PrismaModule, AuthModule, AuthJwtModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
