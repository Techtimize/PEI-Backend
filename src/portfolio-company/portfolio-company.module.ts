import { Module } from '@nestjs/common';
import { PortfolioCompanyService } from './portfolio-company.service';
import { PortfolioCompanyController } from './portfolio-company.controller';

@Module({
  controllers: [PortfolioCompanyController],
  providers: [PortfolioCompanyService],
})
export class PortfolioCompanyModule {}
