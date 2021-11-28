/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Document } from 'mongoose';

export interface Instance extends Document {
  readonly shortname?: string;
  readonly stackname?: string;
  readonly alias_stackname?: string;
  readonly instance_id?: string;
  readonly instance_type?: string;
  readonly username?: string;
  readonly name?: string;
  readonly version?: string;
  readonly environment?: string;
  readonly ip?: string;
  readonly private_ip?: string;
  readonly servertype?: string;
  readonly stacktype?: string;
  readonly status?: string;
  readonly xmlimportsupport?: boolean;
}
