import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { PeiCompanyService } from './pei-company.service';
import { CreatePeiCompanyDto } from './dto/create-pei-company.dto';
import { UserId } from 'src/auth/decoraters/user-id.decorater';

@ApiTags('Pei Company')
@ApiBearerAuth('access-token')
@Controller('pei-company')
export class PeiCompanyController {
  constructor(private readonly peiCompanyService: PeiCompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new PEI company' })
  @ApiBody({ type: CreatePeiCompanyDto })
  create(
    @Body() createPeiCompanyDto: CreatePeiCompanyDto,
    @UserId() userId: string,
  ) {
    return this.peiCompanyService.create(createPeiCompanyDto, userId);
  }
}
