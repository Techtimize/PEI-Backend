import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
 how are u sa
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
