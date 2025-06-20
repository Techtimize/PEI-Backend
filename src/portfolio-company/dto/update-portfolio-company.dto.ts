import { PartialType } from '@nestjs/swagger';
import { CreatePortfolioCompanyDto } from './create-portfolio-company.dto';

export class UpdatePortfolioCompanyDto extends PartialType(
  CreatePortfolioCompanyDto,
) {}
