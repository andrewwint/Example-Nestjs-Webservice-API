import React, { useState, useContext, Fragment } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import * as BaseHttpService from '../../../services/base-http.service';
import * as AuthService from '../../../services/auth.service';
import { UserContext } from '../../../contexts/UserContext';
import '../Servers.scss';

/**
 * Yup Validation @see https://github.com/jquense/yup for details
 * Custom Hook with Resolver @see https://react-hook-form.com/advanced-usage/#CustomHookwithResolver for details
 */
const Schema = yup.object().shape({
  shortname: yup
    .string()
    .required()
    .min(2)
    .max(36)
    .matches(
      /^[a-zA-Z\d-_]+$/,
      "shouldn't include spaces or special characters dashes '-' are allowed"
    ),
  alias_shortname: yup
    .string()
    .min(2)
    .max(36)
    .matches(
      /^[a-zA-Z\d-_]+$/,
      "shouldn't include spaces or special characters dashes '-' are allowed"
    )
});

//Sets who has access to this component
const rolesAllowed = ['admin', 'server'];

const EditShortName = ({ server, ...rest }) => {
  //Handles access based on rolesAllowed array
  const { currentUser } = useContext(UserContext);
  const hasAccess = AuthService.hasRoleAccess(rolesAllowed, currentUser.user.roles);

  const [message, setMessage] = useState(false); //set message state

  /**
   * React Form Hook @see https://react-hook-form.com/ for details
   */
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    defaultValues: server,
    resolver: yupResolver(Schema)
  });

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
    if (rest.onClick) {
      setTimeout((asyncInputUpdates) => {
        rest.onClick(asyncInputUpdates);
      }, 2000);
    }
    if (rest.onChange) {
      rest.onChange(event.target.value);
    }
  };

  /** @function
   * @name onSubmit
   * @description per-processes the payload before making the API call
   * @returns {Promise<any>}
   */
  const onSubmit = (data) => {
    const request = { ...data };
    setMessage(false);
    apiRequest(request);
  };

  /** @async
   * @function apiRequestFactory
   * @param {object} @see {@link BaseHttpService.factoryXMLHttpReqest} for object structure
   * @description handles `Authorization:` XHR requests and sets success or errors state messages
   * @returns {Promise<any>}
   */
  const apiRequest = async (request) => {
    try {
      const result = await BaseHttpService.put('/auth/stacks/instance/' + server._id, request);
      const response = result.data.message ? result.data.message : result.statusText;
      setMessage({ text: 'Status ' + response, color: 'text-success' });
    } catch (error) {
      setMessage({ text: error.message + ' - Could be a duplicate name', color: 'text-danger' });
    }

    triggerParent();
  };

  return (
    <Fragment>
      {hasAccess ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <br />
          <strong>Edit Short Name/Alias</strong>
          <Form.Group controlId="formShortName">
            <Form.Label>Short Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Short Name"
              name="shortname"
              size="sm"
              ref={register}
            />
            <p className="text-danger text-capitalize">{errors.shortname?.message}</p>
          </Form.Group>

          <Form.Group controlId="formShortNameAlias">
            <Form.Label>Short Name Alias</Form.Label>
            <Form.Control
              type="text"
              placeholder="Short Name Alias"
              name="alias_shortname"
              size="sm"
              ref={register}
            />
            <p className="text-danger text-capitalize">{errors.alias_shortname?.message}</p>
          </Form.Group>

          <Button variant="primary" type="submit" block size="sm">
            Update
          </Button>
          {message ? <strong className={message.color}>{message.text}</strong> : message}
          <br />
        </Form>
      ) : (
        hasAccess
      )}
    </Fragment>
  );
};

export default EditShortName;
