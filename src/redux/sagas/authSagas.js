import { takeLatest, put, call, fork, take } from 'redux-saga/effects';
import {loginApiCall} from '../apiCalls';

import { LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL } from '../modules/auth';

function* loginRequest(userName, password) {
  const {response, error} = yield call(loginApiCall, userName, password);
  if(response) {
    const userAccount = response;
    yield put({ type: LOGIN_SUCCESS, userAccount})
  } else {
    yield put({ type: LOGIN_FAIL, error})
  }
}

function* watchLoginRequest() {
  while (true) {
    const { userName, password } = yield take(LOGIN);
    yield fork(loginRequest, userName, password);
  }
}

export default [
  watchLoginRequest(),
];
