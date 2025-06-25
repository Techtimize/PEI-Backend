import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ValidationFunctions {
  constructor(private readonly prisma: PrismaService) {}
  async isPortfolioPbIdTaken(
    portfolio_pb_id: string,
    excludeId: string,
  ): Promise<boolean> {
    const company = await this.prisma.portfolioCompany.findFirst({
      where: {
        portfolio_pb_id,
        NOT: { id: excludeId },
      },
    });
    console.log('🚀 ~ ValidationFunctions ~ portfolio_pb_id:', portfolio_pb_id);
    console.log('🚀 ~ ValidationFunctions ~ excludeId:', excludeId);
    console.log('🚀 ~ ValidationFunctions ~ company:', company);
    return !!company;
  }
}
