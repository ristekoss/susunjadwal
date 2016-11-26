import { takeLatest } from 'redux-saga';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { take, call, select, cancel, fork, put } from 'redux-saga/effects';
import { FETCH } from './constants';
import { isEmpty, isEqual } from 'lodash';
import { fetchDone } from './actions';
import request from 'utils/request';
import { loading, loadingDone } from 'containers/App/actions';

export function* fetchScheduleData(action) {
  yield put(loading());
	let requestURL = `https://private-anon-7cc79298a3-sunjad.apiary-mock.com/sunjad/api/jadwals/${action.slug}`;

  let jobId = action.slug.split(',');
  const lastItemOfJobId = jobId.pop();

  if(lastItemOfJobId !== '') {
    jobId.push(lastItemOfJobId);
  }

  console.log(jobId);

  if(jobId.length > 1) {
    console.log('jobsBanyak');
    requestURL = 'https://private-anon-7cc79298a3-sunjad.apiary-mock.com/sunjad/api/jadwals/join';
    
    const fetchScheduleDataCall = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: {
        jadwal_ids: jobId,
      }
    });

    if(!fetchScheduleDataCall.err || !(fetchScheduleDataCall.err === 'SyntaxError: Unexpected end of JSON input')) {
      yield put(fetchDone(fetchScheduleDataCall.data.jadwals));
      yield put(loadingDone());
    } else {
      console.log(fetchScheduleDataCall.err);
      yield put(loadingDone());
    }
  } else {
    console.log('jobDikit');
  	const fetchScheduleDataCall = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if(!fetchScheduleDataCall.err || !(fetchScheduleDataCall.err === 'SyntaxError: Unexpected end of JSON input')) {
      yield put(fetchDone(fetchScheduleDataCall.data.jadwals));
      yield put(loadingDone());
    } else {
      console.log(fetchScheduleDataCall.err);
      yield put(loadingDone());
    }
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
