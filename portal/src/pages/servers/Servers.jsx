/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import React, { Fragment, useState, useEffect } from 'react';
import {
  Jumbotron,
  Row,
  Col,
  Card,
  OverlayTrigger,
  Table,
  Button,
  Popover,
  Accordion,
  Modal,
  Form,
  CardDeck
} from 'react-bootstrap';
import * as BaseHttpService from '../../services/base-http.service';
import AlertMessage from '../../components/layout-util/alert-message/AlertMessage';
import AsyncInput from '../../components/async-input/AsyncInput';
import moment from 'moment';
import './Servers.scss';
import EditShortName from './sub-components/EditShortName';
import sortBy from 'lodash/sortBy';
import LoadingSpinner from '../../components/layout-util/loading-spinner/LoadingSpinner';
import InstanceDetails from './sub-components/InstanceDetails';
import * as Icon from 'react-bootstrap-icons';

/**@function
 * @name getUniqueStackNames
 * @description returns a list of unique `stackname`
 * @param {object} data
 * @returns {Array[object]}
 */
const getUniqueStackNames = (data) => {
  let groups = [];
  let instances = [];

  data.forEach((server) => {
    if (groups.indexOf(server.stackname) === -1 && server.stackname !== undefined) {
      groups.push(server.stackname);
      instances.push({ ...server });
    }
  });

  return sortBy(instances, ['createdate']).reverse();
};

/**@function
 * @name getServersByStackname
 * @description returns a list of servers by a stackname
 * @param {string} stackname - Required element of array from @see getUniqueStackNames
 * @param {object} data - payload of servers from web service call
 * @returns {Array[object]}
 */
const getServersByStackname = (stackname, data) => {
  let instances = [];
  let i = 0;
  data.forEach((server) => {
    if (server.stackname === stackname) {
      instances[i] = {
        ...server
      };
      i++;
    }
  });

  return sortBy(instances, ['servertype']);
};

/**
 * @name AsyncInputConfig
 * @description Configuration for dynamic input field
 * @see AsyncInput {@link /src/components/async-input/AsyncInput} for details
 * @type {object}
 */
const AsyncInputConfig = {
  method: 'get',
  url: '/auth/stacks/new',
  type: 'text',
  name: 'stackname',
  placeholder: 'Solstice Server Stack Name',
  buttonLabel: 'Import',
  inputSize: 'sm',
  helptext:
    "Import or refresh stacks by it's Solstice stack name. Note: this operation will reset the stack's record losing it's `shortname` and alias",
  validationRule: {
    required: 'Stack name required',
    minLength: { value: 8, message: '8 character minimum' },
    maxLength: { value: 126, message: '126 character maximum' }
  }
};

