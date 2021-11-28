/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import React, { useContext, Fragment } from 'react';
import { Alert } from 'react-bootstrap';
import { UserContext } from '../../../contexts/UserContext';
import * as AuthService from '../../../services/auth.service';

const HelloUserExampleOne = () => {
  const { currentUser } = useContext(UserContext);
  const rolesAllowed = ['admin'];
  const hasAccess = AuthService.hasRoleAccess(rolesAllowed, currentUser.user.roles);

  return (
    <Fragment>
      <h4>Example 1</h4>
      <pre>
        <small>
          {`{AuthService.hasRoleAccess(['admin'], currentUser.user.roles) ? (
<Your component...>
) : (
<Your component...>
)}`}
        </small>
      </pre>

      {hasAccess ? (
        <Alert variant="success">
          <Alert.Heading>Hey, nice to see you</Alert.Heading>
          {currentUser.user.name} you have access
        </Alert>
      ) : (
        <Alert variant="danger">
          <Alert.Heading>Oh snap! You don't belong here!</Alert.Heading>
          {currentUser.user.name} dosen't have access
        </Alert>
      )}
    </Fragment>
  );
};

export default HelloUserExampleOne;
