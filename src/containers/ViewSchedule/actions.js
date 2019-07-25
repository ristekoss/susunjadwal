/*
 *
 * JadwalSpesifik actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH,
  FETCH_DONE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetch(slug) {
  return {
    type: FETCH,
    slug,
  };
}

export function fetchDone(payload) {
  return {
    type: FETCH_DONE,
    payload,
  };
}
