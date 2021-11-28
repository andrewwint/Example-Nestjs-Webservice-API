/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Test, TestingModule } from '@nestjs/testing';
import { XmlwriterService } from './xmlwriter.service';

const mockXmlwriterService = () => ({
  setContent: jest.fn(),
  getXML: jest.fn(),
});

describe('Xmlwriter Service', () => {
  let service: XmlwriterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        XmlwriterService,
        { provide: XmlwriterService, useFactory: mockXmlwriterService },
      ],
    }).compile();
    service = module.get<XmlwriterService>(XmlwriterService);
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('setContent', () => {
    it('should be return hello', async () => {
      const result = 'hello';

      //jest.spyOn(service, 'setContent').mockImplementation(() => result);
      //expect(service.setContent().toEqual('hello');
    });
  });
});
