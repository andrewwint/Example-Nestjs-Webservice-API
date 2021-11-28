/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Model } from 'mongoose';
import { Instance } from '../interfaces/instance.interface';
import { StackRepository } from './stack-repository';

describe('StackRepository', () => {
  let service: StackRepository;
  let instanceModel: Model<Instance>;

  beforeEach(async () => {
    service = new StackRepository(instanceModel);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.createInstance).toBeDefined();
    expect(service.deleteMany).toBeDefined();
    expect(service.find).toBeDefined();
    expect(service.findOne).toBeDefined();
    expect(service.findOneAndUpdate).toBeDefined();
  });
});
