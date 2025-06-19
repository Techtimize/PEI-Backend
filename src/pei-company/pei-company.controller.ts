import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Query,
  Get,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { PeiCompanyService } from './pei-company.service';
import { CreatePeiCompanyDto } from './dto/create-pei-company.dto';
import { UpdatePeiCompanyDto } from './dto/update-pei-company.dto';
import { ValidateId } from 'src/Global-Dtos/validate.id.dto';
import { UserId } from 'src/auth/decoraters/user-id.decorater';
import { QueryParameterDto } from './dto/pagination.query.dto';
import { getPagination } from './validation-functions/helper-functions';
import { UserAuthenticatedGuard } from 'src/Guards/user.guard';

@ApiTags('Pei Company')
@ApiBearerAuth('access-token')
@Controller('pei-company')
export class PeiCompanyController {
  constructor(private readonly peiCompanyService: PeiCompanyService) {}
  @ApiResponse({ status: 201, description: 'PIE Company created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 403, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Company already exists' })
  @Post()
  @ApiOperation({ summary: 'Create a new PEI company' })
  @ApiBody({ type: CreatePeiCompanyDto })
  create(
    @UserId() userId: string,
    @Body() createPeiCompanyDto: CreatePeiCompanyDto,
  ) {
    return this.peiCompanyService.create(createPeiCompanyDto, userId);
  }
  @ApiResponse({ status: 201, description: 'PIE Company Updated' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 403, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Company already exists' })
  @Put('/:id')
  @ApiOperation({ summary: 'Create a new PEI company' })
  @ApiBody({ type: CreatePeiCompanyDto })
  update(
    @Param() validateId: ValidateId,
    @Body() updatePeiCompany: UpdatePeiCompanyDto,
    @UserId() userId: string,
  ) {
    return this.peiCompanyService.update(updatePeiCompany, validateId, userId);
  }
  @UseGuards(UserAuthenticatedGuard)
  @ApiResponse({ status: 201, description: 'PIE Company Found' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 403, description: 'Unauthorized' })
  @Get('searchPieCompany')
  @ApiOperation({ summary: 'Search a  PEI company' })
  searchPieCompany(@Query() query: QueryParameterDto) {
    const updatedQuery = getPagination(query);
    return this.peiCompanyService.searchForPieCompany(updatedQuery);
  }

  @UseGuards(UserAuthenticatedGuard)
  @ApiResponse({ status: 201, description: 'PIE Company Found' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 403, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get('/:id')
  @ApiOperation({ summary: 'Search a  PEI company' })
  getPeiCompanyById(@Param() validateId: ValidateId) {
    return this.peiCompanyService.getPeiCompanyById(validateId);
  }
}
