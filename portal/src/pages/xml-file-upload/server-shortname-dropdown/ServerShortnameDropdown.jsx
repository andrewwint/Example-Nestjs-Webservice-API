import React from 'react';
import { Col, Form } from 'react-bootstrap';

const DEV_TEST = 'dev-test';
const serverShortnames = [DEV_TEST, 'staging', 'dev', 'demo', 'acn-app-1'];

function ServerShortnameControl(props) {
  /**
   * @description Function used as a wrapper for
   * executing the logic associated to setting up
   * the options and default option for the
   * drop down control
   * @returns {Object}
   */
  function generateMarkupForServerOptions() {
    return serverShortnames.map((server) => {
      if (server === DEV_TEST) {
        return (
          <option value={server} key={server} defaultValue>
            {server}
          </option>
        );
      } else {
        return (
          <option value={server} key={server}>
            {server}
          </option>
        );
      }
    });
  }

  return (
    <Col xs={props.col}>
      <Form.Group>
        <Form.Label>Servers</Form.Label>
        <Form.Control
          as="select"
          id="serverShortname"
          name="serverShortname"
          onChange={props.onChange}
          value={props.value}
        >
          {generateMarkupForServerOptions()}
        </Form.Control>
        <Form.Text className="text-muted">Select the server you would like to upload to</Form.Text>
      </Form.Group>
    </Col>
  );
}

export default ServerShortnameControl;
