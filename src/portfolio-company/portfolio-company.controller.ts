import { Controller, Post, Body } from '@nestjs/common';
import { PortfolioCompanyService } from './portfolio-company.service';
import { CreatePortfolioCompanyDto } from './dto/create-portfolio-company.dto';
import { UserId } from 'src/auth/decoraters/user-id.decorater';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

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
}
