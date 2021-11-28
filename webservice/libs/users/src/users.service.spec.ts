/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepository } from './repositories/user-repository';

const mockUserRespository = () => ({});

describe('UsersService', () => {
  let service: UsersService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: UserRepository, useFactory: mockUserRespository }]
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.apikey).toBeDefined();
    expect(service.createUser).toBeDefined();
    expect(service.getUserById).toBeDefined();
    expect(service.getUsers).toBeDefined();
    expect(service.hash).toBeDefined();
    expect(service.password).toBeDefined();
    expect(service.refreshUser).toBeDefined();
    expect(service.removeUserById).toBeDefined();
    expect(service.updateApiKeyById).toBeDefined();
    expect(service.updatePasswordById).toBeDefined();
    expect(service.updateUserById).toBeDefined();
    expect(service.validateUser).toBeDefined();
    expect(service.validUser).toBeDefined();
    expect(service.validateHashedPasswordOrApiKey).toBeDefined();
  });

  describe('hash', () => {
    it('should hash strings with a salt', async () => {
      const hash = await service.hash('password', '$2b$10$UUQnLrI4lYz8jwIEozdN/e');
      expect(hash).toBe('$2b$10$UUQnLrI4lYz8jwIEozdN/e8DlLNMWRwx38Q1DbygrbDqXcDPjF9XC');
    });
  });
});
