/*
 *
 * BuildSchedule reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  CHANGE_SELECTED_CLASS,
  ADD_SELECTED_CLASS,
  REMOVE_SELECTED_CLASS,
  CONFLICT,
  FETCH_JADWAL_SUCCESS,
} from './constants';

const initialState = fromJS({
  courses: [],
  selected: {},
  picked: {},
  conflict: [],
});

function buildScheduleReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CHANGE_SELECTED_CLASS:
      return state.setIn(['selected', action.coursename], action.payload);
    case ADD_SELECTED_CLASS:
      return state.setIn(['picked', action.coursename], action.payload);
    case REMOVE_SELECTED_CLASS:
      var newData = state.get('picked').toJS();
      delete newData[action.coursename];
      return state.set('picked', fromJS(newData)).setIn(['selected', action.coursename], '');
    case CONFLICT:
      return state.set('conflict', action.payload);
    case FETCH_JADWAL_SUCCESS:
      return state.set('courses', action.courses);
    default:
      return state;
  }
}

export default buildScheduleReducer;
