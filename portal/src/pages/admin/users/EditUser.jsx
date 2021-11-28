/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as BaseHttpService from '../../../services/base-http.service';
import LoadingSpinner from '../../../components/layout-util/loading-spinner/LoadingSpinner';
import EditUserForm from './EditUserForm';

const EditUser = () => {
  let { id } = useParams();
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await BaseHttpService.get('/users/' + id);
        setUser(result.data);
      } catch (error) {}
    };
    fetchData();
  }, [id]);

  if (user) {
    return <EditUserForm preloadedValues={user} />;
  } else {
    return <LoadingSpinner />;
  }
};

export default EditUser;
