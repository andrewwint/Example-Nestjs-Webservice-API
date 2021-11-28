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
  version: yup.string().required().min(2)
});

/**@function
 * @name getRegionByStackName
 * @description Extracts substring from a larger string
 *              finds 'us-east-2' within 'staging-us-east-2-solstice'
 *              defualt is 'us-east-1'
 *
 * @param  {string} stackname
 * @returns {string} @default 'us-east-1'
 */
const getRegionByStackName = (stackname) => {
  const parts = stackname.split('-');
  let region = 'us-east-1';

  if (!isNaN(parseInt(parts[3]))) {
    region = `${parts[1]}-${parts[2]}-${parts[3]}`;
  }
  return region;
};

//Sets who has access to this component
const rolesAllowed = ['admin', 'server'];

const InstallBackend = ({ server, ...rest }) => {
  //Handles access based on rolesAllowed array
  const { currentUser } = useContext(UserContext);
  const hasAccess = AuthService.hasRoleAccess(rolesAllowed, currentUser.user.roles);

  // eslint-disable-next-line
  const [region, setRegion] = useState(() => getRegionByStackName(server.stackname));
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
   * @description Handles commuication back to parent
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
    if (rest.onClick) {
      setTimeout((asyncInputUpdates) => {
        rest.onClick(asyncInputUpdates);
        setMessage({});
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
    console.log(data, server.instance_id);
    const request = { ...data, instance_id: server.instance_id };
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
      const result = await BaseHttpService.get(
        `/installer/${request.instance_id}/${request.environment}/${
          request.nodesize
        }/${request.version.trim()}/${request.region}`
      );
      const response = result.data.message ? result.data.message : result.statusText;
      setMessage({ text: 'Status ' + response, color: 'text-success' });
    } catch (error) {
      setMessage({ text: error.message + ' - Try Again', color: 'text-danger' });
    }
  };

  return (
    <Fragment>
      {hasAccess ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <br />
          <strong>Install Backend</strong>
          <Form.Group controlId="formEnvironment">
            <Form.Label>Environment</Form.Label>
            <Form.Control as="select" name="environment" ref={register} size="sm">
              <option value="dev">Development</option>
              <option value="staging">Staging</option>
              <option value="production">Production</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formNodesize">
            <Form.Label>Node Size</Form.Label>
            <Form.Control as="select" name="nodesize" ref={register} size="sm">
              <option value="nano">Nano</option>
              <option value="micro">Micro</option>
              <option value="small">Small</option>
              <option value="med">Medium</option>
              <option value="large">Large</option>
              <option value="x-large">X-Large</option>
              <option value="xx-large">XX-Large</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formVersion">
            <Form.Label>Version</Form.Label>
            <Form.Control
              type="text"
              placeholder="Version"
              name="version"
              size="sm"
              ref={register}
            />
          </Form.Group>
          <p className="text-danger text-capitalize">{errors.version?.message}</p>

          <Form.Group controlId="formRegion">
            <Form.Label>Region</Form.Label>
            <Form.Control
              type="text"
              name="region"
              ref={register}
              size="sm"
              disabled
              value={region}
            />
          </Form.Group>

          <Button variant="primary" type="submit" block size="sm" onClick={triggerParent}>
            Install Backend Application
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

export default InstallBackend;
