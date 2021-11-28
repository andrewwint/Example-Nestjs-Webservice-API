import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertMessage = ({
  title = 'Oh snap! You got an error!',
  message,
  waitMessage = 'block',
  variant = 'warning'
}) => {
  return (
    <Alert variant={variant}>
      <Alert.Heading>{title}</Alert.Heading>
      <p>
        <strong className="text-capitalize">{variant}: </strong> {message}
      </p>
      <hr style={{ display: waitMessage }} />
      <p className="mb-0 form-text text-muted" style={{ display: waitMessage }}></p>
    </Alert>
  );
};

export default AlertMessage;
