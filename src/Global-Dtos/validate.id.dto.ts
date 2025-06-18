import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateId {
  @ApiProperty({
    description: 'UUID ObjectId',
    type: String,
    example: '19d6d274-15ce-48a7-a7fb-3ec7845eeed7',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
