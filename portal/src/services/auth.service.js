/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import axios from 'axios';
import * as BaseHttpService from './base-http.service';

/**
 * A namespace.
 * @namespace AuthService
 */

const developmentUrl = 'http://localhost:3000';

/**
 * @global
 * @constant {string} */
let URL = null;

/**
 * @description this block handles url switching depending on
 * the enviorment leveraging builtin React and Node enviormental
 * vars
 */
switch (process.env.NODE_ENV) {
  case 'production':
    URL = 'https://webservices.truechoice.io';
    break;
  case 'test':
    URL = 'http://localhost:3000';
    break;
  default:
    URL = developmentUrl;
    break;
}

/** @async
 * A function in AuthService (AuthService.login).
 * @function login
 * @memberof AuthService
 * @description Function for authenticating a user's
 * username and password using an external API returning
 * JWT tokens to be stored in the browser client-side
 * web storage
 * @param {string} username This parameter is always needed.
 * @param {string} password This parameter is always needed.
 * @returns {Promise<string | object>}
 */
export const login = async (username, password) => {
  const res = await axios.post(URL + '/auth/login', {
    username: username,
    password: password
  });
  if (res.data.accessToken) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }
  return res.data;
};

/** @function
 * A function in AuthService (AuthService.logout).
 * @name logout
 * @memberof AuthService
 * @description Function log a user out
 */
export const logout = () => {
  localStorage.removeItem('user');
};

/** @function
 * A function in AuthService (AuthService.getCurrentUser).
 * @name getCurrentUser
 * @memberof AuthService
 * @description Function to retrive the user
 * the entire user JWT object for browser
 * client-side storage
 * @returns {object}
 */
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

/** @property
 * A property in AuthService (AuthService.roles).
 * @name roles
 * @memberof AuthService
 * @description Array of roles used to generate checkboxs
 * @todo convert to API call
 */
export const roles = [
  { label: 'General User', value: 'user', checked: true, disabled: true },
  { label: 'Content', value: 'content', checked: true },
  { label: 'Deploy Assets', value: 'deploy', checked: true },
  { label: 'Server Administrator', value: 'server', checked: false },
  { label: 'Administrator', value: 'admin', checked: false },
  { label: 'API System User', value: 'api', checked: false }
];

/**@function
 * A function in AuthService (AuthService.updateCurrentUserTokens).
 * @name updateCurrentUserTokens
 * @memberof AuthService
 * @description Function to renew expired access tokens
 * using the long lived "refreshed" tokens
 */
export const updateCurrentUserTokens = async () => {
  const user = getCurrentUser();
  if (user.refreshToken) {
    const options = {
      headers: {
        Authorization: `Bearer ${user.refreshToken}`
      }
    };

    try {
      Object.assign(options, BaseHttpService._getRaxConfig());
      const res = await axios.post(URL + '/auth/refresh', {}, options);
      if (res.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(res.data));
      }
      return res.data;
    } catch (error) {
      logout();
      window.location.href = '/login';
    }
  }
  return user.user;
};

/**
 * A function in AuthService (AuthService.getErrorMessage).
 * @function getErrorMessage
 * @memberof AuthService
 * @borrows AuthService.getErrorMessage as BaseHttpService.getErrorMessage
 * @description Function parses axios and webservice
 * error meesages for user display
 * @param {any} error This parameter is always needed.
 * @returns {string}
 */
export const getErrorMessage = (error) => {
  return BaseHttpService.getErrorMessage(error);
};

/**@function
 * A function in AuthService (AuthService.hasRoleAccess).
 * @name hasRoleAccess
 * @memberof AuthService
 * @description Function to ensure that a user
 * has the appropriate role access
 * @example
 *   //user denied access
 *   const access = AuthService.hasRoleAccess(['user, 'admin'], ['content'])
 *
 *   //user allowed access
 *   const access = AuthService.hasRoleAccess(['user, 'admin', 'content'], ['content'])
 *
 * @param {Array} rolesAllowed This parameter is always needed.
 * @param {Array} currentUserRoles This parameter is always needed.
 * @returns {boolean}
 */
export const hasRoleAccess = (rolesAllowed, currentUserRoles) => {
  if (Array.isArray(rolesAllowed) && Array.isArray(currentUserRoles)) {
    return rolesAllowed.map((role) => currentUserRoles.includes(role)).includes(true);
  }
};

/**@function
 * A function in AuthService (AuthService.getStrongPassword)
 * @name getStrongPassword
 * @memberof AuthService
 * @description Generates random valid strong password
 * @returns {string}
 */
export const getStrongPassword = () => {
  //Generate randon stronp password
  const getPassword = () => {
    let length = 26,
      charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#%^&*',
      retVal = '';
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  };

  //validate passwors
  const validatePassword = (password) => {
    const regex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return password.match(regex);
  };

  let password = getPassword();
  let i = 0;

  //return valid password
  do {
    i += 1;
    if (validatePassword(password)) {
      return password;
    }
    password = getPassword();
  } while (i < 1000);
};
