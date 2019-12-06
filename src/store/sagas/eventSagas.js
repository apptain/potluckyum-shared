import { takeLatest, put, call, fork, take } from 'redux-saga/effects';
import {eventCreate, eventsList} from '../apiCalls';

import { EVENT_GET_REQUEST,
  EVENT_GET_SUCCESS,
  EVENT_GET_FAIL,
  EVENTS_GET_REQUEST,
  EVENTS_GET_SUCCESS,
  EVENTS_GET_FAIL,
  EVENT_CREATE,
  EVENT_CREATE_SUCCESS,
  EVENT_CREATE_FAIL,
  INVITATION_SEND_REQUEST,
  INVITATION_SEND_SUCCESS,
  INVITATION_SEND_FAIL
 } from '../events';

function* eventsGetRequest(event) {
  const response = yield call(eventsList);
  console.log(response);
  debugger;
  if(response) {
    yield put({ type: EVENTS_GET_SUCCESS, events: response })
  } else {
    yield put({ type: EVENTS_GET_FAIL, error})
  }
}

function* watchEventsGetRequest() {
  while (true) {
    yield take(EVENTS_GET_REQUEST);

    yield fork(eventsGetRequest);
  }
}

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

function* invitationSendRequest(eventId, invitation) {
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
  watchEventsGetRequest(),
  watchEventCreateRequest(),
  watchInvitationSendRequest()
];
