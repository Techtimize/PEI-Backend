import {
  Controller,
  Post,
  Body,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LoginProvider } from '../providers/login.provider';

import { MicrosoftTokenDto } from '../dto/microsoft.token.dto';
// import { CreateAccessTokenDto } from '../Jwt/Dto/create-access-token.dto';
import { JwtProvider } from '../Jwt/jwt.provider';

@ApiTags('Authentication')
@Controller('auth')
export class LoginController {
  constructor(
    private readonly loginService: LoginProvider,
    private readonly jwtProvider: JwtProvider,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 201, description: 'User logged in successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() tokenDto: MicrosoftTokenDto) {
    return await this.loginService.login(tokenDto);
  }
  @Post('generate-access-token')
  @ApiOperation({ summary: 'Generate Access Token' })
  @ApiResponse({ status: 201, description: 'Token Generated Successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('access-token')
  async generateAccessToken(@Req() req: Request) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }
    return await this.jwtProvider.generateAccessTokenFromRefreshToken(
      authHeader,
    );
  }
}
