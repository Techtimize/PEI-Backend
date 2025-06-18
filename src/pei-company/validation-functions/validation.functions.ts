import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ValidationFunctions {
  constructor(private readonly prisma: PrismaService) {}
  async isPeiPbIdTaken(pei_pb_id: string, excludeId: string): Promise<boolean> {
    const company = await this.prisma.peiCompany.findFirst({
      where: {
        pei_pb_id,
        NOT: { id: excludeId },
      },
    });
    return !!company;
  }
}
