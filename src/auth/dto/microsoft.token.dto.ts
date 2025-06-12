import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MicrosoftTokenDto {
  @ApiProperty({
    description: 'Access token received from Microsoft OAuth2 login',
    example: 'eyJ0eXAiOiJKV1QiLCJh...',
  })
  @IsString()
  @IsNotEmpty()
  access_token: string;
}
