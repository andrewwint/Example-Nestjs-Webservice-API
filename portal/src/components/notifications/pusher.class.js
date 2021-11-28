/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import Pusher from 'pusher-js';
import { store } from 'react-notifications-component';

/**
 * This component is a wrapper class for the Pusher pub/sub API.
 */
export default class PusherWrapper {
  constructor() {
    this.pusher = new Pusher('8005a3ae8d42ea60adff', {
      cluster: 'us2'
    });
  }
  
  /**
   * @description Initializes the React App to listen to any new notification 
   *              events triggered by the web service API and render a notification
   *              pop up on the page.
   */
  initializeNotifications() {
    const channel = this.pusher.subscribe('notifications');
    channel.bind('notification', (notification) => {
      store.addNotification({
        title: notification.topic,
        message: `${notification.user} ${notification.message}`,
        type: "default",
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
          pauseOnHover: true
        }
      });
    });
  }
}