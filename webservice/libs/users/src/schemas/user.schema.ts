/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String, unique: true },
  apikey: { type: String, unique: true },
  salt: String,
  first_name: String,
  last_name: String,
  email: String,
  roles: { type: [], default: ['user', 'api', 'content'] },
  status: String,
  createdate: { type: Date, default: Date.now },
  modifieddate: { type: Date, default: Date.now }
});
