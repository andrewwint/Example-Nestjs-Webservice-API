/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Model } from 'mongoose';
import { User } from '../interfaces/users.interface';
import { UserRepository } from './user-repository';

describe('UserRepository', () => {
  let service: UserRepository;
  let contentStoreModel: Model<User>;

  beforeEach(async () => {
    service = new UserRepository(contentStoreModel);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.createUser).toBeDefined();
    expect(service.find).toBeDefined();
    expect(service.findOne).toBeDefined();
    expect(service.findOneSafe).toBeDefined();
    expect(service.findOneAndUpdate).toBeDefined();
    expect(service.findOneAndDelete).toBeDefined();
  });
});
