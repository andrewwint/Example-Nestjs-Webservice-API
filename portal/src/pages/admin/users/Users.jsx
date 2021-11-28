/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import React, { Fragment, useState, useEffect } from 'react';
import { Jumbotron, Row, Col, Card, CardColumns, Tooltip, OverlayTrigger } from 'react-bootstrap';
import * as BaseHttpService from '../../../services/base-http.service';
import * as AuthService from '../../../services/auth.service';
import './Users.scss';
import AlertMessage from '../../../components/layout-util/alert-message/AlertMessage';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState();
  const [message, setMessage] = useState('');
  const [messageTitle, setMessageTitle] = useState('');
  const [messageVariant, setMessageVariant] = useState('success');

  const editUser = (userId) => {
    window.location.assign('/user/' + userId + '/edit');
  };

  useEffect(() => {
    setMessage('');
    setLoading(true);
    const fetchData = async () => {
      try {
        const result = await BaseHttpService.get('/users');
        setUsers(result.data);
      } catch (error) {
        const message = BaseHttpService.getErrorMessage(error);
        setMessageVariant('warning');
        setMessageTitle('Oh snap! You got an error!');
        setMessage(message);
      }
    };
    fetchData();
    setLoading(false);
  }, [loading]);

  return (
    <Fragment>
      <Row>
        <Col>
          <Jumbotron>
            <h2 className="text-uppercase">Users Accounts</h2>
            <p className="lead text-muted"></p>

            {message && (
              <AlertMessage
                title={messageTitle}
                message={message}
                waitMessage="none"
                variant={messageVariant}
              />
            )}
            <hr />
            <CardColumns>
              {users.map((user, i) => (
                <OverlayTrigger
                  key={user._id}
                  placement="right"
                  overlay={<Tooltip>Click to Edit!</Tooltip>}
                >
                  <Card
                    key={user._id}
                    onClick={() => {
                      editUser(user._id);
                    }}
                  >
                    <Card.Body>
                      <Card.Title className="d-flex justify-content-between">
                        <div>
                          {user.first_name} {user.last_name}
                        </div>
                        <div className="font-weight-light font-italic">
                          <small>{user.username}</small>
                        </div>
                      </Card.Title>
                      <Card.Text>
                        {AuthService.roles.map((c, i) =>
                          user.roles.includes(c.value) ? (
                            <span key={i}>
                              {c.label}
                              <br />
                            </span>
                          ) : null
                        )}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                  </Card>
                </OverlayTrigger>
              ))}
            </CardColumns>
          </Jumbotron>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Users;
