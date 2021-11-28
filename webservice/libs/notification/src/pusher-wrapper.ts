/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import * as Pusher from 'pusher';
import { CreateNotificationDto } from './dto/create-notification.dto';

/**
 * This component is a wrapper class for the Pusher pub/sub API.
 */
export default class PusherWrapper {
  private pusher;

  /**
   * @description Initializes the pusher integration based on environment variables.
   */
  constructor() {
    this.pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_APP_KEY,
      secret: process.env.PUSHER_APP_SECRET,
      cluster: 'us2',
      useTLS: true,
    });
  }

  /**
   * @description Sends the notification payload to all subscribed clients.
   * @param {Notification} notification - the notification to trigger an event for.
   */
  publishNotification(notification: CreateNotificationDto) {
    this.pusher.trigger('notifications', 'notification', notification);
  }
}
