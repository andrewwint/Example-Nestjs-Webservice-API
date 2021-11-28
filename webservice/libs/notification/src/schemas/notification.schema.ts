/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import * as mongoose from 'mongoose';

export const NotificationSchema = new mongoose.Schema({
  user: String,
  message: String,
  topic: String,
  createdate: { type: Date, default: Date.now }
});