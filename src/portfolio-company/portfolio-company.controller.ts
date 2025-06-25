import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { PortfolioCompanyService } from './portfolio-company.service';
import { CreatePortfolioCompanyDto } from './dto/create-portfolio-company.dto';
import { UserId } from 'src/auth/decoraters/user-id.decorater';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UpdatePortfolioCompanyDto } from './dto/update-portfolio-company.dto';
import { ValidateId } from 'src/Global-Dtos/validate.id.dto';
import { UserAuthenticatedGuard } from 'src/Guards/user.guard';
import { QueryParameterDto } from './dto/pagination.query.dto';
import { getPagination } from './validation-functions/helper-functions';

@ApiTags('Portfolio Company') // Swagger group/tag
@ApiBearerAuth('access-token')
@Controller('portfolio-company')
export class PortfolioCompanyController {
  constructor(
    private readonly portfolioCompanyService: PortfolioCompanyService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Portfolio Company record' })
  @ApiResponse({
    status: 201,
    description: 'Portfolio company created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input or validation failed.',
  })
  @ApiBody({ type: CreatePortfolioCompanyDto })
  create(
    @UserId() userId: string,
    @Body() createPortfolioCompanyDto: CreatePortfolioCompanyDto,
  ) {
    return this.portfolioCompanyService.create(
      createPortfolioCompanyDto,
      userId,
    );
  }

  @ApiResponse({ status: 201, description: 'Portfolio Company Updated' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 403, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Company already exists' })
  @Put('/:id')
  @ApiOperation({ summary: 'Edit a Portfolio company' })
  @ApiBody({ type: CreatePortfolioCompanyDto })
  update(
    @Param() validateId: ValidateId,
    @Body() updatedPorfolioCompany: UpdatePortfolioCompanyDto,
    @UserId() userId: string,
  ) {
    return this.portfolioCompanyService.update(
      updatedPorfolioCompany,
      validateId,
      userId,
    );
  }

  @UseGuards(UserAuthenticatedGuard)
  @ApiResponse({ status: 200, description: 'Portfolio Company Found' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 403, description: 'Unauthorized' })
  @Get()
  @ApiOperation({ summary: 'Search for a Portfolio company' })
  searchPieCompany(@Query() query: QueryParameterDto) {
    const updatedQuery = getPagination(query);
    return this.portfolioCompanyService.search(updatedQuery);
  }
}
