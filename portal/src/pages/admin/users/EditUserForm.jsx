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
import { Jumbotron, Row, Col, Form, Button, Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';
import * as BaseHttpService from '../../../services/base-http.service';
import * as AuthService from '../../../services/auth.service';
import './Users.scss';
import AlertMessage from '../../../components/layout-util/alert-message/AlertMessage';
import { useParams, Link } from 'react-router-dom';
import AsyncInput from '../../../components/async-input/AsyncInput';
import GenerateApiKey from './sub-components/GenerateApiKey';

/**
 * Yup Validation @see https://github.com/jquense/yup for details
 * Custom Hook with Resolver @see https://react-hook-form.com/advanced-usage/#CustomHookwithResolver for details
 */
const Schema = yup.object().shape({
  first_name: yup
    .string()
    .label('First Name')
    .required()
    .min(2)
    .max(26),
  last_name: yup
    .string()
    .label('Last Name')
    .required()
    .min(2)
    .max(26),
  email: yup
    .string()
    .label('Email Address')
    .required()
    .email()
});

const strongPasswordSugguestion =
  '8 character minimum including, upper-case, lower-case, digit and special characters. - Suggested Strong Password ' +
  AuthService.getStrongPassword();

const passwordChangeModel = {
  method: 'put',
  type: 'password',
  name: 'password',
  placeholder: 'Strong password required',
  buttonLabel: 'Update',
  inputSize: 'lg',
  helptext: strongPasswordSugguestion,
  validationRule: {
    required: 'Password required',
    minLength: { value: 8, message: '8 character minimum' },
    maxLength: { value: 126, message: '126 character maximum' }
  }
};

const EditUserForm = ({ preloadedValues }) => {
  let { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageTitle, setMessageTitle] = useState('');
  const [messageVariant, setMessageVariant] = useState('success');
  const [show, setShow] = useState(false);
  const [showPasword, setShowPassword] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  //delete modal controls
  const handleCloseDeleteConfirm = () => setShow(false);
  const handleShowDeleteConfirm = () => setShow(true);

  //change password controls
  const handleClosePassword = () => setShowPassword(false);
  const handleShowPassword = () => setShowPassword(true);

  //change apikey controls
  const handleCloseApiKey = () => setShowApiKey(false);
  const handleShowApiKey = () => setShowApiKey(true);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(Schema),
    defaultValues: preloadedValues
  });

  const onSubmit = (data) => {
    const user = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      roles: [...data.roles.sort()]
    };

    setMessage('');
    setLoading(true);
    updateUser(user);
  };

  const updateUser = async (user) => {
    try {
      const result = await BaseHttpService.put('/users/' + id, user);
      setMessageVariant('success');
      setMessageTitle('User Account Successfully Updated');
      setMessage(JSON.stringify(result.data));
      setLoading(false);
    } catch (error) {
      const message = BaseHttpService.getErrorMessage(error);
      setMessageVariant('warning');
      setMessageTitle('Oh snap! You got an error!');
      setMessage(message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const result = await BaseHttpService.remove('/users/' + id);
      setMessageVariant('success');
      setMessageTitle('Server Said');
      setMessage(JSON.stringify(result.data));
      setLoading(false);
    } catch (error) {
      const message = BaseHttpService.getErrorMessage(error);
      setMessageVariant('warning');
      setMessageTitle('Oh snap! You got an error!');
      setMessage(message);
    }
    setShow(false);
  };

  return (
    <Fragment>
      <Row>
        <Col>
          <Jumbotron>
            <h2 className="text-uppercase">Edit User Account</h2>
            <p className="lead text-muted float-left">
              <Link to="/users/manage">
                <img alt="back" src="/assets/img/arrow-left-circle.svg" /> back to users
              </Link>
            </p>
            <p className="lead text-muted text-right">
              <strong>
                <em>{preloadedValues.username}</em>
              </strong>
            </p>
            <hr />
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="first_name"
                    ref={register}
                    size="lg"
                  />

                  <p className="text-danger text-capitalize">{errors.first_name?.message}</p>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="last_name"
                    ref={register}
                    size="lg"
                  />

                  <p className="text-danger text-capitalize">{errors.last_name?.message}</p>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    name="email"
                    ref={register}
                    size="lg"
                  />
                  <p className="text-danger text-capitalize">{errors.email?.message}</p>
                </Form.Group>

                <Col md={{ span: 3 }}>
                  <Form.Label className="">
                    <div>Password</div>
                  </Form.Label>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleShowPassword}
                    size="lg"
                    block
                  >
                    <span>Change Password</span>
                  </Button>
                </Col>
                <Col md={{ span: 3 }}>
                  <Form.Label className="">
                    <div>API Key Manager</div>
                  </Form.Label>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id="tooltip-disabled">
                        Clicking this button will disable the existing API Key and provide you with
                        a new access key to be used in your applicaiton.
                      </Tooltip>
                    }
                  >
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleShowApiKey}
                      size="lg"
                      block
                    >
                      <span>Generate API Key</span>
                    </Button>
                  </OverlayTrigger>
                </Col>
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
                <Col md={{ span: 5, offset: 1 }} className="p-3">
                  <Button type="submit" block size="lg" disabled={loading}>
                    {loading && <span className="spinner-border spinner-border-sm"></span>}
                    <span>Update</span>
                  </Button>
                </Col>
                <Col md={{ span: 5 }} className="p-3">
                  <Button
                    type="button"
                    variant="danger"
                    block
                    size="lg"
                    onClick={handleShowDeleteConfirm}
                  >
                    <span>Delete</span>
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

      <Modal show={show} onHide={handleCloseDeleteConfirm}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{preloadedValues.username}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseDeleteConfirm}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Delete User
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPasword} backdrop={false} centered={true} onHide={handleClosePassword}>
        <Modal.Header className="bg-secondary text-white" closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AsyncInput inputElement={passwordChangeModel} apiUrl={`/users/${id}/password`} />
        </Modal.Body>
      </Modal>

      <Modal show={showApiKey} backdrop={false} centered={true} onHide={handleCloseApiKey}>
        <Modal.Header className="bg-secondary text-white" closeButton>
          <Modal.Title>Generate New API Key</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GenerateApiKey userId={id} />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default EditUserForm;
