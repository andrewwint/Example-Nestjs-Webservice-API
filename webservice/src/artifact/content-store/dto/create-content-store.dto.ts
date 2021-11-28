/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { ApiProperty } from '@nestjs/swagger';

export class CreateContentStoreDTO {
  @ApiProperty()
  gameName?: String;

  @ApiProperty()
  rootagfolder?: String;

  @ApiProperty()
  content?: Object;

  @ApiProperty()
  baseattributes?: [Object];

  @ApiProperty()
  history?: [Object];

  @ApiProperty()
  deployments?: [Object];

  @ApiProperty()
  stats?: Object;

  @ApiProperty()
  createdate?: Date;

  @ApiProperty()
  modifieddate?: Date;

  @ApiProperty()
  version?: String;

  @ApiProperty()
  __v?: number;
}
