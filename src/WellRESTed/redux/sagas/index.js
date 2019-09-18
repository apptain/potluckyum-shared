import { all } from 'redux-saga/effects';
import * as domainSagas from '../domainSagas';

export default function* rootSaga() {
  yield all([
    ...domainSagas
  ]);
}
