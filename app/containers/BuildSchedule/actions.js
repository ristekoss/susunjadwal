/*
 *
 * BuildSchedule actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_SELECTED_CLASS,
  ADD_SELECTED_CLASS,
  REMOVE_SELECTED_CLASS,
  CONFLICT,
  SAVE_JADWAL,
  FETCH_JADWAL,
  FETCH_JADWAL_SUCCESS,
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

export function addSelectedClass(coursename, payload) {
  return {
    type: ADD_SELECTED_CLASS,
    coursename,
    payload,
  };
}

export function removeSelectedClass(coursename) {
  return {
    type: REMOVE_SELECTED_CLASS,
    coursename,
  };
}

export function conflict(payload) {
  return {
    type: CONFLICT,
    payload,
  };
}

export function saveJadwal() {
  return {
    type: SAVE_JADWAL,
  };
}

export function fetchJadwal() {
  return {
    type: FETCH_JADWAL,
  };
}

export function fetchJadwalSuccess(courses) {
  return {
    type: FETCH_JADWAL_SUCCESS,
    courses,
  }
}