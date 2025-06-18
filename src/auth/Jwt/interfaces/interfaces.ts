export interface JwtUserPayLoad {
  role: string;
  microsoftId: string;
}

export interface JwtTokenVerificationResponse {
  sub: string;
  role: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}