const Servers = () => {
  const [stacks, setStacks] = useState(null);
  const [servers, setServers] = useState([]);
  const [currentStack, setCurrentStack] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState();
  const [message, setMessage] = useState('');
  const [messageTitle, setMessageTitle] = useState('');
  const [messageVariant, setMessageVariant] = useState('success');
  const [show, setShow] = useState(false);

  //delete modal controls
  const handleCloseDeleteConfirm = () => setShow(false);
  const handleShowDeleteConfirm = () => setShow(true);

  const handleDeleteStack = async (event) => {
    if (currentStack) {
      try {
        const result = await BaseHttpService.remove('/auth/stacks/instances/' + currentStack);
        setMessage(JSON.stringify(result.data));
      } catch (error) {
        const message = BaseHttpService.getErrorMessage(error);
        setError(error);
        setMessage(message);
      }
    }

    setTimeout(() => {
      setMessage('');
    }, 3000);
    setShow(false);
  };

  const asyncInputUpdates = (message) => {
    setMessage(message);
    setLoading(true);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  useEffect(() => {
    setMessage('');

    const fetchData = async () => {
      try {
        const result = await BaseHttpService.get('/auth/stacks');
        setStacks(getUniqueStackNames(result.data));
        setServers(result.data);
      } catch (error) {
        const message = BaseHttpService.getErrorMessage(error);
        setMessageVariant('warning');
        setMessageTitle('Oh snap! You got an error!');
        setMessage(message);
        setError(error);
      }
    };

    fetchData();
  }, [loading]);

  if (stacks) {
    return (
      <Fragment>
        <Row>
          <Col>
            <Jumbotron className="Servers">
              <Row>
                <Col xs="auto" lg="4">
                  <h2 className="text-uppercase">Server Stack Manager</h2>
                </Col>
                <Col xs="auto" lg="4">
                  <AsyncInput inputElement={AsyncInputConfig} onClick={asyncInputUpdates} />
                </Col>
                <Col xs="auto" lg="4" className="text-center  d-none d-lg-block d-xl-block">
                  <img src="/assets/icons/hdd-stack.svg" width="30%" alt="import-xml-ready" />
                </Col>
              </Row>

              {message && (
                <AlertMessage
                  title={messageTitle}
                  message={message}
                  waitMessage="none"
                  variant={messageVariant}
                />
              )}
              <hr className="d-none d-lg-block d-xl-block" />

              <CardDeck>
                {stacks.map((stack, i) => (
                  <Card
                    key={i}
                    bg={stack.status.includes('stopped') || !stack.xmlimportsupport ? 'light' : ''}
                  >
                    <Card.Body>
                      <Card.Title className="d-flex justify-content-between">
                        <div className="text-uppercase">{stack.stackname}</div>

                        <div style={{ marginRight: '5px' }}>
                          <Form
                            onSubmit={(e) => {
                              e.preventDefault();
                              setCurrentStack(stack.stackname);
                              handleShowDeleteConfirm();
                            }}
                          >
                            <input type="hidden" value={stack.name} name="stackname" />
                            <Button type="submit" size="sm" variant="danger">
                              Remove Stack
                            </Button>
                          </Form>
                        </div>
                      </Card.Title>
                      <Accordion defaultActiveKey={i}>
                        <Table responsive hover>
                          <tbody>
                            {getServersByStackname(stack.stackname, servers).map((server, i) => (
                              <Fragment key={server._id}>
                                <tr>
                                  <td>
                                    {stack.status.includes('stopped') || !stack.xmlimportsupport ? (
                                      <Icon.XCircle color="red" />
                                    ) : (
                                      <Icon.Check2Circle color="green" />
                                    )}
                                  </td>
                                  <td> {server.servertype}</td>
                                  <th>
                                    <OverlayTrigger
                                      key={i}
                                      placement="top"
                                      overlay={
                                        <Popover id="popover-basic">
                                          <Popover.Title as="h3">
                                            {server.environment}
                                          </Popover.Title>
                                          <Popover.Content style={{ width: '150%' }}>
                                            <InstanceDetails server={server} />
                                          </Popover.Content>
                                        </Popover>
                                      }
                                    >
                                      <samp>{server.shortname}</samp>
                                    </OverlayTrigger>
                                    <Accordion.Collapse eventKey={server._id + '-edit-shortname'}>
                                      <EditShortName server={server} onClick={asyncInputUpdates} />
                                    </Accordion.Collapse>
                                  </th>
                                  <td> {server.alias_shortname}</td>
                                  <td> {server.ip}</td>
                                  <td> {server.private_ip}</td>
                                  <td align="right">
                                    <Accordion.Toggle
                                      as={Button}
                                      eventKey={server._id + '-edit-shortname'}
                                      size="sm"
                                      hidden={!stack.xmlimportsupport}
                                      variant={
                                        server.status.includes('stopped')
                                          ? 'outline-secondary'
                                          : 'info'
                                      }
                                    >
                                      edit name <Icon.PencilSquare color="#fff" />
                                    </Accordion.Toggle>
                                  </td>
                                </tr>
                              </Fragment>
                            ))}
                          </tbody>
                        </Table>
                      </Accordion>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-between">
                      <div>{moment(stack.modifieddate, 'YYYYMMDD').fromNow()}</div>
                      <div>
                        Health Check{' '}
                        {stack.status.includes('stopped') || !stack.xmlimportsupport ? (
                          <Fragment>
                            {stack.status.includes('stopped') ? (
                              <code>Stopped</code>
                            ) : (
                              <code>Not Running</code>
                            )}
                          </Fragment>
                        ) : (
                          <strong>Running</strong>
                        )}
                      </div>
                    </Card.Footer>
                  </Card>
                ))}
              </CardDeck>
            </Jumbotron>
          </Col>
        </Row>
        <Modal show={show} onHide={handleCloseDeleteConfirm}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete <strong>{currentStack}</strong> from the database.
            <hr />
            <strong>Note:</strong>{' '}
            <em>The AWS EC2 Instance won't be affected by the is opperation</em>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseDeleteConfirm}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteStack}>
              Delete Stack
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  } else if (error) {
    return <AlertMessage message={error.message} />;
  } else {
    return (
      <Fragment>
        <Jumbotron className="Servers">
          <LoadingSpinner message="Refreshing Stack Status from AWS.EC2..." />
        </Jumbotron>
      </Fragment>
    );
  }
};

export default Servers;
