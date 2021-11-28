/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Test, TestingModule } from '@nestjs/testing';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';

const mockContentService = () => ({
  mytest: jest.fn(),
});

describe('Content Controller', () => {
  let controller: ContentController;
  let service: ContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentService,
        { provide: ContentService, useFactory: mockContentService },
      ],
      controllers: [ContentController],
    }).compile();

    controller = module.get<ContentController>(ContentController);
    service = module.get<ContentService>(ContentService);
  });

  it('Controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('test', () => {
    it('should be return hello', async () => {
      const result = 'Hello';
      jest.spyOn(service, 'mytest').mockImplementation(() => result);
      expect(controller.mytest()).toBe('Hello');
    });
  });
});
