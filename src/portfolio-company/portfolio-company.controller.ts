import { Controller, Post, Body, UseGuards, Param, Get } from '@nestjs/common';
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
import { UserAuthenticatedGuard } from 'src/Guards/user.guard';
import { ValidateId } from 'src/Global-Dtos/validate.id.dto';

@ApiTags('Portfolio Company') // Swagger group/tag
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
  @ApiBearerAuth('access-token')
  @UseGuards(UserAuthenticatedGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get Portfolio Company by ID' })
  @ApiResponse({ status: 200, description: 'Portfolio company found.' })
  @ApiResponse({ status: 404, description: 'Portfolio company not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  getPortfolioCompanyById(@Param() validateId: ValidateId) {
    return this.portfolioCompanyService.getPortfolioCompanyById(validateId);
  }
}
