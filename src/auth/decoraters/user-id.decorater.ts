import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtProvider } from '../Jwt/jwt.provider';

const getJwtProvider = (ctx: ExecutionContext): JwtProvider => {
  const request = ctx.switchToHttp().getRequest();
  const jwtProvider = request.injector?.get?.(JwtProvider);

  if (!jwtProvider) {
    throw new UnauthorizedException('JwtProvider not available in context');
  }

  return jwtProvider;
};

export const UserId = createParamDecorator(
  async (_data: unknown, ctx: ExecutionContext): Promise<number> => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const jwtProvider = getJwtProvider(ctx);
    const decoded = await jwtProvider.verifyToken(authHeader);

    if (!decoded) {
      throw new UnauthorizedException('Invalid token or user not found');
    }

    return decoded?.sub;
  },
);
