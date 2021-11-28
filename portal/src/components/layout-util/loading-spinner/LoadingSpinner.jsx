import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="" style={{ width: '40rem', height: '4rem' }}>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      <h2 className="d-inline  p-2">{message}</h2>
    </div>
  );
};

export default LoadingSpinner;
