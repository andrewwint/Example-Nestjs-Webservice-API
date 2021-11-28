/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Document } from 'mongoose';

export interface User extends Document {
  readonly username?: string;
  readonly password?: string;
  readonly apikey?: string;
  readonly salt?: string;
  readonly first_name?: string;
  readonly last_name?: string;
  readonly email?: string;
  readonly roles?: string[];
  readonly status?: string;
  readonly createdate?: Date;
  readonly modifieddate?: Date;
}
