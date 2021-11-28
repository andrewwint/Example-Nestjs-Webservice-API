/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import * as mongoose from 'mongoose';

export const ContentSchema = new mongoose.Schema({
  gameName: String,
  attributes: Array,
  surveyQuestionMap: Object,
  groupedAttributes: Object,
  systemResource: Object,
  stageData: Object,
  subGameName: String,
  gameObject: String,
  subGameObject: String,
  allTradeoffsSet: Boolean,
  instanceLevel: Boolean,
  instanceAttribute: Boolean,
  systemResourceObject: String,
  controlsResourceObject: String,
  systemText: Object,
  controls: Array,
  gameInstanceName: String,
  subgameInstanceName: String,
  levels: mongoose.SchemaTypes.Mixed,
  createdate: { type: Date, default: Date.now },
  modifieddate: { type: Date, default: Date.now },
  version: { type: Number, default: 1 },
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ContentHistory' }],
});

ContentSchema.pre('findOneAndUpdate', function() {
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

export const ContentHistorySchema = new mongoose.Schema({
  content_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Content' },
  version_history: Number,
  gameName: String,
  attributes: Array,
  surveyQuestionMap: Object,
  groupedAttributes: Object,
  systemResource: Object,
  stageData: Object,
  subGameName: String,
  gameObject: String,
  subGameObject: String,
  allTradeoffsSet: Boolean,
  instanceLevel: Boolean,
  instanceAttribute: Boolean,
  systemResourceObject: String,
  controlsResourceObject: String,
  systemText: Object,
  controls: Array,
  gameInstanceName: String,
  subgameInstanceName: String,
  levels: mongoose.SchemaTypes.Mixed,
  createdate: { type: Date, default: Date.now },
  modifieddate: { type: Date, default: Date.now },
  version: { type: Number, default: 1 },
});
