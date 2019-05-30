/*
 *
 * Jadwal actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH,
  FETCH_DONE,
  SET_JADWAL_UTAMA,
  FETCH_PRIMARY_SCHEDULE,
  DELETE_JADWAL,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetch() {
  return {
    type: FETCH,
  };
}

export function fetchDone(mainSched, schedList) {
  return {
    type: FETCH_DONE,
    mainSched,
    schedList,
  };
}

export function fetchPrimarySchedule(mainSched) {
  return {
    type: FETCH_PRIMARY_SCHEDULE,
    mainSched,
  };
}

export function setJadwalUtama(id) {
  return {
    type: SET_JADWAL_UTAMA,
    id,
  };
}

export function deleteJadwal(id) {
  return {
    type: DELETE_JADWAL,
    id,
  };
}
