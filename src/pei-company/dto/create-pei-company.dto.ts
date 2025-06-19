import { ApiProperty } from '@nestjs/swagger';
import { Length, IsString, IsEmail, IsBoolean } from 'class-validator';

export class CreatePeiCompanyDto {
  @ApiProperty({ example: 'PB12345' })
  @IsString()
  @Length(0, 20)
  pei_pb_id: string;

  @ApiProperty({ example: 'SWIFT98765' })
  @IsString()
  @Length(0, 20)
  pei_swift_client_number: string;

  @ApiProperty({ example: 'GMDM1234' })
  @IsString()
  @Length(0, 10)
  pei_gmdm_id: string;

  @ApiProperty({ example: 'DGMF5678' })
  @IsString()
  @Length(0, 10)
  pei_dgmf_id: string;

  @ApiProperty({ example: 'DUNS00123' })
  @IsString()
  @Length(0, 10)
  pei_duns_number: string;

  @ApiProperty({
    example: 'Global Corp Ltd.',
    description:
      'From SWIFT, in order of preference: US Parent → US Child → Global Parent → Global Child client name',
  })
  @IsString()
  @Length(0, 255)
  pei_swift_client_name: string;

  @ApiProperty({ example: 'Global Corp Legal Entity' })
  @IsString()
  @Length(0, 255)
  pei_gmdm_legal_name: string;

  @ApiProperty({ example: 'Internal' })
  @IsString()
  @Length(0, 50)
  view_type: string;

  @ApiProperty({ example: 'Included' })
  @IsString()
  @Length(0, 50)
  tableau_inclusion_status: string;

  @ApiProperty({ example: 'Analytics Team' })
  @IsString()
  @Length(0, 50)
  requested_by_team: string;

  @ApiProperty({ example: 'contact@example.com' })
  @IsEmail()
  @Length(0, 50)
  contact_email: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  priority_for_feedback: boolean;

  @ApiProperty({ example: 'Reporting Team A' })
  @IsString()
  @Length(0, 50)
  reporting_team: string;

  @ApiProperty({ example: 'FY24-Q1' })
  @IsString()
  @Length(0, 20)
  fy_period_added: string;

  @ApiProperty({ example: 'PB Account Name' })
  @IsString()
  @Length(0, 50)
  pei_pb_name: string;

  @ApiProperty({ example: 'Internal, External' })
  @IsString()
  @Length(0, 50)
  sources: string;
}
