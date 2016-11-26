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
  CONFLICT
} from './constants';

const initialState = fromJS({
  courses: [
              {
                  "name": "Basis Data",
                  "sks": 3,
                  "term": 3,
                  "class": [
                      {
                          "name": "A",
                          "jadwal": [
                              {
                                  "day": "Kamis",
                                  "start": "16.40",
                                  "end": "17.50",
                                  "room": "2604",
                              },
                              {
                                  "day": "Kamis",
                                  "start": "16.40",
                                  "end": "17.50",
                                  "room": "2604",
                              }
                          ],
                          "lecturer": [
                              'Dina Chahyati'
                          ]
                      },

                      {
                          "name": "B",
                          "jadwal": [
                              {
                                  "day": "Kamis",
                                  "start": "16.40",
                                  "end": "17.50",
                                  "room": "2604",
                              }
                          ],
                          "lecturer": [
                              'Dina Chahyati'
                          ]
                      } 
                  ]
              },
              {
                  "name": "Basis Dota",
                  "sks": 3,
                  "term": 3,
                  "class": [
                      {
                          "name": "A",
                          "jadwal": [
                              {
                                  "day": "Kamis",
                                  "start": "16.40",
                                  "end": "17.50",
                                  "room": "2604",
                              },
                              {
                                  "day": "Kamis",
                                  "start": "16.40",
                                  "end": "17.50",
                                  "room": "2604",
                              }
                          ],
                          "lecturer": [
                              'Dina Chahyati'
                          ]
                      },

                      {
                          "name": "B",
                          "jadwal": [
                              {
                                  "day": "Kamis",
                                  "start": "16.40",
                                  "end": "17.50",
                                  "room": "2604",
                              }
                          ],
                          "lecturer": [
                              'Dina Chahyati',
                              'Dina Chahyati',
                              'Dina Chahyati',
                              'Dina Chahyati'
                          ]
                      } 
                  ]
              }
           ],
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
    default:
      return state;
  }
}

export default buildScheduleReducer;
