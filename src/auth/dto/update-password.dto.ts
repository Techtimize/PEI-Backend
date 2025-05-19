import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    example: 'newpassword123',
    description: 'The new password of the user',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: 'a3f3e7b4-bd5f-4e1a-9dbe-7a5f43c998f5',
    description: 'UUID of the user to update the password for',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
  @ApiProperty({
    example: 123456,
    description: 'The OTP sent to the user for verification',
  })
  @IsNotEmpty()
  @IsNumber()
  otp: number;
}
