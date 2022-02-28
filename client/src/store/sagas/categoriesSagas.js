import {put, takeEvery} from 'redux-saga/effects';
import {fetchCategoriesRequest, fetchCategoriesFailure, fetchCategoriesSuccess} from '../actions/categoriesActions';
import axiosApi from '../../axiosApi';
import {NotificationManager} from 'react-notifications';

export function* fetchCategories() {
  try {
    const response = yield axiosApi.get('/categories');
    yield put(fetchCategoriesSuccess(response.data));
  } catch (e) {
    NotificationManager.error('Failed to fetch categories');
    yield put(fetchCategoriesFailure());
  }
}

const categoriesSagas = [
  takeEvery(fetchCategoriesRequest, fetchCategories)
];

export default categoriesSagas;