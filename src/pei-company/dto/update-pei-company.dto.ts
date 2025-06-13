import { PartialType } from '@nestjs/swagger';
import { CreatePeiCompanyDto } from './create-pei-company.dto';

export class UpdatePeiCompanyDto extends PartialType(CreatePeiCompanyDto) {}
