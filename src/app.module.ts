import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AuthJwtModule } from './auth/Jwt/jwt.module';
import { MailModule } from './emailModule/email.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: (() => {
        switch (process.env.NODE_ENV) {
          case 'dev':
            return '.env.dev';
          case 'prod':
            return '.env.prod';
          case 'local':
            return '.env';
          default:
            return '.env';
        }
      })(),
    }),
    PrismaModule,
    AuthModule,
    AuthJwtModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
