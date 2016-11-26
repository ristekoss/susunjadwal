/*
 *
 * JadwalSpesifik reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SET_LOGIN_DATA,
  LOG_OUT,
} from './constants';

const initialState = fromJS({
	major_id: '',
  token: '',
  user_id: '',
});

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_LOGIN_DATA:
      return state.set('major_id', action.majorId).set('token', action.token).set('user_id', action.userId);
    case LOG_OUT:
      return state.set('major_id', '').set('token', '').set('user_id', '');
    default:
      return state;
  }
}

export default globalReducer;
