import { takeLatest } from 'redux-saga';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { take, call, select, cancel, fork, put } from 'redux-saga/effects';
import { FETCH, SET_JADWAL_UTAMA, DELETE_JADWAL } from './constants';
import { isEmpty, isEqual } from 'lodash';
import selectGlobal from 'containers/App/selectors';
import selectJadwal from './selectors';
import { fetchDone, fetchPrimarySchedule } from './actions';
import request from 'utils/request';
import { loading, loadingDone } from 'containers/App/actions';
import { consolidateStreamedStyles } from 'styled-components';
import { API_BASE_URL } from '../../api';

function getCookie(cname) {
  // TO-DO refactor
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function* fetchUserData() {
  yield put(loading());
  const user_id = getCookie("user_id");
  const token = getCookie("token");
  const requestURL = API_BASE_URL + `/users/${user_id}/user_schedules`;
  const auth = `Bearer ${token}`;

  const fetchUserDataCall = yield call(request, requestURL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth,
    },
  });
  if (!fetchUserDataCall.err) {
    yield put(fetchDone(fetchUserDataCall.data.user_schedules));
  } else {
    // TO-DO yield error
  }
  yield put(loadingDone());
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* fetchUserDataSaga() {
  yield takeLatest(FETCH, fetchUserData);
}

/**
 * DELETE_JADWAL handler
 */
export function* deleteJadwal(action) {
  yield put(loading());
  const globalState = yield select(selectGlobal());
  const user_id = getCookie("user_id");
  const token = getCookie("token");
  const requestURL = API_BASE_URL + `/users/${user_id}/user_schedules/${action.id}`;
  const auth = `Bearer ${token}`;

  const response = yield call(request, requestURL, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth,
    },
  });

  console.log(response.err);

  if (!response.err) {
    /* TO-DO: Handle refreshing after delete gracefully. 
     * See https://stackoverflow.com/questions/41769969/how-to-make-my-component-re-render-after-updating-props-from-selector-in-react-a
     */

    window.location.reload();
  } else {
    // TO-DO error
    console.log(response.err);
  }
  yield put(loadingDone());
}

/**
 * Watches for DELETE_JADWAL action and calls handler
 */
export function* deleteJadwalSaga() {
  yield takeLatest(DELETE_JADWAL, deleteJadwal);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* jadwalSaga() {
  // Fork watcher so we can continue execution
  const fetchUserDataWatcher = yield fork(fetchUserDataSaga);
  const deleteJadwalWatcher = yield fork(deleteJadwalSaga);
}

// Bootstrap sagas
export default [
  jadwalSaga,
];
