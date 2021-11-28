/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Controller, Post, Logger, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { XmlLoaderService } from '@truechoice/xml-loader';
import { LoadXmlFileDTO } from '@truechoice/xml-loader/dto/load-xml-file.dto';

@ApiTags('XML File Importer (Deprecated)')
@Controller('xmlimport')
export class XmlimportController {
  private logger = new Logger('xmlimport');
  constructor(private readonly xmlLoaderService: XmlLoaderService) {}

  @Post('/xml')
  @ApiOperation({ summary: 'Imports single XML file using XmlLoaderModule' })
  async importXml(@Body() LoadXmlFileDto: LoadXmlFileDTO): Promise<String> {
    this.logger.log(`Importing Single XML file "${LoadXmlFileDto.server}"`);
    return this.xmlLoaderService.loadXmlFile(LoadXmlFileDto);
  }

  @Post('/batchxml')
  @ApiOperation({ summary: 'Batch XML file imports using the XmlLoaderModule' })
  async importBatchXml(@Body() LoadXmlFileDto: LoadXmlFileDTO): Promise<string> {
    this.logger.log(`Importing Single XML file "${LoadXmlFileDto.server}"`);
    return this.xmlLoaderService.loadXmlBatch(LoadXmlFileDto);
  }
}
