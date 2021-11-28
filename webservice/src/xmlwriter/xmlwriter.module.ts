/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Module } from '@nestjs/common';
import { XmlwriterService } from './xmlwriter.service';
import { ContentModule } from '../content/content.module';
import { ContentService } from '../content/content.service';

@Module({
  imports: [ContentModule],
  providers: [XmlwriterService, ContentService],
})
export class XmlwriterModule {}
