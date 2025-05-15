import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
hello
husky not working
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
