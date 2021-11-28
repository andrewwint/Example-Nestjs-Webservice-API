/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import React, { Component } from 'react';
import { Button, Container, Row, Jumbotron } from 'react-bootstrap';
import FilterForm from './sub-components/FilterForm';
import Notification from './sub-components/Notification';
import * as BaseHttpService from '../../services/base-http.service';
import LoadingSpinner from '../../components/layout-util/loading-spinner/LoadingSpinner';

/**
 * @description This page displays all activities performed by users within the Portal.
 */
export default class ActivityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allActivity: [],
      numberOfNotificationsToShow: 50,
      loading: false,
      userFilters: [],
      topicFilters: [],
      dateRange: null
    };
  }

  /**
   * @description Initializes the page by retrieving the list of all activities
   *              within the webservice database.
   */
  componentDidMount = async () => {
    try {
      const data = await this.getAllActivity();
      const sortedActivity = data.sort((a, b) => (a.createdate > b.createdate ? -1 : 1));
      this.setState({
        allActivity: sortedActivity
      });
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * @description Returns the list of all activity by querying the web service API
   *              for notifications for an authorized user.
   * @see {@link BaseHttpService} for further information.
   * @return {array} an array of notification objects.
   */
  getAllActivity = async () => {
    return this.getAllActivityProtected();
  };

  /**
   * @description Returns the list of all activity by querying the web service API
   *              for notifications for an authorized user.
   * @see {@link BaseHttpService} for further information.
   * @return {array} an array of notification objects.
   */
  getAllActivityProtected = async () => {
    try {
      const result = await BaseHttpService.get('/notification/auth/');
      return result.data;
    } catch (error) {
      return error.message;
    }
  };

  /**
   * @description Returns a list of activities, filtered by any selected filter options
   *              selected by the user.
   * @return {array} the list of notifications to render, with any selected filters applied.
   */
  getFilteredNotifications = () => {
    let notifications = this.state.allActivity;

    //filter by any selected users
    if (this.state.userFilters.length !== 0) {
      notifications = notifications.filter(
        (activity) => this.state.userFilters.indexOf(activity.user) !== -1
      );
    }
    //filter by any selected topics
    if (this.state.topicFilters.length !== 0) {
      notifications = notifications.filter(
        (activity) => this.state.topicFilters.indexOf(activity.topic) !== -1
      );
    }

    if (this.state.dateRange != null) {
      notifications = notifications.filter((activity) => {
        return (
          new Date(activity.createdate) >= this.state.dateRange[0] &&
          new Date(activity.createdate) <= this.state.dateRange[1]
        );
      });
    }

    return notifications;
  };

  /**
   * @description Returns a subset of the filtered notifications to be
   *              displayed on the page.
   * @return {array} the array of notifications to display on the page.
   */
  getNotificationsToDisplay = () => {
    return this.getFilteredNotifications().slice(0, this.state.numberOfNotificationsToShow);
  };

  /**
   * @description Returns a list of possible filter options by parsing all notifications
   *              and finding unique values for the specified option (e.g. user, topic).
   * @param {string} type - the notification property to find options for (e.g. user, topic, message)
   * @return {array} the list of unique users/topics/etc to filter results by.
   */
  getFilterList = (type) => {
    const options = this.state.allActivity.map((notification) => {
      return notification[type];
    });
    return options.filter((option, index) => options.indexOf(option) === index);
  };

  /**
   * @description Constructs the 'See More' button to load additional notifications.
   * @return {object} the 'See More' button component.
   */
  getSeeMoreButton = () => {
    return (
      <Button variant="link" disabled={this.state.loading} onClick={this.handleSeeMore}>
        See More <img src="/assets/icons/chevron-down.svg" alt="down-icon" />
      </Button>
    );
  };

  /**
   * @description Event handler to react to user clicking 'See More' button.
   *              Displays loading wheel and retrieves additional notifications from list.
   * @param {*} event
   */
  handleSeeMore = (event) => {
    this.setState(
      {
        loading: true
      },
      () => {
        // get new notes
        const numberOfNotificationsToShow = this.state.numberOfNotificationsToShow * 2;
        this.setState({
          loading: false,
          numberOfNotificationsToShow: numberOfNotificationsToShow
        });
      }
    );
  };

  /**
   * @description Displays all notifications on the activity page, filtered by any
   *              selected options.
   * @return {object} the notification elements to display on the page.
   */
  renderNotifications = (notificationsToDisplay) => {
    return (
      <Container>
        {notificationsToDisplay.map((activity, index) => (
          <Notification key={index} notification={activity} />
        ))}
      </Container>
    );
  };

  /**
   * @description Event handler to be passed to child components which sets the range of dates
   *              passed from the DateRangePicker component.
   * @param {array} dates - the start and end date selected from the calendar.
   */
  setDateRange = (dates) => {
    this.setState({
      dateRange: dates
    });
  };

  /**
   * @description Event handler to be passed to child components which sets the filter state properties.
   * @param {string} filterType - the filter type (e.g. 'user', 'topic')
   * @param {array} filterValue - an array of selected options for the given filter type (e.g. ['xml-import', 'test'])
   */
  setFilters = (filterType, filterValue) => {
    this.setState({ [filterType]: filterValue });
  };

  render() {
    const notificationsToDisplay = this.getNotificationsToDisplay();
    return (
      <Jumbotron>
        <h2>Recent Activity</h2>
        <FilterForm
          setFilters={this.setFilters}
          users={this.getFilterList('user')}
          types={this.getFilterList('topic')}
          dates={this.state.dateRange}
          setDateRange={this.setDateRange}
        />
        <Row className="float-right">
          <small>
            Displaying {notificationsToDisplay.length} of {this.getFilteredNotifications().length}{' '}
            results
          </small>
        </Row>
        <hr />
        {this.renderNotifications(notificationsToDisplay)}
        <Row className="justify-content-md-center">
          {notificationsToDisplay.length !== this.getFilteredNotifications().length
            ? this.getSeeMoreButton()
            : ''}
        </Row>
        <Row className="justify-content-md-center">
          {this.state.loading ? <LoadingSpinner /> : ''}
        </Row>
      </Jumbotron>
    );
  }
}
