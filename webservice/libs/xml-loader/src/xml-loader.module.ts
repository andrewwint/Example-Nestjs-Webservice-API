import { Module } from '@nestjs/common';
import { XmlLoaderService } from './xml-loader.service';
import { XmlLoaderController } from './xml-loader.controller';
import { StacksModule } from '@truechoice/stacks';
import { AuthModule } from '@truechoice/auth';
import { SecureShellModule } from './secure-shell/secure-shell.module';
import { XmlFileModule } from './xml-file';

@Module({
  imports: [StacksModule, AuthModule, SecureShellModule, XmlFileModule],
  providers: [XmlLoaderService],
  exports: [XmlLoaderService],
  controllers: [XmlLoaderController]
})
export class XmlLoaderModule {}
