/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Controller, Get, Param } from '@nestjs/common';
import { SsmService } from './ssm.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AWS SSM')
@Controller('ssm')
export class SsmController {
  constructor(private readonly ssmService: SsmService) {}

  @Get('/new/:command/:instanceid/:region')
  executeCommandOnServer(
    @Param('command') command: string,
    @Param('instanceid') instanceid: string,
    @Param('region') region: string,
  ): Promise<string> {
    return this.ssmService.executeShellCommandAndReturnOutput(
      command,
      instanceid,
      region,
    );
  }
}
