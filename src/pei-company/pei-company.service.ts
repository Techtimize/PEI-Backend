import { Injectable } from '@nestjs/common';
import { CreatePeiCompanyDto } from './dto/create-pei-company.dto';
import { handleException } from 'src/Api-Response-Messages/handle-exception';
import { PrismaService } from 'prisma/prisma.service';
import {
  companyAlreadyExistError,
  notFoundErrorResponse,
  paginatedSuccessResponse,
  successResponse,
} from 'src/Api-Response-Messages/api-responses';
import { UpdatePeiCompanyDto } from './dto/update-pei-company.dto';
import { ValidateId } from 'src/Global-Dtos/validate.id.dto';
import { ValidationFunctions } from './validation-functions/validation.functions';
import { QueryParameterInterface } from './interfaces/interface';
import { PaginationInterface } from 'src/Api-Response-Messages/interfaces';

@Injectable()
export class PeiCompanyService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validationFunctions: ValidationFunctions,
  ) {}
  async create(createPeiCompanyDto: CreatePeiCompanyDto, userId: string) {
    try {
      const existingPeiCompany = await this.prismaService.peiCompany.findUnique(
        {
          where: { pei_pb_id: createPeiCompanyDto.pei_pb_id },
        },
      );
      if (existingPeiCompany) {
        return companyAlreadyExistError(
          `pei company with pei_pb_id ${createPeiCompanyDto.pei_pb_id} already exist`,
        );
      }
      const data = await this.prismaService.peiCompany.create({
        data: { ...createPeiCompanyDto, last_updated_by: userId },
      });
      return successResponse('pie company created successfully', data);
    } catch (error) {
      return handleException('error while creating peiCompany', error);
    }
  }
  async update(
    updatePeiCompanyDto: UpdatePeiCompanyDto,
    validateId: ValidateId,
    userId: string,
  ) {
    try {
      const pie = await this.prismaService.peiCompany.findUnique({
        where: {
          id: validateId.id,
        },
      });

      if (!pie) {
        return notFoundErrorResponse(
          `pei company with id ${validateId.id} not found`,
        );
      }
      const isTaken = await this.validationFunctions.isPeiPbIdTaken(
        updatePeiCompanyDto.pei_pb_id,
        validateId.id,
      );
      if (isTaken) {
        return companyAlreadyExistError(
          `pei company with pei_pb_id ${updatePeiCompanyDto.pei_pb_id} already exists`,
        );
      }

      const updatePieCompanyInfo = await this.prismaService.peiCompany.update({
        where: {
          id: validateId.id,
        },

        data: {
          ...updatePeiCompanyDto,
          last_updated_by: userId,
          last_update_date: new Date(),
        },
      });
      return successResponse(
        'pei company updated successfully',
        updatePieCompanyInfo,
      );
    } catch (error) {
      return handleException('error while updating peiCompany', error);
    }
  }

  async searchForPieCompany(query: QueryParameterInterface) {
    try {
      const whereClause = query.searchText
        ? {
            [query.searchField]: {
              contains: query.searchText,
            },
          }
        : {};

      const [data, total] = await Promise.all([
        await this.prismaService.peiCompany.findMany({
          where: whereClause,
          skip: (query.pageNo - 1) * query.limit,
          take: query.limit,
          orderBy: { date_added: 'desc' },
        }),
        this.prismaService.peiCompany.count({
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
      return paginatedSuccessResponse('pie companies found', data, pagination);
    } catch (error) {
      return handleException('error while searching for peiCompany', error);
    }
  }
  async getPeiCompanyById(validateId: ValidateId) {
    try {
      const pie = await this.prismaService.peiCompany.findUnique({
        where: {
          id: validateId.id,
        },
      });
      if (!pie) {
        return notFoundErrorResponse(
          `pei company with id ${validateId.id} not found`,
        );
      }
      return successResponse('pie company found', pie);
    } catch (error) {
      return handleException('error while searching for peiCompany', error);
    }
  }
}
