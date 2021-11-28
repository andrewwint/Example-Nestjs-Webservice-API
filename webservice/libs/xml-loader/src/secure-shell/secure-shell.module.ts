import { Module } from '@nestjs/common';
import { NotificationModule } from '@truechoice/notification';
import { SecureShellService } from './secure-shell.service';
import { NotificationService } from '@truechoice/notification';

@Module({
  imports: [NotificationModule],
  providers: [SecureShellService, NotificationService],
  exports: [SecureShellService]
})
export class SecureShellModule {}
