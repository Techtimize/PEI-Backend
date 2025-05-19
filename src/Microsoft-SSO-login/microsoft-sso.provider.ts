import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import microsoftSsoConfig from './config/microsoft-sso.config';
import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';
import { VerifyTokenDto } from './dtos/verify-token.dto';

@Injectable()
export class MicrosoftAuthService {
  private readonly jwks;

  constructor(
    @Inject(microsoftSsoConfig.KEY)
    private readonly config: ConfigType<typeof microsoftSsoConfig>,
  ) {
    this.jwks = jwksClient({
      jwksUri: this.config.jwksUri,
    });
  }

  /**
   * Get the signing key for a token header's `kid`.
   */
  private async getSigningKey(kid: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.jwks.getSigningKey(kid, (err, key) => {
        if (err) return reject(err);
        const signingKey = key.getPublicKey();
        resolve(signingKey);
      });
    });
  }

  /**
   * Verifies the Microsoft-issued token and returns user info.
   */
  async verifyToken(token: VerifyTokenDto) {
    const decodedHeader = jwt.decode(token.token, { complete: true });

    if (!decodedHeader?.header) {
      throw new UnauthorizedException('Invalid token header');
    }

    const kid = decodedHeader.header.kid;
    const signingKey = await this.getSigningKey(kid);

    return new Promise((resolve, reject) => {
      jwt.verify(
        token.token,
        signingKey,
        {
          algorithms: ['RS256'],
          audience: this.config.audience,
          issuer: this.config.issuer,
        },
        (err, decoded) => {
          if (err) return reject(new UnauthorizedException('Invalid token'));
          resolve(decoded);
        },
      );
    });
  }

  async fetchUserFromToken(token: VerifyTokenDto) {
    const payload = await this.verifyToken(token);

    console.log('Decoded payload:', payload);
    return payload;
  }
}
