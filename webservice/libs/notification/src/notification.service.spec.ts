/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { NotificationService } from './notification.service';
import { Request } from 'express';
import { Model } from 'mongoose';
import { Notification } from './interfaces/notification.interface';

describe('NotificationService', () => {
  let service: NotificationService;
  let request: Request;
  let notificationModel: Model<Notification>;

  beforeAll(async () => {
    service = new NotificationService(notificationModel, request);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.createNotification).toBeDefined();
    expect(service.getAllNotifications).toBeDefined();
  });
});
