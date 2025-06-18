import { Module } from '@nestjs/common';
import { PeiCompanyService } from './pei-company.service';
import { PeiCompanyController } from './pei-company.controller';
import { ValidationFunctions } from './validation-functions/validation.functions';

@Module({
  controllers: [PeiCompanyController],
  providers: [PeiCompanyService, ValidationFunctions],
})
export class PeiCompanyModule {}
