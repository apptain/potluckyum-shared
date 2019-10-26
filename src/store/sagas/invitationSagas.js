import { takeLatest, put, call, fork, take } from 'redux-saga/effects';
import {invitationCreateApiCall} from '../apiCalls';

import { INVITATION_GET,
  INVITATION_GET_SUCCESS,
  INVITATION_GET_FAIL,
  INVITATION_CREATE,
  INVITATION_CREATE_SUCCESS,
  INVITATION_CREATE_FAIL } from '../invitations';

function* invitationCreateRequest(apiCall, invitation, token) {

  const {response, error} = yield call(invitationCreateApiCall, invitation, token);
  if(response) {
      const invitation = response;
      put({
        type: 'RNS_SHOW_NOTIFICATION',
        opts: {},
        uid: Date.now(),
        level: 'error'
      });
    yield put({ type: INVITATION_CREATE_SUCCESS, invitation})
  } else {
    yield put({ type: INVITATION_CREATE_FAIL, error})
  }
}

function* watchInvitationCreateRequest() {
  while (true) {
    const { invitation, token } = yield take(INVITATION_CREATE);
    yield fork(invitationCreateRequest, invitationCreateApiCall, invitation, token);
  }
}

export default [
  //watchInvitationCreateRequest(),
];
