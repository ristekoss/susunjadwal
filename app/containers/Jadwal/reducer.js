/*
 *
 * Jadwal reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SET_JADWAL_UTAMA,
  FETCH_DONE,
  FETCH_PRIMARY_SCHEDULE,
} from './constants';

const initialState = fromJS({
  // TO-DO why we need this?
  primarySched: [],
  scheduleList: []
});

function jadwalReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_DONE:
      return state.set('scheduleList', action.schedList);
    case FETCH_PRIMARY_SCHEDULE:
      return state.set('primarySched', action.mainSched);
    case SET_JADWAL_UTAMA:
      const currentState = fromJS(state.get('scheduleList'));
      const newState = [];
      currentState.map((value, key) => {
        value.utama = false;
        if (value.id === action.id) {
          value.utama = true;
        }
        newState.push(value);
      });
      return state.set('scheduleList', fromJS(newState));
    default:
      return state;
  }
}

export default jadwalReducer;
