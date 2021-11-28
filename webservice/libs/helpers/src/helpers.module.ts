import { Module } from '@nestjs/common';
import { HelpersService } from './helpers.service';
import { ShellExecModule } from './shell-exec/shell-exec.module';

@Module({
  providers: [HelpersService],
  exports: [HelpersService],
  imports: [ShellExecModule]
})
export class HelpersModule {}
