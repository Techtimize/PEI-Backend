import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ResendOtpDto {
  @ApiProperty({
    example: 'a3f3e7b4-bd5f-4e1a-9dbe-7a5f43c998f5',
    description: 'UUID of the user to resend the OTP for',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
