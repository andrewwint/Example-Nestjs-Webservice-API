import React, { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { Nav, NavDropdown } from 'react-bootstrap';

export function PrimaryNav() {
  const { currentUser } = useContext(UserContext);
  return (
    <React.Fragment>
      {currentUser.user ? (
        <Nav className="mr-auto">
          <Nav.Item>
            <Nav.Link href="/xml-import">XML Import</Nav.Link>
          </Nav.Item>
          {/* <Nav.Item>
            <Nav.Link href="/xml-generator">XML Generator</Nav.Link>
          </Nav.Item> */}
          <Nav.Item>
            <Nav.Link href="/servers">Stack Manager</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/activity">Activity Feed</Nav.Link>
          </Nav.Item>
          <NavDropdown title="Admin" id="basic-nav-dropdown">
            <NavDropdown.Item href="/users">Add User</NavDropdown.Item>
            <NavDropdown.Item href="/users/manage">Manage Users</NavDropdown.Item>
            <NavDropdown.Item href="/activity">Activity Feed</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/example-protected-page">Examples</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      ) : (
        <Nav className="mr-auto"></Nav>
      )}
    </React.Fragment>
  );
}

export default PrimaryNav;
