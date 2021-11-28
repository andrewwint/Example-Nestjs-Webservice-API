/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import React, { useContext } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { UserContext } from '../../../contexts/UserContext';

const UserCustomization = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Jumbotron>
      <h3>User Customization</h3>
      <p className="lead text-muted">
        Using is Stateful Functional Component and React Hooks instead of Class-based Stateful
        components.
      </p>

      <p>
        The user object is store in <code> currentUser.user </code> and accessed by adding{' '}
        <code>{`const {currentUser} = useContext(UserContext);`} </code> to your funtional component
        to access and manage state.
      </p>
      <p>
        Use <code>currentUser.user</code> to access the following:
      </p>
      <pre>{JSON.stringify(currentUser.user, null, 2)}</pre>
    </Jumbotron>
  );
};

export default UserCustomization;
