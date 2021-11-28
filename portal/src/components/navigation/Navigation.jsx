import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import PrimaryNav from './sub-components/primary-nav';
import SecondaryNav from './sub-components/secondary-nav';
import './Navigation.scss';

class Navigation extends Component {
  state = {};
  render() {
    return (
      <Navbar sticky="top" bg="dark" expand="lg" className="shadow-sm">
        <Navbar.Brand href="/dasboard">TrueChoice Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <PrimaryNav />
          <SecondaryNav />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
