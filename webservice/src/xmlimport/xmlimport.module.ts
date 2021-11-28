/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */
import { Module } from '@nestjs/common';
import { XmlimportController } from './xmlimport.controller';
import { XmlLoaderModule, XmlLoaderService } from '@truechoice/xml-loader';
import { StacksModule, StacksService } from '@truechoice/stacks';
import { SecureShellService } from '@truechoice/xml-loader/secure-shell/secure-shell.service';
import { AwsService } from '@truechoice/aws';
import { NotificationModule, NotificationService } from '@truechoice/notification';

@Module({
  imports: [XmlLoaderModule, StacksModule, NotificationModule],
  providers: [XmlLoaderService, StacksService, SecureShellService, AwsService, NotificationService],
  controllers: [XmlimportController]
})
export class XmlimportModule {}
