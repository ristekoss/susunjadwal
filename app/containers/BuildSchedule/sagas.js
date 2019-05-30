import { takeLatest } from 'redux-saga';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { take, call, select, cancel, fork, put } from 'redux-saga/effects';
//import request from 'utils/request';
import { ADD_SELECTED_CLASS, REMOVE_SELECTED_CLASS, SAVE_JADWAL, FETCH_JADWAL } from './constants';
import { isEmpty, isEqual } from 'lodash';
import selectBuildSchedule from './selectors';
import selectGlobal from 'containers/App/selectors';
import { conflict, fetchJadwalSuccess } from './actions';
import request from 'utils/request';
import { loading, loadingDone } from 'containers/App/actions';

/**
 * Github repos request/response handler
 */
export function* asyncCheckConflict() {
  const localState = yield select(selectBuildSchedule());

  let combinedSchedules = [];
  if(!isEmpty(localState.picked)) {
    for(let [key, value] of Object.entries(localState.picked)) {
      value.schedule.map((item, index) => { combinedSchedules.push(item); });
    }
  }
  
  const conflictItem = checkConflict(combinedSchedules);
  yield put(conflict(conflictItem));
}

function checkConflict(data) {
	var flag = [];
	for(var i = 0; i < 2000; i++) flag[i] = -1;
	var conflictIdx = new Set();
	for(var i = 0; i < data.length; i++) {
		var matkul = data[i];
		var startTime = convertToMinute(data[i].start, data[i].day.toLowerCase());
		var endTime = convertToMinute(data[i].end, data[i].day.toLowerCase());
		console.log(startTime);
		for(var j = startTime; j <= endTime; j++) {
			if(flag[j] >= 0) {
				conflictIdx.add(data[i]);
				conflictIdx.add(data[flag[j]]);
			}
			flag[j] = i;
		}
	}
	var res = [];
	conflictIdx.forEach(function(value) {
		res.push(value);
	});
	return res;
}

function convertToMinute(val, day) {
	var days = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
	for (var i = 0; i < 6; i++) {
		if (day === days[i]) day = i;
	}

	var temp = val.split(".");
	var hour = parseInt(temp[0]);
	var minute = parseInt(temp[1]);
	return day * 3600 + hour * 60 + minute;
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* asyncCheckConflictSaga() {
  yield takeLatest(ADD_SELECTED_CLASS, asyncCheckConflict);
}

export function* asyncCheckConflictOnRemoveSaga() {
  yield takeLatest(REMOVE_SELECTED_CLASS, asyncCheckConflict);
}



/**
 * Github repos request/response handler
 */
export function* saveJadwal() {
  yield put(loading());
  const globalState = yield select(selectGlobal());
  const localState = yield select(selectBuildSchedule());
  const requestURL = `http://api.sunjad.com/susunjadwal/api/users/${globalState.user_id}/jadwals`;
  const auth = `Bearer ${globalState.token}`;

  let stagedJadwals = [];

  if(!isEmpty(localState.picked)) {
    for(let [key, value] of Object.entries(localState.picked)) {
      console.log(value);
      value.schedule.map((item, index) => {
        stagedJadwals.push({ name: value.name, day: item.day, start: item.start, end: item.end, room: item.room });
      });
    }
  }

  const saveJadwalPostCall = yield call(request, requestURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth,
    },
    body: {
      jadwals: stagedJadwals,
    },
  });

  if(!saveJadwalPostCall.err || !(saveJadwalPostCall.err === 'SyntaxError: Unexpected end of JSON input')) {
    yield put(push(`/jadwal/${saveJadwalPostCall.data.jadwal_id}`));
    yield put(loadingDone());
  } else {
    console.log(saveJadwalPostCall.err);
    yield put(loadingDone());
  }
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* saveJadwalSaga() {
  yield takeLatest(SAVE_JADWAL, saveJadwal);
}

/**
 * Github repos request/response handler
 */
export function* fetchJadwal() {
  yield put(loading());
  const globalState = yield select(selectGlobal());
  const localState = yield select(selectBuildSchedule());
  const requestURL = `http://api.sunjad.com/susunjadwal/api/majors/${globalState.major_id}/courses`;
  const auth = `Bearer ${globalState.token}`;
  console.log(auth);
  console.log(requestURL);

  const fetchJadwalPostCall = yield call(request, requestURL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth,
    },
  });

  if(!fetchJadwalPostCall.err || !(fetchJadwalPostCall.err === 'SyntaxError: Unexpected end of JSON input')) {
    yield put(fetchJadwalSuccess(fetchJadwalPostCall.data.courses));
    yield put(loadingDone());
  } else {
    console.log(fetchJadwalPostCall.err);
    yield put(loadingDone());
  }
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* fetchJadwalSaga() {
  yield takeLatest(FETCH_JADWAL, fetchJadwal);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* buildScheduleSaga() {
  // Fork watcher so we can continue execution
  const asyncCheckConflictWatcher = yield fork(asyncCheckConflictSaga);
  const asyncCheckConflictOnRemoveWatcher = yield fork(asyncCheckConflictOnRemoveSaga);
  const saveJadwalWatcher = yield fork(saveJadwalSaga);
  const fetchJadwalWatcher = yield fork(fetchJadwalSaga);
}

// Bootstrap sagas
export default [
 buildScheduleSaga,
];
