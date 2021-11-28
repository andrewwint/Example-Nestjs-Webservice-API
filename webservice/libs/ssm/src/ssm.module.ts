import { Module } from '@nestjs/common';
import { SsmService } from './ssm.service';
import { SsmController } from './ssm.controller';

@Module({
  providers: [SsmService],
  controllers: [SsmController],
  exports: [SsmService],
})
export class SsmModule {}
