/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Document } from 'mongoose';

export interface Content extends Document {
  readonly gameName?: string;
  readonly attributes?: [object];
  readonly content?: [];
  readonly stageData?: object;
  readonly systemResource?: object;
  readonly gameObject?: string;
}
