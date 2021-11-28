/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import React, { useContext, Fragment, useEffect, useState } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import * as AuthService from '../../../../services/auth.service';
import * as BaseHttpService from '../../../../services/base-http.service';
import AlertMessage from '../../../../components/layout-util/alert-message/AlertMessage';
import LoadingSpinner from '../../../../components/layout-util/loading-spinner/LoadingSpinner';

const rolesAllowed = ['user'];

const GenerateApiKey = ({ userId }) => {
  const { currentUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [data, setMyData] = useState('');
  const [access, setAccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await BaseHttpService.put('/users/' + userId + '/apikey');
        setMyData(result.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
    setAccess(AuthService.hasRoleAccess(rolesAllowed, currentUser.user.roles));
  }, [currentUser.user.roles, userId]);

  if (data && access) {
    return (
      <Fragment>
        <div>
          New API Key:{' '}
          <samp>
            <strong>{data}</strong>
          </samp>
        </div>
      </Fragment>
    );
  } else if (error) {
    return <AlertMessage message={error.message} />;
  } else {
    return <LoadingSpinner />;
  }
};

export default GenerateApiKey;
