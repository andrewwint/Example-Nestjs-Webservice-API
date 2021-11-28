/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import React, { useContext, useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import * as AuthService from '../../services/auth.service';
import WarningMessage from './WarningMessage';

const PrivateRoute = ({ component: Component, rolesAllowed, ...rest }) => {
  const { currentUser } = useContext(UserContext);
  const [access, setAccess] = useState(undefined);

  useEffect(() => {
    if (currentUser.user) {
      setAccess(AuthService.hasRoleAccess(rolesAllowed, currentUser.user.roles));
    }
  }, [currentUser.user, rolesAllowed]);

  if (access) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }

  return <WarningMessage />;
};
export default PrivateRoute;
