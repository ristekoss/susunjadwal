/*
 *
 * BuildSchedule reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  CHANGE_SELECTED_CLASS,
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
                              'Dina Chahyati'
                          ]
                      } 
                  ]
              }
           ],
  selected: {
              "Basis Data":"",
            },
  picked: [],
});

function buildScheduleReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CHANGE_SELECTED_CLASS:
      return state.setIn(['selected', action.coursename], action.payload);
    default:
      return state;
  }
}

export default buildScheduleReducer;
