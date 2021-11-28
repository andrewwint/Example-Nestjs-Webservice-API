/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import React, { useContext, Fragment } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContext';
import * as AuthService from '../../services/auth.service';
import ExampleGetRequest from './sub-components/ExampleGetRequest';

const ExampleProtectedApiCall = () => {
  const { currentUser } = useContext(UserContext);
  const rolesAllowed = ['user', 'admin'];
  const hasAccess = AuthService.hasRoleAccess(rolesAllowed, currentUser.user.roles);

  return (
    <Fragment>
      {hasAccess ? (
        <Jumbotron>
          <h3>Example Protected Componetsss</h3>
          <p className="lead text-muted">
            This page is protected using <code>AuthService.hasRoleAccess</code> within the componet
            and interacts with external APIs using <code>BaseHttpService</code> service. This
            componet's code can be found <code>/src/components/example-protected-api-call</code>
          </p>

          <ExampleGetRequest rolesAllowed={rolesAllowed} />
        </Jumbotron>
      ) : (
        hasAccess
      )}
    </Fragment>
  );
};

export default ExampleProtectedApiCall;
