/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import * as mongoose from 'mongoose';

export const ContentStoreSchema = new mongoose.Schema({
  gameName: { type: String, unique: true },
  roottagfolder: String,
  content: Object,
  baseattributes: [Object],
  history: [Object],
  deployments: [Object],
  stats: Object,
  createdate: { type: Date, default: Date.now },
  modifieddate: { type: Date, default: Date.now },
  version: { type: String, default: '0.0.1' }
});

ContentStoreSchema.pre('findOneAndUpdate', function() {
  const update = this.getUpdate();

  if (update.__v != null) {
    delete update.__v;
  }
  const keys = ['$set', '$setOnInsert'];
  for (const key of keys) {
    if (update[key] != null && update[key].__v != null) {
      delete update[key].__v;
      if (Object.keys(update[key]).length === 0) {
        delete update[key];
      }
    }
  }

  update.$inc = update.$inc || {};
  update.$inc.__v = 1;
});
