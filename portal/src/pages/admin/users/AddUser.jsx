/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { Jumbotron, Row, Col, Form, Button, FormControl, InputGroup } from 'react-bootstrap';
import * as BaseHttpService from '../../../services/base-http.service';
import * as AuthService from '../../../services/auth.service';
import './Users.scss';
import AlertMessage from '../../../components/layout-util/alert-message/AlertMessage';

const strongPassword = AuthService.getStrongPassword();

/**
 * Yup Validation @see https://github.com/jquense/yup for details
 * Custom Hook with Resolver @see https://react-hook-form.com/advanced-usage/#CustomHookwithResolver for details
 */
const Schema = yup.object().shape({
  username: yup
    .string()
    .required()
    .min(4)
    .max(64),
  password: yup
    .string()
    .required()
    .min(8)
    .max(128),
  /*.matches(/((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 'weak password'),*/
  firstName: yup
    .string()
    .required()
    .min(2)
    .max(26),
  lastName: yup
    .string()
    .required()
    .min(2)
    .max(26)
});

const AddUser = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(Schema)
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageTitle, setMessageTitle] = useState('');
  const [messageVariant, setMessageVariant] = useState('success');

  const onSubmit = (data) => {
    const user = {
      username: data.username,
      password: data.password,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.username + '@truechoicesolutions.com',
      roles: [...data.roles.sort()]
    };
    setMessage('');
    setLoading(true);
    registerUser(user);
  };

  const registerUser = async (user) => {
    try {
      const result = await BaseHttpService.post('/auth/registration', user);
      setMessageVariant('success');
      setMessageTitle('User Account Successfully Created');
      setMessage(
        'Copy and save this API Key ' +
          JSON.stringify(result.data) +
          ' to be used for system level access '
      );
      setLoading(false);
    } catch (error) {
      const message = BaseHttpService.getErrorMessage(error);
      setMessageVariant('warning');
      setMessageTitle('Oh snap! You got an error!');
      setMessage(message);
    }
  };

  return (
    <Fragment>
      <Row>
        <Col>
          <Jumbotron>
            <h2 className="text-uppercase">New User Account</h2>
            <p className="lead text-muted">
              Create a new user for authentication and add roles for authorization to various
              resources
            </p>
            <hr />

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Row>
                <Col>
                  <Form.Group controlId="formGridEmail">
                    <Form.Label>Email Username</Form.Label>
                    <InputGroup>
                      <FormControl
                        placeholder="Recipient's email username"
                        aria-label="Recipient's email username"
                        aria-describedby="basic-addon2"
                        type="text"
                        name="username"
                        ref={register}
                        size="lg"
                      />
                      <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2">
                          @truechoicesolutions.com
                        </InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                    <small id="usernameHelpBlock" className="form-text text-muted">
                      4 character minimum using their email username to receive email notifications
                    </small>
                    <p className="text-danger text-capitalize">{errors.username?.message}</p>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formGridPassword">
                    <Form.Label className="d-flex justify-content-between">
                      <div>Password</div>
                      <div>
                        <small className="font-weight-lighter">
                          Suggested Strong Password{' '}
                          <samp className="font-weight-bold">{strongPassword}</samp>
                        </small>
                      </div>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      ref={register}
                      size="lg"
                    />
                    <small id="passwordHelpBlock" className="form-text text-muted">
                      8 character minimum including, upper-case, lower-case, digit and special
                      characters
                    </small>
                    <p className="text-danger text-capitalize">{errors.password?.message}</p>
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    ref={register}
                    size="lg"
                  />
                  <small id="passwordHelpBlock" className="form-text text-muted">
                    If API System User provide system name example: Jenkins
                  </small>
                  <p className="text-danger text-capitalize">{errors.firstName?.message}</p>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    ref={register}
                    size="lg"
                  />
                  <small id="passwordHelpBlock" className="form-text text-muted">
                    If API System User provide context name example: XML Loader
                  </small>
                  <p className="text-danger text-capitalize">{errors.lastName?.message}</p>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} id="formGridCheckbox" className>
                  <Form.Label>Roles</Form.Label>
                  <br />
                  {AuthService.roles.map((c, i) => (
                    <Form.Check
                      key={c.value}
                      type="switch"
                      id={c.value}
                      label={c.label}
                      name="roles"
                      value={c.value}
                      disabled={c.disabled}
                      defaultChecked={c.checked}
                      ref={register}
                    />
                  ))}
                </Form.Group>
              </Form.Row>
              <hr />
              <Form.Group as={Row}>
                <Col md={{ span: 6, offset: 3 }}>
                  <Button type="submit" block size="lg" disabled={loading}>
                    {loading && <span className="spinner-border spinner-border-sm"></span>}
                    <span>Submit</span>
                  </Button>
                </Col>
              </Form.Group>

              {message && (
                <Form.Group as={Row}>
                  <Col>
                    <AlertMessage
                      title={messageTitle}
                      message={message}
                      waitMessage="none"
                      variant={messageVariant}
                    />
                  </Col>
                </Form.Group>
              )}
            </Form>
          </Jumbotron>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddUser;
