import { Module } from '@nestjs/common';
import { ShellExecService } from './shell-exec.service';

@Module({
  providers: [ShellExecService]
})
export class ShellExecModule {}
