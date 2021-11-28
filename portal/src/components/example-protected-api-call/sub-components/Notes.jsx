import React, { Fragment } from 'react';

import { Card } from 'react-bootstrap';

const Notes = () => {
  return (
    <Fragment>
      <Card.Subtitle>
        <p>
          This component uses <code>BaseHttpService.get()</code> to make XMLHttpRequest (XHR) calls
          to the backend webservice. It dynamically includes the user's <code>accessTokens</code>{' '}
          for authentication and authorization to access services within the webservice
        </p>
      </Card.Subtitle>

      <Card.Title>Inherited Access from Parent Componet </Card.Title>
      <Card.Text>
        This example <code>{`<ExampleGetRequest />`}</code> component inherits it's authorization
        from it's parent by using props <code>{`rolesAllowed={rolesAllowed}`}</code>
      </Card.Text>
      <Card.Title>Webserice Authorization </Card.Title>

      <Card.Text>
        The webservice Controllers uses Guards <strong>SRP</strong> to manage authentication and
        authorization. <code>JwtAuthGuard</code> manages authentication which returns the user's{' '}
        <code>roles</code> and <code>username</code> to be used by <code>RolesGuard()</code> which
        uses the <code>roles</code> array to filter access to resources.
        <br />
        <code>{`@UseGuards(JwtAuthGuard, new RolesGuard(['admin', 'user', 'content']))`}</code> in
        addition the <code>{`@ApiBearerAuth()`}</code> will verify that the JavaScript Web Tokens
        (JWT) are valid.
      </Card.Text>
    </Fragment>
  );
};

export default Notes;
