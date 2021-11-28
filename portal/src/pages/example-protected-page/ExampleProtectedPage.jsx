/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import React, { Fragment, useContext } from 'react';
import { Jumbotron, Row, Col } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContext';
import UserCustomization from './sub-components/UserCustomization';
import HelloUser from './sub-components/HelloUser';
import ExampleProtectedApiCall from '../../components/example-protected-api-call/ExampleProtectedApiCall';
import './ExampleProtectedPage.scss';

const ExampleProtectedPage = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <Fragment>
      <Row>
        <Col>
          <Jumbotron>
            <h2 className="text-uppercase">Example Protected Page</h2>
            <p className="lead text-muted">
              This page is protected using <code>PrivateRoute</code> component located in root{` `}
              <code>App.js</code>. This exmaple page's code can be found{' '}
              <code>/src/pages/example-protected-page</code>
            </p>
            <h3>Private Route Component</h3>
            <pre>
              <code>
                {`<PrivateRoute
  path="/example-protected-page"
  rolesAllowed={['user', 'content']}
  component={ExampleProtectedPage}
/>`}
              </code>
            </pre>
            <p className="text-muted">
              The <code>PrivateRoute</code> component checks the{` `}
              <code>user.roles['user', 'server']</code> array can compares it to{` `}
              <code>{`rolesAllowed={['user', 'content']}`}</code> prop. Using{' '}
              <code>AuthService.hasRoleAccess</code> function to grant access
            </p>
            <p>
              {currentUser.user.name}'s roles:{' '}
              <code>{JSON.stringify(currentUser.user.roles, null, 2)}</code>
            </p>
          </Jumbotron>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col sm>
          <UserCustomization />
        </Col>
        <Col sm>
          <HelloUser />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <ExampleProtectedApiCall />
        </Col>
      </Row>
    </Fragment>
  );
};

export default ExampleProtectedPage;
