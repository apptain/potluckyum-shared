import { takeLatest, put, call, fork, take } from 'redux-saga/effects';
import {eventCreate} from '../apiCalls';

import { EVENT_GET,
  EVENT_GET_SUCCESS,
  EVENT_GET_FAIL,
  EVENT_CREATE,
  EVENT_CREATE_SUCCESS,
  EVENT_CREATE_FAIL } from '../modules/events';

function* eventCreateRequest(event) {
  const {response, error} = yield call(eventCreate, event);
  if(response) {

    yield put({ type: EVENT_CREATE_SUCCESS, response })
  } else {
    yield put({ type: EVENT_CREATE_FAIL, error})
  }
}

function* watchEventCreateRequest() {
  while (true) {
    const { event } = yield take(EVENT_CREATE);
    yield fork(eventCreateRequest, event);
  }
}

export default [
  //watchEventCreateRequest(),
];
