/*
 *
 * BuildSchedule actions
 *
 */

import {
  DEFAULT_ACTION,
  SET_LOGIN_DATA,
  LOG_OUT,
  LOADING,
  LOADING_DONE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setLoginData(majorId, token, userId) {
  return {
    type: SET_LOGIN_DATA,
    majorId,
    token,
    userId,
  };
}

export function logOut() {
  return {
    type: LOG_OUT,
  };
}

export function loading() {
  return {
    type: LOADING,
  };
}

export function loadingDone() {
  return {
    type: LOADING_DONE,
  };
}
