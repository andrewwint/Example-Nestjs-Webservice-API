/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */
import * as rax from 'retry-axios';
import axios from 'axios';

/**
 * A namespace.
 * @namespace BaseHttpService
 */

/**
 * @file manages secure connects to the webservice as well retry on failure
 * @overview provides GET, POST, PUT, PATCH, DELETE methods to securly access API end-points.
 * Also a factory method for dynamic requests
 */

// eslint-disable-next-line
const interceptorId = rax.attach();
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
 * A function in BaseHttpService (BaseHttpService.get).
 * @function get
 * @memberof BaseHttpService
 * @description GET request for accessing/reading records using Authorization header
 * @example BaseHttpService.get('/auth/jwt/example-request/Hello World');
 * @param {string} endpoint This parameter is always needed.
 * @param {object} options optional header settings
 * @returns {Promise<any>}
 */
export const get = async (endpoint, options = {}) => {
  Object.assign(options, _getAccessToken(), _getRaxConfig());
  return await axios.get(`${URL}${endpoint}`, options);
};

/** @async
 * A function in BaseHttpService (BaseHttpService.post).
 * @function post
 * @memberof BaseHttpService
 * @description POST requests for creating new records using Authorization header
 * @example BaseHttpService.post('/auth/jwt/example-request/', data);
 * @param {string} endpoint This parameter is always needed.
 * @param {object} data This parameter is always needed.
 * @param {object} options optional header settings
 * @returns {Promise<any>}
 */
export const post = async (endpoint, data = {}, options = {}) => {
  Object.assign(options, _getAccessToken(), _getRaxConfig());
  return await axios.post(`${URL}${endpoint}`, data, options);
};

/** @async
 * A function in BaseHttpService (BaseHttpService.put).
 * @function put
 * @memberof BaseHttpService
 * @description PUT request for updating existing using Authorization header
 * @example BaseHttpService.put('/auth/jwt/example-request/5f05eac8bd748d6e947adfa5', data);
 * @param {string} endpoint This parameter is always needed.
 * @param {object} data This parameter is always needed.
 * @param {object} options optional header settings
 * @returns {Promise<any>}
 */
export const put = async (endpoint, data = {}, options = {}) => {
  Object.assign(options, _getAccessToken(), _getRaxConfig());
  return await axios.put(`${URL}${endpoint}`, data, options);
};

/** @async
 * A function in BaseHttpService (BaseHttpService.patch).
 * @function patch
 * @memberof BaseHttpService
 * @description PUT request for updating existing using Authorization header
 * @example BaseHttpService.patch('/auth/jwt/example-request/5f05eac8bd748d6e947adfa5', data);
 * @param {string} endpoint This parameter is always needed.
 * @param {object} data This parameter is always needed.
 * @param {object} options optional header settings
 * @returns {Promise<any>}
 */
export const patch = async (endpoint, data = {}, options = {}) => {
  Object.assign(options, _getAccessToken(), _getRaxConfig());
  return await axios.patch(`${URL}${endpoint}`, data, options);
};

/** @async
 * A function in BaseHttpService (BaseHttpService.remove).
 * @function remove
 * @memberof BaseHttpService
 * @description DELETE request for updating existing using Authorization header
 * @example BaseHttpService.remove('/auth/jwt/example-request/5f05eac8bd748d6e947adfa5');
 * @param {string} endpoint This parameter is always needed.
 * @param {object} data This parameter is always needed.
 * @param {object} options optional header settings
 * @returns {Promise<any>}
 */
export const remove = async (endpoint, data = {}, options = {}) => {
  Object.assign(options, _getAccessToken(), _getRaxConfig());
  return await axios.delete(`${URL}${endpoint}`, options, data);
};

/** @function
 * A function in BaseHttpService (BaseHttpService._getAccessToken).
 * @name _getAccessToken
 * @memberof BaseHttpService
 * @private
 * @description sets the Authorization header required for secure endpoints
 * @returns {object}
 */
export const _getAccessToken = () => {
  const token = JSON.parse(localStorage.getItem('user'));
  return {
    headers: {
      Authorization: `Bearer ${token.accessToken}`
    }
  };
};

/** @function
 * A function in BaseHttpService (BaseHttpService.getErrorMessage).
 * @name getErrorMessage
 * @memberof BaseHttpService
 * @description Function parses axios and webservice
 * error meesages for user display
 * @param {any} error This parameter is always needed.
 * @returns {string}
 */
export const getErrorMessage = (error) => {
  return (
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()
  );
};

/** @function
 * A function in BaseHttpService (BaseHttpService.getSuccessMessage).
 * @name getSuccessMessage
 * @memberof BaseHttpService
 * @description Function parses axios and webservice
 * error meesages for user display
 * @param {any} result This parameter is always needed.
 * @returns {string}
 */
export const getSuccessMessage = (result) => {
  let message = '';

  if (typeof result.data === 'string') {
    message = result.data;
  } else {
    message = result.data.length + ` entries found`;
  }

  return message;
};

/** @function
 * A function in BaseHttpService (BaseHttpService._getRaxConfig).
 * @name _getRaxConfig
 * @memberof BaseHttpService
 * @private
 * @description handles retries on failed requests
 * @returns {object}
 */
export const _getRaxConfig = () => {
  return {
    raxConfig: {
      // Retry 3 times on requests that return a response (500, etc) before giving up.  Defaults to 3.
      retry: 3,

      // Retry twice on errors that don't return a response (ENOTFOUND, ETIMEDOUT, etc).
      noResponseRetries: 2,

      // Milliseconds to delay at first.  Defaults to 100.
      retryDelay: 5000,

      // HTTP methods to automatically retry.  Defaults to:
      // ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT']
      httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT', 'PATCH'],

      // The response status codes to retry.  Supports a double
      // array with a list of ranges.  Defaults to:
      // [[100, 199], [429, 429], [500, 599]]
      statusCodesToRetry: [
        [100, 199],
        [401, 404],
        [429, 429],
        [500, 599]
      ],

      // You can set the backoff type.
      // options are 'exponential' (default), 'static' or 'linear'
      backoffType: 'exponential',

      // You can detect when a retry is happening, and figure out how many
      // retry attempts have been made
      onRetryAttempt: (err) => {
        const cfg = rax.getConfig(err);
        console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
      }
    }
  };
};

/** @function
 * A function in BaseHttpService (BaseHttpService.factoryXMLHttpReqest).
 * @name factoryXMLHttpReqest
 * @memberof BaseHttpService
 * @description dynamically makes GET, POST, PUT, and DELETE requests based on the `method`
 * @example
 *
 *  1. define an object with 3 properties
 *     const request = {
 *              method: 'post',
 *              url: '/users/5f05eac8bd748d6e947adfa5',
 *              data: {...form_data}
 *      };
 *
 *  2. pass the object to the function and the API request is made
 *      const result = await BaseHttpService.factoryXMLHttpReqest(request);
 *
 * @param {object} request This parameter is always needed.
 * @returns {Promise<any>}
 */
export const factoryXMLHttpReqest = async (request) => {
  let result = null;
  switch (request.method) {
    default:
      result = await get(request.url);
      break;
    case 'post':
      result = await post(request.url, request.data);
      break;
    case 'put':
      result = await put(request.url, request.data);
      break;
    case 'patch':
      result = await patch(request.url, request.data);
      break;
    case 'delete':
      result = await remove(request.url, request.data);
      break;
  }
  return result;
};
