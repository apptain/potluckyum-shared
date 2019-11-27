import { all } from 'redux-saga/effects';

import authSagas from './authSagas';
import eventSagas from './eventSagas';

export default function* rootSaga() {

  yield all([
    ...authSagas,
    ...eventSagas
  ]);
}
