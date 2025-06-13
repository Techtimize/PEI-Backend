import { Injectable } from '@nestjs/common';
import { CreatePeiCompanyDto } from './dto/create-pei-company.dto';
import { handleException } from 'src/Api-Response-Messages/handle-exception';
import { PrismaService } from 'prisma/prisma.service';
import {
  companyAlreadyExistError,
  successResponse,
} from 'src/Api-Response-Messages/api-responses';

@Injectable()
export class PeiCompanyService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createPeiCompanyDto: CreatePeiCompanyDto, userId: string) {
    try {
      console.log(userId);
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
        data: createPeiCompanyDto,
      });
      return successResponse('pie company created successfully', data);
    } catch (error) {
      return handleException('error while creating peiCompany', error);
    }
  }
}
