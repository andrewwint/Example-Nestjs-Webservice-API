/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Module } from '@nestjs/common';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentModule } from './content/content.module';
import { XmlimportModule } from './xmlimport/xmlimport.module';
import { NotificationModule } from '@truechoice/notification';
import { SsmModule } from '@truechoice/ssm';
import { AuthModule } from '@truechoice/auth';
import { XmlLoaderModule } from '@truechoice/xml-loader';
import { StacksModule } from '@truechoice/stacks';
import { InstallerModule } from '@truechoice/installer';
import { StatusModule } from '@truechoice/status';

const getDatabaseConnectionURI = () => {
  let DatabaseConnectionURI: string = null;
  switch (process.env.APP_ENV) {
    case 'production':
      DatabaseConnectionURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@pinata-zuw2l.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
      break;
    case 'development':
      DatabaseConnectionURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@pinata-zuw2l.mongodb.net/development?retryWrites=true&w=majority`;
      break;
    default:
      DatabaseConnectionURI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST_PORT}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
      break;
  }
  return DatabaseConnectionURI;
};

@Module({
  imports: [
    AuthModule,
    XmlLoaderModule,
    StacksModule,
    XmlimportModule,
    InstallerModule,
    NotificationModule,
    SsmModule,
    EasyconfigModule.register({ path: '.env' }),
    MongooseModule.forRoot(getDatabaseConnectionURI(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }),
    ContentModule,
    StatusModule
  ]
})
export class AppModule {}
