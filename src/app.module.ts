import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AuthJwtModule } from './auth/Jwt/jwt.module';
import { MailModule } from './emailModule/email.module';
import { ConfigModule } from '@nestjs/config';
import { PeiCompanyModule } from './pei-company/pei-company.module';
import { JwtProviderMiddleware } from './Middlewares/token.injector.middleware';
import jwtConfig from './auth/Jwt/jwt-config'; // ✅ <-- Add this import

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
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
    PeiCompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtProviderMiddleware).forRoutes('*');
  }
}
