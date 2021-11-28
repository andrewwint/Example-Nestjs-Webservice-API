/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */
import React, { Fragment, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContext';
import * as BaseHttpService from '../../services/base-http.service';
import * as AuthService from '../../services/auth.service';

/**
 * @namespace AsyncInput
 * @description Single form input and submit button to make XMLHttpReqests
 * @abstract must be implemented in the parent component to take advantage of this component
 *
 * @name AsyncInputConfig
 * @property {sting} method @options 'get', 'post', 'put', 'patch', 'method'  @default 'get'
 * @property {sting} url - Optional, this or the apiUrl prop should be used
 * @property {sting} type - Required @options 'text' or 'passord'
 * @property {sting} name - Required, sets the payload object
 *                          and must match field name in the database
 * @property {sting} placeholder - Form place holder text
 * @property {sting} buttonLabel - Button Label text
 * @property {sting} helptext - Help text
 * @property {sting} inputSize - @options 'sm', 'lg' - Optional to change the size of fields
 * @property {object} validationRule - @see register https://react-hook-form.com/api#register
 *
 *  const AsyncInputConfig = {
 *    method: 'get',
 *    url: '/auth/jwt/example-request',
 *    type: 'text',
 *    name: 'stackname',
 *    placeholder: 'Stack Name',
 *    buttonLabel: 'Submit',
 *    helptext: 'Find servers the Solstice stack name',
 *    validationRule: {
 *      required: 'Stack name required',
 *      minLength: { value: 8, message: '8 character minimum' },
 *      maxLength: { value: 126, message: '126 character maximum' }
 *    }
 *  };
 *
 */

//Component defaults
const defaults = {
  method: 'post',
  type: 'text',
  label: 'Async Input',
  placeholder: 'Async Input',
  buttonLabel: 'Submit',
  inputSize: 'lg',
  helptext: 'help message',
  validationRule: { required: 'Field is required' }
};

//Sets who has access to this component
const rolesAllowed = ['user'];

const AsyncInput = ({ apiUrl, inputElement = defaults, ...rest }) => {
  //Handles access based on rolesAllowed array
  const { currentUser } = useContext(UserContext);
  const hasAccess = AuthService.hasRoleAccess(rolesAllowed, currentUser.user.roles);

  // eslint-disable-next-line
  const [asyncInput, setAsyncInput] = useState(inputElement);
  const [message, setMessage] = useState(false); //set message state

  /** @function
   * @name triggerParent
   * @description Handles commuication back to parent to refresh it's content
   * @param {event}
   * @example
   *    Parent:
   *    const childUpdates = () => {
   *       setMessage('hello');
   *    }
   *    Pass `onClick` to component to prop
   *    <AsyncInput onClick={childUpdates} />
   *
   *
   * @returns {Function}
   */
  const triggerParent = (event) => {
    // eslint-disable-next-line
    const asyncInputUpdates = event.target.value;
    if (rest.onClick) {
      setTimeout((asyncInputUpdates) => {
        rest.onClick(asyncInputUpdates);
        setMessage({});
      }, 5000);
    }
    if (rest.onChange) {
      rest.onChange(event.target.value);
    }
  };

  /**
   * React Form Hook @see https://react-hook-form.com/ for details
   */
  const { register, handleSubmit, errors } = useForm({ mode: 'onChange' });
  const validation = asyncInput.validationRule
    ? asyncInput.validationRule
    : defaults.validationRule;

  /** @function
   * @name onSubmit
   * @description per-processes the payload before making the API call
   * @returns {Promise<any>}
   */
  const onSubmit = (data) => {
    const method = asyncInput.method ? asyncInput.method : defaults.method;
    let url = apiUrl ? apiUrl : asyncInput.url;
    url = method === 'get' ? url + '/' + data[asyncInput.name] : url;
    const request = { method, url, data };
    setMessage(false);
    apiRequestFactory(request);
  };

  /** @async
   * @function apiRequestFactory
   * @param {object} @see {@link BaseHttpService.factoryXMLHttpReqest} for object structure
   * @description handles `Authorization:` XHR requests and sets success or errors state messages
   * @returns {Promise<any>}
   */
  const apiRequestFactory = async (request) => {
    try {
      const result = await BaseHttpService.factoryXMLHttpReqest(request);
      const message = BaseHttpService.getSuccessMessage(result);
      setMessage({
        text: `Status: ${result.statusText} ${message} `,
        color: 'text-success'
      });
    } catch (error) {
      setMessage({ text: error.message + ' - Try Again', color: 'text-danger' });
    }
  };

  return (
    <Fragment>
      {hasAccess ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="asyncInput" className="d-flex justify-content-between form-label">
            <Form.Control
              type={asyncInput.type}
              placeholder={asyncInput.placeholder}
              name={asyncInput.name}
              ref={register(validation)}
              size={asyncInput.inputSize}
              className="mr-2"
            />

            <Button
              variant="primary"
              type="submit"
              size={asyncInput.inputSize}
              onClick={triggerParent}
            >
              {asyncInput.buttonLabel ? asyncInput.buttonLabel : 'Submit'}
            </Button>
          </Form.Group>

          <Form.Text className="text-muted">
            {asyncInput.helptext}
            <p className="text-danger text-capitalize">{errors[asyncInput.name]?.message}</p>
          </Form.Text>
          {message ? <strong className={message.color}>{message.text}</strong> : message}
        </Form>
      ) : (
        hasAccess
      )}
    </Fragment>
  );
};

export default AsyncInput;
