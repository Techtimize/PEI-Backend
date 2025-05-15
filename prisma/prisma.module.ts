import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
hello
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
