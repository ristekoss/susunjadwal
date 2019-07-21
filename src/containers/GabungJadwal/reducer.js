/*
 *
 * GabungJadwal reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  ADD_INPUT,
  DEL_INPUT,
  CHANGE_INPUT,
} from './constants';

const initialState = fromJS({
	inputs: [
		{
			value: ''
		},
		{
			value: ''
		},
	],
});

function gabungJadwalReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ADD_INPUT:
      return state.set('inputs', state.get('inputs').push({value: ''}));
    case DEL_INPUT:
      return state.set('inputs', state.get('inputs').pop());
    case CHANGE_INPUT:
    	const currentState = state.toJS();
    	let nextState = currentState.inputs;
    	nextState[action.index].value = action.value;
      return state.set('inputs', fromJS(nextState));
    default:
      return state;
  }
}

export default gabungJadwalReducer;
