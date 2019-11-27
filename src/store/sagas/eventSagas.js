import { takeLatest, put, call, fork, take } from 'redux-saga/effects';
import {eventCreate} from '../apiCalls';

import { EVENT_GET,
  EVENT_GET_SUCCESS,
  EVENT_GET_FAIL,
  EVENT_CREATE,
  EVENT_CREATE_SUCCESS,
  EVENT_CREATE_FAIL,
  INVITATION_SEND_REQUEST,
  INVITATION_SEND_SUCCESS,
  INVITATION_SEND_FAIL
 } from '../events';

function* eventCreateRequest(event) {
  debugger;
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

function* invitationSendRequest(eventId, invitation) {
  debugger;
  const {response, error} = yield call(eventId, invitation);
  if(response) {
    yield put({ type: INVITATION_SEND_SUCCESS, response })
  } else {
    yield put({ type: INVITATION_SEND_FAIL, error})
  }
}

function* watchInvitationSendRequest() {
  while (true) {
    const { eventId, invitation } = yield take(INVITATION_SEND_REQUEST);
    yield fork(invitationSendRequest, eventId, invitation);
  }
}

export default [
  watchEventCreateRequest(),
  watchInvitationSendRequest()
];
