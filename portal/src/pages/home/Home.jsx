import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import './Home.scss';

class Home extends Component {
  state = {};
  render() {
    return (
      <Jumbotron className="text-center">
        <h1>Welcome</h1>
        <p className="lead text-muted">
          Example page and components useing the webservice's authentication and authorization API
          to ensure the right user has access to the right resources
        </p>
        <p>
          <Button variant="primary my-2" href="/example-protected-page">
            See Example Page and Components
          </Button>
        </p>
      </Jumbotron>
    );
  }
}

export default Home;
