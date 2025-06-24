import { Injectable } from '@nestjs/common';
import { CreatePortfolioCompanyDto } from './dto/create-portfolio-company.dto';
import { handleException } from 'src/Api-Response-Messages/handle-exception';
import { PrismaService } from 'prisma/prisma.service';
import {
  companyAlreadyExistError,
  successResponse,
} from 'src/Api-Response-Messages/api-responses';

@Injectable()
export class PortfolioCompanyService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    createPortfolioCompanyDto: CreatePortfolioCompanyDto,
    userId: string,
  ) {
    try {
      const existingPortfolioCompany =
        await this.prisma.portfolioCompany.findUnique({
          where: {
            portfolio_duns_number:
              createPortfolioCompanyDto.portfolio_duns_number,
          },
        });
      if (existingPortfolioCompany) {
        return companyAlreadyExistError(
          `portfolio company with portfolio duns number ${createPortfolioCompanyDto.portfolio_duns_number} already exist`,
        );
      }
      const data = await this.prisma.portfolioCompany.create({
        data: {
          ...createPortfolioCompanyDto,
          last_updated_by: userId,
        },
      });
      return successResponse('portfolio company created successfully', data);
    } catch (error) {
      return handleException('error while creating portfolio company', error);
    }
  }
}
