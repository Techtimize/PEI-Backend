import { Module } from '@nestjs/common';
import { PeiCompanyService } from './pei-company.service';
import { PeiCompanyController } from './pei-company.controller';

@Module({
  controllers: [PeiCompanyController],
  providers: [PeiCompanyService],
})
export class PeiCompanyModule {}
