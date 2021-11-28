/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class UpdateInstanceDTO {
  @ApiProperty()
  _id?: string;

  @ApiProperty()
  @IsString()
  shortname?: string;

  @ApiProperty()
  @IsString()
  stackname?: string;

  @ApiProperty()
  username?: string;

  @ApiProperty()
  alias_shortname?: string;

  @ApiProperty()
  instance_id?: string;

  @ApiProperty()
  instance_type?: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  version?: string;

  @ApiProperty()
  environment?: string;

  @ApiProperty()
  ip?: string;

  @ApiProperty()
  private_ip?: string;

  @ApiProperty()
  @IsString()
  stacktype?: string;

  @ApiProperty()
  @IsString()
  servertype?: string;

  @ApiProperty()
  status?: string;

  @ApiProperty()
  @IsBoolean()
  xmlimportsupport?: Boolean;

  @ApiProperty()
  createdate?: Date;

  @ApiProperty()
  modifieddate?: Date;
}
