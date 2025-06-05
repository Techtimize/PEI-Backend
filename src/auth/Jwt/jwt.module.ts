import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './jwt-config';
import { JwtProvider } from '../Jwt/jwt.provider';

@Global()
@Module({
  imports: [ConfigModule.forFeature(jwtConfig), JwtModule.register({})],
  providers: [JwtProvider],
  exports: [JwtProvider],
})
export class AuthJwtModule {}
