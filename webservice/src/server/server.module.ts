/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServerService } from './server.service';
import { ServerController } from './server.controller';
import { ServerSchema } from './schemas/server.schema';
import { AwsModule } from '../aws/aws.module';
import { NotificationModule } from '@truechoice/notification';
import { AwsService } from 'src/aws/aws.service';
import { ServerAuthController } from './server-auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Server', schema: ServerSchema }]),
    AwsModule,
    NotificationModule
  ],
  providers: [ServerService, AwsService],
  controllers: [ServerController, ServerAuthController],
  exports: [ServerService]
})
export class ServerModule {}
