import { takeLatest } from 'redux-saga';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { take, call, select, cancel, fork, put } from 'redux-saga/effects';
import { FETCH, SET_JADWAL_UTAMA } from './constants';
import { isEmpty, isEqual } from 'lodash';
import selectGlobal from 'containers/App/selectors';
import selectJadwal from './selectors';
import { fetchDone, fetchPrimarySchedule } from './actions';
import request from 'utils/request';
import { loading, loadingDone } from 'containers/App/actions';

/**
 * Github repos request/response handler
 */
export function* fetchUserData() {
  yield put(loading());
	const globalState = yield select(selectGlobal());
  const requestURL = `https://private-anon-7cc79298a3-sunjad.apiary-mock.com/sunjad/api/users/${globalState.user_id}/jadwals`;
  const auth = `Bearer ${globalState.token}`;

  const fetchUserDataCall = yield call(request, requestURL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth,
    },
  });

  if(!fetchUserDataCall.err || !(fetchUserDataCall.err === 'SyntaxError: Unexpected end of JSON input')) {
  	let primaryScheduleID = '';

  	fetchUserDataCall.data.jadwals.map((value, key) => {
  		if(value.utama) {
  			primaryScheduleID = value.id;
  		}
  	});

  	const requestURLPrimarySched = `https://private-anon-7cc79298a3-sunjad.apiary-mock.com/sunjad/api/jadwals/${primaryScheduleID}`;

  	const fetchPrimaryScheduleCall = yield call(request, requestURLPrimarySched, {
	    method: 'GET',
	    headers: {
	      Accept: 'application/json',
	      'Content-Type': 'application/json',
	    },
	  });

  	if(!fetchPrimaryScheduleCall.err || !(fetchPrimaryScheduleCall.err === 'SyntaxError: Unexpected end of JSON input')) {
  		yield put(fetchDone(fetchPrimaryScheduleCall.data.jadwals, fetchUserDataCall.data.jadwals));
      yield put(loadingDone());
  	} else {
  		console.log(fetchPrimaryScheduleCall.err);
      yield put(loadingDone());
  	}
  } else {
    console.log(saveJadwalPostCall.err);
    yield put(loadingDone());
  }
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* fetchUserDataSaga() {
  yield takeLatest(FETCH, fetchUserData);
}

/**
 * Github repos request/response handler
 */
export function* changePrimary(action) {
  yield put(loading());
	const globalState = yield select(selectGlobal());
  const requestURL = `https://private-anon-7cc79298a3-sunjad.apiary-mock.com/sunjad/api/users/${globalState.user_id}/jadwals/${action.id}/set-utama`;
  const auth = `Bearer ${globalState.token}`;

  const changePrimaryCall = yield call(request, requestURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth,
    },
  });

  if(!changePrimaryCall.err || !(changePrimaryCall.err === 'SyntaxError: Unexpected end of JSON input')) {
  	const requestURLPrimarySched = `https://private-anon-7cc79298a3-sunjad.apiary-mock.com/sunjad/api/jadwals/${action.id}`;

  	const fetchPrimaryScheduleCall = yield call(request, requestURLPrimarySched, {
	    method: 'GET',
	    headers: {
	      Accept: 'application/json',
	      'Content-Type': 'application/json',
	    },
	  });

  	if(!fetchPrimaryScheduleCall.err || !(fetchPrimaryScheduleCall.err === 'SyntaxError: Unexpected end of JSON input')) {
  		yield put(fetchPrimarySchedule(fetchPrimaryScheduleCall.data.jadwals));
      yield put(loadingDone());
  	} else {
  		console.log(fetchPrimaryScheduleCall.err);
      yield put(loadingDone());
  	}
  } else {
    console.log(changePrimaryCall.err);
    yield put(loadingDone());
  }
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* changePrimarySaga() {
  yield takeLatest(SET_JADWAL_UTAMA, changePrimary);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* jadwalSaga() {
  // Fork watcher so we can continue execution
  const fetchUserDataWatcher = yield fork(fetchUserDataSaga);
  const changePrimaryWatcher = yield fork(changePrimarySaga);
}

// Bootstrap sagas
export default [
 jadwalSaga,
];
