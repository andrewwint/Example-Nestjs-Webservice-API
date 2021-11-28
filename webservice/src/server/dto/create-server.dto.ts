/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateServerDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  shortname?: String;

  @IsString()
  @IsNotEmpty()
  stackname?: String;

  @ApiProperty()
  username?: String;

  @ApiProperty()
  alias_shortname?: string;

  @ApiProperty()
  instance_id?: string;

  @ApiProperty()
  instance_type?: string;

  @ApiProperty()
  name?: String;

  @ApiProperty()
  version?: String;

  @ApiProperty()
  environment?: String;

  @ApiProperty()
  @IsNotEmpty()
  ip?: String;

  @ApiProperty()
  private_ip?: String;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  stacktype?: String;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  servertype?: String;

  @ApiProperty()
  status?: String;

  @ApiProperty()
  @IsBoolean()
  xmlimportsupport?: Boolean;

  @ApiProperty()
  createdate?: Date;

  @ApiProperty()
  modifieddate?: Date;
}
