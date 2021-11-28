/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { IsNotEmpty, IsBase64, IsString } from 'class-validator';

export class LoadXmlFileDTO {
  @IsNotEmpty()
  server: string;

  @IsNotEmpty()
  @IsBase64()
  payload: {};

  @IsString()
  deleteXml?: string;
}
