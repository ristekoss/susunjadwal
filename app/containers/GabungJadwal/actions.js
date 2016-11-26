/*
 *
 * GabungJadwal actions
 *
 */

import {
  DEFAULT_ACTION,
  ADD_INPUT,
  DEL_INPUT,
  CHANGE_INPUT,
  SUBMIT,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function addInput() {
  return {
    type: ADD_INPUT,
  };
}

export function delInput() {
  return {
    type: DEL_INPUT,
  };
}

export function changeInput(index, value) {
  return {
    type: CHANGE_INPUT,
    index,
    value,
  };
}

export function submit() {
  return {
    type: SUBMIT,
  };
}