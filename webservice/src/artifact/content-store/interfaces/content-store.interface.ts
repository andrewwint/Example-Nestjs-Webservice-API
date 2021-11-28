/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Document } from 'mongoose';

export interface ContentStore extends Document {
  readonly gameName?: String;
  readonly rootagfolder?: String;
  readonly baseattributes?: [];
  readonly content?: Object;
  readonly history?: [];
  readonly deployments?: [Object];
  readonly stats?: Object;
  readonly version?: String;
  readonly __v?: number;
}
