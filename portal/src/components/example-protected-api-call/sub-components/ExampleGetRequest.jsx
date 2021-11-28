/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import React, { useEffect, useState, useContext } from 'react';

import * as BaseHttpService from '../../../services/base-http.service';
import * as AuthService from '../../../services/auth.service';
import { UserContext } from '../../../contexts/UserContext';
import { Card } from 'react-bootstrap';
import Notes from './Notes';
import LoadingSpinner from '../../layout-util/loading-spinner/LoadingSpinner';
import AlertMessage from '../../layout-util/alert-message/AlertMessage';

const ExampleGetRequest = ({ rolesAllowed }) => {
  const { currentUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [data, setMyData] = useState({});
  const [access, setAccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await BaseHttpService.get('/auth/jwt/example-request/Hello World');
        setMyData(result.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
    setAccess(AuthService.hasRoleAccess(rolesAllowed, currentUser.user.roles));
  }, [rolesAllowed, currentUser.user.roles]);

  if (data && access) {
    return (
      <Card>
        <Card.Header as="h4">
          {`<ExampleGetRequest />`} <br /> <small>Example Protected and Dynaimic Component</small>{' '}
        </Card.Header>
        <Card.Body>
          <Notes />
          <Card.Title>Response from XHR Request </Card.Title>
          <Card.Text>
            <code>
              {data.message}
              <br />
              http://{data.host}/auth/jwt/example-request/
              <br />
              {data.referer}
              <br />
              {data.userAgent}
            </code>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  } else if (error) {
    return <AlertMessage message={error.message} />;
  } else {
    return <LoadingSpinner />;
  }
};

export default ExampleGetRequest;
