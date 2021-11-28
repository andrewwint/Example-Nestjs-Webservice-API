/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Injectable, Logger, Inject, Optional } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { UsersService } from '@truechoice/users';
import { ExampleDataDto } from './example-data.dto';

@Injectable()
export class AuthJwtExampleService {
  private readonly logger = new Logger(AuthJwtExampleService.name);

  constructor(
    private readonly usersService: UsersService,
    @Optional() @Inject(REQUEST) private readonly request: Request
  ) {}

  async exampleAllRequest(exampleDataDto: ExampleDataDto | string): Promise<Object> {
    return this.exampleResponce(exampleDataDto);
  }

  private exampleResponce(data: any | object | ExampleDataDto): Object {
    return {
      message: 'Access granted',
      payload: data,
      username: this.request.user['username'],
      name: this.request.user['name'],
      userAgent: this.request.headers['user-agent'],
      host: this.request.headers.host,
      referer: this.request.headers.referer
    };
  }
}
