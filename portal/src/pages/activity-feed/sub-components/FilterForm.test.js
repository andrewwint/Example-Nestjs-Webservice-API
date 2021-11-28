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
import FilterForm from './FilterForm';

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

it('renders the filter header text', () => {
  act(() => {
    render(<FilterForm users={[]} types={[]} />, container);
  });
  expect(container.querySelector('h6').textContent).toBe('Filter results by...');
});

it('renders the filter checkboxes based on props', () => {
  const userFilters = ['user1', 'user2', 'user3'];
  const topicFilters = ['topic1', 'topic2', 'topic3'];
  act(() => {
    render(<FilterForm users={userFilters} types={topicFilters} />, container);
  });
  container.querySelectorAll('input[name=userFilters]').forEach((input, index) => {
    expect(input.value).toBe(userFilters[index]);
  });
  container.querySelectorAll('input[name=topicFilters]').forEach((input, index) => {
    expect(input.value).toBe(topicFilters[index]);
  });
});

it('should call the setFilters function when the user selects a filter', () => {
  const mockSetFilters = jest.fn();
  const userFilters = ['user1', 'user2', 'user3'];
  const topicFilters = ['topic1', 'topic2', 'topic3'];
  act(() => {
    render(<FilterForm setFilters={mockSetFilters} users={userFilters} types={topicFilters} />, container);
  });
  const userCheckbox = container.querySelector('#user1');
  expect(userCheckbox.checked).toBe(false);
  act(() => {
    userCheckbox.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(mockSetFilters).toHaveBeenCalledTimes(1);
  expect(userCheckbox.checked).toBe(true);
});
