import {all} from 'redux-saga/effects';
import history from '../history';
import categoriesSagas from './sagas/categoriesSagas';
import historySagas from './sagas/historySagas';
import productsSagas from './sagas/productsSagas';
import usersSagas from './sagas/usersSagas';

export default function* rootSaga() {
  yield all([
    ...categoriesSagas,
    ...historySagas(history),
    ...productsSagas,
    ...usersSagas,
  ])
};