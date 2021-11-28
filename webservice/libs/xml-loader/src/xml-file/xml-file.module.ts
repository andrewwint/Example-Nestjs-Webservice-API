import { Module } from '@nestjs/common';
import { XmlFileService } from './xml-file.service';

@Module({
  providers: [XmlFileService],
  exports: [XmlFileService]
})
export class XmlFileModule {}
