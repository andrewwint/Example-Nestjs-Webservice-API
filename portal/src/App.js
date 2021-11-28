/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import React, { useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/private-route/PrivateRoute';
import * as AuthService from './services/auth.service';
import { UserContext } from './contexts/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import './App.scss';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Pusher from './components/notifications/pusher.class';
import Navigation from './components/navigation/Navigation';
import Home from './pages/home/Home';
import LogInPage from './pages/login/LogInPage';
import AppConfig from './components/app-config/AppConfig';
import XmlFileUpload from './pages/xml-file-upload/XmlFileUpload';
import ActivityPage from './pages/activity-feed/ActivityPage';
import AccessTokenExpirationCheck from './components/access-token-expiration-check/accessTokenExpirationCheck';
import ExampleProtectedPage from './pages/example-protected-page/ExampleProtectedPage';
import AddUser from './pages/admin/users/AddUser';
import Users from './pages/admin/users/Users';
import EditUser from './pages/admin/users/EditUser';
import Servers from './pages/servers/Servers';

const App = (props) => {
  const pusher = new Pusher();
  pusher.initializeNotifications();

  const [user, setUser] = useState(null);
  const currentUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    const authToken = AuthService.getCurrentUser();
    if (authToken) {
      setUser(authToken.user);
    }
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ currentUser }}>
        {currentUser.user ? <ReactNotification /> : currentUser.user}
        <header>
          <Navigation />
        </header>

        <Container className="mt-5">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LogInPage} />
            <Route path="/appconfig" component={AppConfig} />
            <PrivateRoute
              path="/xml-import"
              rolesAllowed={['content', 'user']}
              component={XmlFileUpload}
            />
            <PrivateRoute exact path="/users" rolesAllowed={['admin']} component={AddUser} />
            <PrivateRoute path="/users/manage" rolesAllowed={['admin']} component={Users} />
            <PrivateRoute path="/user/:id/edit" rolesAllowed={['admin']} component={EditUser} />
            <PrivateRoute
              path="/activity"
              rolesAllowed={['admin', 'user']}
              component={ActivityPage}
            />
            <PrivateRoute path="/servers" rolesAllowed={['admin', 'server']} component={Servers} />
            <PrivateRoute path="/content" rolesAllowed={['admin', 'content']} component={Home} />
            <PrivateRoute
              path="/example-protected-page"
              rolesAllowed={['user', 'content']}
              component={ExampleProtectedPage}
            />
            <Route path="*" component={Home} />
          </Switch>
        </Container>

        <footer className="footer d-flex justify-content-between">
          <div> {currentUser.user ? <AccessTokenExpirationCheck /> : currentUser.user} </div>
          <div> Copyright © 2020 TrueChoice Solutions, Inc. </div>
        </footer>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
