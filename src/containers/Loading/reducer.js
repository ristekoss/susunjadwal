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
  LOADING,
  LOADING_DONE,
} from './constants';

const initialState = fromJS({
	major_id: '',
  token: '',
  user_id: '',
  loading: false,
});

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_LOGIN_DATA:
      return state.set('major_id', action.majorId).set('token', action.token).set('user_id', action.userId);
    case LOG_OUT:
      return state.set('major_id', '').set('token', '').set('user_id', '');
    case LOADING:
      return state.set('loading', true);
    case LOADING_DONE:
      return state.set('loading', false);
    default:
      return state;
  }
}

export default globalReducer;
