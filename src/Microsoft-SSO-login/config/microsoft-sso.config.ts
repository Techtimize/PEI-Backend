import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  audience: process.env.JWT_TOKEN_AUDIENCE,
  issuer: process.env.JWT_TOKEN_ISSUER,
  jwksUri: process.env.JWT_JWKS_URI,
  algorithm: process.env.JWT_ALGORITHM,
}));
