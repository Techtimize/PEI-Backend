import { IsNumber, IsUUID, IsNotEmpty } from 'class-validator';
export class VerifyOtpDto {
  @IsNotEmpty()
  @IsNumber()
  otp: number;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
