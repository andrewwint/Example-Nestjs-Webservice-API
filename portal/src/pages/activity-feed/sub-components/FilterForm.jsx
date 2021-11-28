/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import React, { Component } from 'react';
import { Row, Form } from 'react-bootstrap';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

/**
 * @description This component renders the filter form on the activity page to sort
 *              notifications by various options (user, topic).
 */
export default class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.userFilters = [];
    this.topicFilters = [];
    this.state = {
      dateRange: this.props.dateRange
    };
  }

  /**
   * @description Sets the range of dates to show activity for.
   * @param {array} dates - the range of dates passed by the DateRangePicker onChange event.
   */
  setDateFilter = (dates) => {
    this.setState({
      dateRange: dates
    });
    this.props.setDateRange(dates);
  };

  /**
   * @description Event handler to react to the user selecting a filter option.
   * @param {object} event - the event object sent via form element interaction.
   */
  handleFilterSelection = (event) => {
    const filterValue = event.target.value;
    const filterType = event.target.name;
    if (this[filterType].indexOf(filterValue) === -1) {
      this[filterType].push(filterValue);
    } else {
      this[filterType].splice(this[filterType].indexOf(filterValue), 1);
    }
    this.props.setFilters(filterType, this[filterType]);
  };

  render() {
    return (
      <Row>
        <Form method="POST">
          <h6>Filter results by...</h6>
          <Form.Group controlId="userFilters">
            <Form.Label>User:</Form.Label>{' '}
            {this.props.users.map((user) => (
              <Form.Check
                inline
                key={user}
                type="checkbox"
                name="userFilters"
                label={user}
                id={user}
                value={user}
                onChange={this.handleFilterSelection}
              ></Form.Check>
            ))}
          </Form.Group>
          <Form.Group controlId="topicFilters">
            <Form.Label>Topic:</Form.Label>{' '}
            {this.props.types.map((topic) => (
              <Form.Check
                inline
                key={topic}
                type="checkbox"
                name="topicFilters"
                label={topic}
                id={topic}
                value={topic}
                onChange={this.handleFilterSelection}
              ></Form.Check>
            ))}
          </Form.Group>
          <Form.Group controlId="dateFilter">
            <Form.Label>Date:</Form.Label>{' '}
            <DateRangePicker value={this.state.dateRange} onChange={this.setDateFilter} />
          </Form.Group>
        </Form>
      </Row>
    );
  }
}
