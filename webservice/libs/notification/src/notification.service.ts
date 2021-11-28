/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Model } from 'mongoose';
import { Injectable, Logger, Inject, Optional } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Notification } from './interfaces/notification.interface';
import { CreateNotificationDto } from './dto/create-notification.dto';
import PusherWrapper from './pusher-wrapper';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  private readonly pusher = new PusherWrapper();

  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: Model<Notification>,
    @Optional() @Inject(REQUEST) private readonly request: Request,
  ) {}

  /**
   * @description Creates a new notification record in the database based on
   *              Notification interface and createNotificationDto values.
   *
   * @param {CreateNotificationDto} createNotificationDto - the notification
   *        object to save within the databse.
   * @return {Promise<Notification>} the created notification result.
   */
  async createNotification(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    //save activity to db
    const createdNotification = await new this.notificationModel({
      user: this.request.user ? this.request.user['name'] : 'anonymous',
      ...createNotificationDto,
    }).save();
    this.logger.log(`Notification stored: ${createNotificationDto.message}`);

    //send notification payload to all clients via pusher
    this.pusher.publishNotification(createdNotification);

    return createdNotification;
  }

  /**
   * @description Returns a list of all the notifications stored in the database.
   *
   * @return {Promise<Notification[]>} an array of all the notifications.
   */
  async getAllNotifications(): Promise<Notification[]> {
    const result = await this.notificationModel.find().exec();
    this.logger.log(`Retrieved ${result.length} notifications`);
    return result;
  }
}
