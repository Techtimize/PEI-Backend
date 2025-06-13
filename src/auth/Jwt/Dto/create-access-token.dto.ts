import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccessTokenDto {
  @ApiProperty({
    description: 'Refresh token  ',
    example: 'eyJ0eXAiOiJKV1QiLCJh...',
  })
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
