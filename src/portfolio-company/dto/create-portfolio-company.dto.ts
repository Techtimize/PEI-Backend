import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreatePortfolioCompanyDto {
  @ApiProperty({
    description: 'Portfolio DUNS Number (Primary Key)',
    maxLength: 10,
    example: '1234567890',
  })
  @IsString()
  @Length(1, 10)
  portfolio_duns_number: string;

  @ApiProperty({
    description: 'Portfolio PB ID',
    maxLength: 20,
    example: 'PB1234567890',
  })
  @IsString()
  @Length(1, 20)
  portfolio_pb_id: string;

  @ApiProperty({
    description: 'Portfolio Swift Client Number',
    maxLength: 20,
    example: 'SWIFT0011223344',
  })
  @IsString()
  @Length(1, 20)
  portfolio_swift_client_number: string;

  @ApiProperty({
    description: 'Portfolio GMDM ID',
    maxLength: 10,
    example: 'GMDM1234',
  })
  @IsString()
  @Length(1, 10)
  portfolio_gmdm_id: string;

  @ApiProperty({
    description: 'Portfolio DGMF ID',
    maxLength: 10,
    example: 'DGMF5678',
  })
  @IsString()
  @Length(1, 10)
  portfolio_dgmf_id: string;

  @ApiProperty({
    description: 'Portfolio Swift Client Name',
    maxLength: 255,
    example: 'ACME Financial Services Ltd.',
  })
  @IsString()
  @Length(1, 255)
  portfolio_swift_client_name: string;

  @ApiProperty({
    description: 'Portfolio GMDM Legal Name',
    maxLength: 255,
    example: 'ACME Global Holdings Inc.',
  })
  @IsString()
  @Length(1, 255)
  portfolio_gmdm_legal_name: string;

  @ApiProperty({
    description: 'Portfolio PB Name',
    maxLength: 255,
    example: 'ACME Private Bank',
  })
  @IsString()
  @Length(1, 255)
  portfolio_pb_name: string;

  @ApiProperty({
    description: 'Source System',
    maxLength: 50,
    example: 'InternalToolAPI',
  })
  @IsString()
  @Length(1, 50)
  sources: string;
}
