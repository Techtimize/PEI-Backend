import { Role } from '@prisma/client';

export interface JwtUserPayLoad {
  id: string;
  role: Role;
}
