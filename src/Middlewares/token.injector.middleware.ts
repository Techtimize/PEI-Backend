// src/common/middleware/jwt-provider.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtProvider } from 'src/auth/Jwt/jwt.provider';
interface Injector {
  get: (provider: unknown) => JwtProvider | undefined;
}

@Injectable()
export class JwtProviderMiddleware implements NestMiddleware {
  constructor(private readonly jwtProvider: JwtProvider) {}

  use(req: Request, res: Response, next: NextFunction) {
    (req as Request & { injector: Injector }).injector = {
      get: (provider) => {
        if (provider === JwtProvider) return this.jwtProvider;
        return null;
      },
    };

    next();
  }
}
