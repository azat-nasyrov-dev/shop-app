import {takeEvery, put} from 'redux-saga/effects';
import {FETCH_CATEGORIES_REQUEST, fetchCategoriesFailure, fetchCategoriesSuccess} from '../actions/categoriesActions';
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
  takeEvery(FETCH_CATEGORIES_REQUEST, fetchCategories)
];

export default categoriesSagas;