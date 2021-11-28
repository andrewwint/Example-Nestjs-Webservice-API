/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class LoginUserLocalDto {
  @ApiProperty({
    description: 'Username',
    type: String
  })
  @IsString()
  @MinLength(4)
  @MaxLength(64)
  username?: string;

  @ApiProperty({
    description: 'Password or API Key',
    type: String
  })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password?: string;
}
