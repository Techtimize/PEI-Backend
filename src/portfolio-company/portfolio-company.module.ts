import { Module } from '@nestjs/common';
import { PortfolioCompanyService } from './portfolio-company.service';
import { PortfolioCompanyController } from './portfolio-company.controller';
import { ValidationFunctions } from './validation-functions/validation.functions';

@Module({
  controllers: [PortfolioCompanyController],
  providers: [PortfolioCompanyService, ValidationFunctions],
})
export class PortfolioCompanyModule {}
