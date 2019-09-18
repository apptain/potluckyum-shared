import { all } from 'redux-saga/effects';

import authSagas from './authSagas';
import eventSagas from './eventSagas';
import invitationSagas from './invitationSagas';

export default function* rootSaga() {

  yield all([
    ...authSagas,
    ...eventSagas,
    ...invitationSagas
  ]);
}
