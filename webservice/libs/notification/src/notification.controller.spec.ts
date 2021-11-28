/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

const mockNotificationService = () => ({
  createNotification: jest.fn(),
  getAllNotifications: jest.fn()
});

describe('Notification Controller', () => {
  let controller: NotificationController;
  let service: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        { provide: NotificationService, useFactory: mockNotificationService }
      ],
      controllers: [NotificationController]
    }).compile();
    controller = module.get<NotificationController>(NotificationController);
    service = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller.createNotification).toBeDefined();
  });

  describe('createNotification', () => {
    it('should save a new notification record for an entry', async () => {
      const request: CreateNotificationDto = {
        topic: 'xml-loading',
        message: 'Loaded PwCKINCS.xml Successfully, with delete true'
      };
      await controller.createNotification(request);
      expect(service.createNotification).toBeCalled();
      expect(service.createNotification).toBeCalledWith(request);
    });
  });

  describe('getAllNotifications', () => {
    it('should retrieve all notification', async () => {
      await controller.getAllNotifications();
      expect(service.getAllNotifications).toBeCalled();
      expect(service.getAllNotifications).toBeCalledWith();
    });
  });
});
