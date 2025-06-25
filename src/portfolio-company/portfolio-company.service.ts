import { Injectable } from '@nestjs/common';
import { CreatePortfolioCompanyDto } from './dto/create-portfolio-company.dto';
import { handleException } from 'src/Api-Response-Messages/handle-exception';
import { PrismaService } from 'prisma/prisma.service';
import {
  companyAlreadyExistError,
  notFoundErrorResponse,
  paginatedSuccessResponse,
  postSuccessResponse,
} from 'src/Api-Response-Messages/api-responses';
import { UpdatePortfolioCompanyDto } from './dto/update-portfolio-company.dto';
import { ValidateId } from 'src/Global-Dtos/validate.id.dto';
import { ValidationFunctions } from './validation-functions/validation.functions';
import { QueryParameterInterface } from './interfaces/interface';
import { PaginationInterface } from 'src/Api-Response-Messages/interfaces';

@Injectable()
export class PortfolioCompanyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validationFunctions: ValidationFunctions,
  ) {}
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
      return postSuccessResponse(
        'portfolio company created successfully',
        data,
      );
    } catch (error) {
      return handleException('error while creating portfolio company', error);
    }
  }

  async update(
    updatedPortfolioCompany: UpdatePortfolioCompanyDto,
    validateId: ValidateId,
    userId: string,
  ) {
    try {
      const portfolio = await this.prisma.portfolioCompany.findUnique({
        where: {
          id: validateId.id,
        },
      });

      if (!portfolio) {
        return notFoundErrorResponse(
          `portfolio company with id ${validateId.id} not found`,
        );
      }
      if (updatedPortfolioCompany.portfolio_pb_id) {
        const isTaken = await this.validationFunctions.isPortfolioPbIdTaken(
          updatedPortfolioCompany.portfolio_pb_id,
          validateId.id,
        );
        if (isTaken) {
          return companyAlreadyExistError(
            `portfolio company with portfolio_pb_id ${portfolio.portfolio_pb_id} already exists`,
          );
        }
      }

      const updatePortfolioCompanyInfo =
        await this.prisma.portfolioCompany.update({
          where: {
            id: validateId.id,
          },

          data: {
            ...updatedPortfolioCompany,
            last_updated_by: userId,
            last_update_date: new Date(),
          },
        });
      return postSuccessResponse(
        'portfolio company updated successfully',
        updatePortfolioCompanyInfo,
      );
    } catch (error) {
      return handleException('error while updating portfolio company', error);
    }
  }

  async search(query: QueryParameterInterface) {
    try {
      const whereClause = query.searchText
        ? {
            [query.searchField]: {
              contains: query.searchText,
            },
          }
        : {};

      const [data, total] = await Promise.all([
        await this.prisma.portfolioCompany.findMany({
          where: whereClause,
          skip: (query.pageNo - 1) * query.limit,
          take: query.limit,
          orderBy: { date_added: 'desc' },
        }),
        this.prisma.portfolioCompany.count({
          where: whereClause,
        }),
      ]);
      const pagination: PaginationInterface = {
        currentPage: query.pageNo,
        totalPages: Math.ceil(total / query.limit),
        remainingPages: Math.max(
          0,
          Math.ceil(total / query.limit) - query.pageNo,
        ),
      };
      return paginatedSuccessResponse(
        'portfolio companies found',
        data,
        pagination,
      );
    } catch (error) {
      return handleException('error while searching for peiCompany', error);
    }
  }
}
