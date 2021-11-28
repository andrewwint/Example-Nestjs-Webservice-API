/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import React, { useContext } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { UserContext } from '../../../contexts/UserContext';

import HelloUserExampleOne from './HelloUserExampleOne';
import HelloUserExampleTwo from './HelloUserExampleTwo';

const HelloUser = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Jumbotron>
      <h3>Hello {currentUser.user.name} </h3>
      <p className="lead text-muted">
        Conditionaly render content by role using <code>AuthService.hasRoleAccess()</code>
      </p>
      <HelloUserExampleOne />
      <HelloUserExampleTwo />
    </Jumbotron>
  );
};

export default HelloUser;
