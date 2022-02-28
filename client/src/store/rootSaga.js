import {all} from 'redux-saga/effects';
import categoriesSagas from './sagas/categoriesSagas';

export default function* rootSaga() {
  yield all([
    ...categoriesSagas,
  ])
}