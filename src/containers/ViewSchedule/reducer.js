/*
 *
 * JadwalSpesifik reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  FETCH_DONE,
} from './constants';

const initialState = fromJS({
	primarySched: [],
  firstTimeLoad: true,
});

function jadwalSpesifikReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_DONE:
    	return state.set('primarySched', action.payload);
    default:
      return state;
  }
}

export default jadwalSpesifikReducer;
