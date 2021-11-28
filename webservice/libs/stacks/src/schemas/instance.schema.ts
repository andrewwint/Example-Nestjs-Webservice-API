/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import * as mongoose from 'mongoose';

export const InstanceSchema = new mongoose.Schema({
  shortname: { type: String, unique: true },
  alias_shortname: { type: String, unique: true, sparse: true },
  stackname: String,
  instance_id: String,
  instance_type: String,
  username: String,
  name: String,
  environment: String,
  ip: String,
  private_ip: String,
  servertype: String,
  stacktype: String,
  status: String,
  version: String,
  xmlimportsupport: { type: Boolean, default: true },
  createdate: { type: Date, default: Date.now },
  modifieddate: { type: Date, default: Date.now }
});
