/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import React, { useEffect, useState, Fragment, useContext } from 'react';
import * as AuthService from '../../services/auth.service';
import { UserContext } from '../../contexts/UserContext';
import jwt from 'jsonwebtoken';
import moment from 'moment';

const AccessTokenExpirationCheck = () => {
  const { currentUser } = useContext(UserContext);
  const [accessTokenExpireIn, setAccessTokenExpireIn] = useState(null);
  const [refreshTokenExpireIn, setRefreshTokenExpireIn] = useState(null);
  const [currentTimeLeft, setCurrentTimeLeft] = useState(Date.now());
  const INTERVALTIME = 5000;

  useEffect(() => {
    /**
     * @description Function for determining
     * if the JWT tokens have expired
     */
    const calculateExpiration = async () => {
      if (accessTokenExpireIn && currentTimeLeft) {
        /**
         * Check the expiration date of the long lived token
         */
        if (currentTimeLeft >= refreshTokenExpireIn * 1000) {
          AuthService.logout();
        }
        /**
         * Check the expiration date of the short lived token
         */
        const TIMEOFFSET = INTERVALTIME * 8;
        if (currentTimeLeft >= accessTokenExpireIn * 1000 - TIMEOFFSET) {
          const updatedUser = await AuthService.updateCurrentUserTokens();
          updateCurrentUser(updatedUser.user);
          setCurrentTokenExpiration(updatedUser);
        }
      }
    };

    /**
     * @description Function to retrive the user
     * the entire user JWT object for browser client-side storage
     */
    const getCurrentUser = () => {
      return AuthService.getCurrentUser();
    };

    /**
     * @description Function to set and update
     * the state of each tokens expiration date
     * @param {Object} user This parameter is always needed.
     */
    const setCurrentTokenExpiration = (user) => {
      const { accessToken, refreshToken } = user;
      const decodedAccessToken = jwt.decode(accessToken);
      const decodedrefreshToken = jwt.decode(refreshToken);

      if (decodedAccessToken && decodedrefreshToken) {
        setAccessTokenExpireIn(decodedAccessToken.exp);
        setRefreshTokenExpireIn(decodedrefreshToken.exp);
      }
    };

    /**
     * @description Function to set and update
     * the global state of the user object to be
     * used by other components in the application
     * @param {Object} updatedUser This parameter is always needed.
     */
    const updateCurrentUser = (updatedUser) => {
      return currentUser.setUser(updatedUser);
    };

    /**
     * Initializes the functionality of this component
     * setting and updating all the values.
     *
     * Also sets the webservice/API 'pull' frequency rate
     * using setInterval JS.Timeout.
     *
     * Requires a valid and logged in user
     */
    const user = getCurrentUser();

    if (user) {
      setCurrentTokenExpiration(user);
      const intervalId = setInterval(() => {
        setCurrentTimeLeft(Date.now());
        calculateExpiration();
      }, INTERVALTIME);
      return () => clearInterval(intervalId);
    }
  }, [currentTimeLeft, accessTokenExpireIn, refreshTokenExpireIn, currentUser]);

  return (
    <Fragment>
      Last Login {moment(currentUser.user.lastlogin, 'YYYYMMDD').fromNow()} / Access Token
      Refreshing in less than{' '}
      {moment(new Date(accessTokenExpireIn * 1000), 'MMMM Do YYYY, h:mm:ss a').fromNow()}
    </Fragment>
  );
};
export default AccessTokenExpirationCheck;
