/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class InstallApplicationDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  instance_id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  environment?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nodesize?: string;

  @ApiProperty()
  version?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  region?: string;
}
