import React from 'react';
import { Col, Form, Toast } from 'react-bootstrap';
import { IconContext } from "react-icons";
import { GoAlert, GoCheck } from "react-icons/go";

import './XmlFileUploadToast.scss';

function XmlFileUploadToast(props) {
  /**
   * @description Function used to get the correct
   * markup for the icons, which depends on the
   * succcess/error flag
   * @returns {Object}
   */
  function getIconForMessage() {
    let color;
    let icon;

    if (props.success) {
      color = 'green';
      icon = <GoCheck />
    } else {
      color = 'red';
      icon = <GoAlert />
    }

    return (
      <IconContext.Provider value={{ className: "xml-file-upload-toast-header", color, size: '2em' }}>
        {icon}
      </IconContext.Provider>
    );
  }

  return (
    <Form.Row>
        <Col>
          <Toast onClose={props.onClose} show={props.show}>
            <Toast.Header>
              {getIconForMessage()}
              <strong className={props.success ? 'success-header' : 'failure-header'}>{props.success ? 'Success' : 'Failure'}</strong>
            </Toast.Header>
            <Toast.Body className={!props.success ? 'toast-body-overflow-x-scroll' : ''}>
              <ul>
                {props.messages.map((message, index) => <li key={index}>{message}</li>)}
              </ul>
            </Toast.Body>
          </Toast>
        </Col>
      </Form.Row>
  );
}

export default XmlFileUploadToast;