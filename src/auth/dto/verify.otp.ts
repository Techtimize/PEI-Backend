import { IsNumber, IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
  @ApiProperty({
    example: 123456,
    description: 'The 6-digit OTP sent to the user',
  })
  @IsNotEmpty()
  @IsNumber()
  otp: number;

  @ApiProperty({
    example: 'a3f3e7b4-bd5f-4e1a-9dbe-7a5f43c998f5',
    description: 'UUID of the user to verify the OTP for',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
