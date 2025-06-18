import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { JwtProvider } from 'src/auth/Jwt/jwt.provider';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserAuthenticatedGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtProvider: JwtProvider,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const token = request.headers['authorization']?.split(' ')[1];

    if (!authHeader?.startsWith('Bearer ')) {
      throw new ForbiddenException(
        'Authorization token is missing or malformed',
      );
    }
    if (!token) {
      throw new ForbiddenException('Authorization token is missing');
    }
    const decoded = await this.jwtProvider.verifyToken(authHeader);
    const user = await this.prisma.user.findUnique({
      where: { microsoftId: decoded.sub },
    });
    if (user && user.role === 'USER') {
      return true;
    } else {
      throw new ForbiddenException('User not found or not authorized');
    }
  }
}
