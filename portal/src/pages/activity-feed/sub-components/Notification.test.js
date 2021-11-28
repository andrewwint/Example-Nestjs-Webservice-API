/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Notification from './Notification';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders a notification based on props', () => {
  const notification = {
    user: 'fakeuser',
    createdate: new Date(),
    topic: 'faketopic',
    message: 'imported an xml to dev'
  };
  act(() => {
    render(<Notification notification={notification} />, container);
  });
  expect(container.querySelector('.user').textContent).toBe(notification.user);
  expect(container.querySelector('.topic').textContent).toBe(notification.topic);
  expect(container.querySelector('.message').textContent).toBe(notification.message);
});
