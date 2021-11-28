/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import React from 'react';
import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import moment from 'moment';

/**
 * @description Gets the date as a time difference from the current date with a
 *              tooltip to display the full date in MM-DD-YYYY format.
 *              e.g. '2 minutes ago' or '3 hours ago'
 * @param {object} utcDate - the moment() object for the notification date in UTC.
 * @param {string} localDate - human-readable representation of the notification date.
 * @param {object} now - the current date/time.
 * @param {string} unitOfTime - the unit of time to display the date as, e.g. 'minutes' or 'hours'
 * @return {object} the date text and tooltip to be rendered to the page.
 */
function getDateWithTooltip(utcDate, localDate, now, unitOfTime) {
  return (
    <OverlayTrigger overlay={<Tooltip id="date">{localDate}</Tooltip>}>
      <span>{`${now.diff(utcDate, unitOfTime)} ${unitOfTime} ago`}</span>
    </OverlayTrigger>
  );
}

/**
 * @description Gets the date & time to display next to the notification.
 * @param {object} date - the date object received from the database.
 * @return {string} the date in human readable format.
 */
function getDate(date) {
  const now = moment(new Date());
  const momentDate = moment.utc(date);
  const localDate = momentDate.local().format('MMM Do YYYY, h:mm:ss a');
  const isCurrentDate = momentDate.isSame(now, 'day');
  if (isCurrentDate) {
    const isCurrentHour = momentDate.isSame(now, 'hour');
    if (isCurrentHour) {
      return getDateWithTooltip(momentDate, localDate, now, 'minutes');
    } else {
      return getDateWithTooltip(momentDate, localDate, now, 'hours');
    }
  }
  return localDate;
}

/**
 * @description This component renders a single notification on the activity page.
 */
export default function Notification(props) {
  const { user, topic, message, createdate } = props.notification;

  return (
    <div className="media mb-3">
      <img
        src="/assets/icons/person-fill.svg"
        width="50"
        height="50"
        className="mr-3 mt-1 bg-light rounded"
        alt="user-icon"
      />

      <div className="media-body p-2 shadow-sm rounded bg-light border">
        <small className="float-right text-muted date">{getDate(createdate)}</small>
        <h6 className="mt-0 mb-1 text-muted user">{user}</h6>
        <span className="message">{message}</span>
        <small className="float-right text-muted topic">
          <Badge variant="info">{topic}</Badge>
        </small>
      </div>
    </div>
  );
}
