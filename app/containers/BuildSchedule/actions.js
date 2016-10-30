/*
 *
 * BuildSchedule actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_SELECTED_CLASS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeSelectedClass(coursename, payload) {
  return {
    type: CHANGE_SELECTED_CLASS,
    coursename,
    payload,
  };
}
