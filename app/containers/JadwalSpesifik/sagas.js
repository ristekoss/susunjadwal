import { takeLatest } from 'redux-saga';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { take, call, select, cancel, fork, put } from 'redux-saga/effects';
import { FETCH } from './constants';
import { isEmpty, isEqual } from 'lodash';
import { fetchDone } from './actions';
import request from 'utils/request';
import { loading, loadingDone } from 'containers/App/actions';
import { API_BASE_URL } from "../../api.js"

export function* fetchScheduleData(action) {
  yield put(loading());
	let requestURL = API_BASE_URL + `/user_schedules/${action.slug}`;
  let jobId = action.slug

	const fetchScheduleDataCall = yield call(request, requestURL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if(!fetchScheduleDataCall.err || !(fetchScheduleDataCall.err === 'SyntaxError: Unexpected end of JSON input')) {
    yield put(fetchDone(fetchScheduleDataCall.data.user_schedule));
    yield put(loadingDone());
  } else {
    console.log(fetchScheduleDataCall.err);
    yield put(loadingDone());
  }
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* fetchScheduleSaga() {
  yield takeLatest(FETCH, fetchScheduleData);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* jadwalSpesifikSaga() {
  // Fork watcher so we can continue execution
  const fetchScheduleWatcher = yield fork(fetchScheduleSaga);
}

// Bootstrap sagas
export default [
 jadwalSpesifikSaga,
];
