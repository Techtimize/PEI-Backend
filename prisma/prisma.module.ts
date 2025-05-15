import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
 how are u 
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
