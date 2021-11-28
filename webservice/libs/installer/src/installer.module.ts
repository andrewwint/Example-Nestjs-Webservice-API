import { Module } from '@nestjs/common';
import { InstallerService } from './installer.service';
import { InstallerController } from './installer.controller';
import { NotificationModule } from '@truechoice/notification';
import { StacksModule } from '@truechoice/stacks';
import { StackRepository } from '@truechoice/stacks/repositories/stack-repository';
import { SsmModule, SsmService } from '@truechoice/ssm';

@Module({
  imports: [NotificationModule, StacksModule, SsmModule],
  providers: [InstallerService, StackRepository, SsmService],
  exports: [InstallerService],
  controllers: [InstallerController]
})
export class InstallerModule {}
