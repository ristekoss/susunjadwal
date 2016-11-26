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
	primarySched: [
	/*
    {
      "name": "Basis Data",
      "day": "Kamis",
      "room": "2.2604",
      "start": "16.00",
      "end": "17.40"
    },
    {
      "name": "Basis Data",
      "day": "Selasa",
      "room": "2.2604",
      "start": "11.00",
      "end": "11.50"
    },
  */
  ],
	scheduleList: [
	/*
    {
      "id": "456abc",
      "utama": false,
      "created_at": "2016-10-25T02:13:24+00:00"
    },
    {
      "id": "123def",
      "utama": true,
      "created_at": "2016-10-25T02:13:24+00:00"
    }
  */
  ],
  firstTimeLoad: true,
});

function jadwalReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_DONE:
    	return state.set('primarySched', action.mainSched).set('scheduleList', action.schedList).set('firstTimeLoad', false);
   	case FETCH_PRIMARY_SCHEDULE:
   		return state.set('primarySched', action.mainSched);
    case SET_JADWAL_UTAMA:
    	const currentState = state.get('scheduleList').toJS();
    	const newState = [];
    	currentState.map((value, key) => {
    		value.utama = false;
    		if(value.id === action.id) {
    			value.utama = true;
    		}
    		newState.push(value);
    	});
    	console.log(newState);
    	return state.set('scheduleList', fromJS(newState));
    default:
      return state;
  }
}

export default jadwalReducer;
