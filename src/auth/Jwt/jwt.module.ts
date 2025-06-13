import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigType } from '@nestjs/config';
import jwtConfig from './jwt-config';
import { JwtProvider } from '../Jwt/jwt.provider';

@Global()
@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [jwtConfig.KEY],
      useFactory: (config: ConfigType<typeof jwtConfig>) => ({
        secret: config.secret,
        signOptions: {
          issuer: config.issuer,
          audience: config.audience,
        },
      }),
    }),
  ],
  providers: [JwtProvider],
  exports: [JwtProvider],
})
export class AuthJwtModule {}
