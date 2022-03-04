import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from '../../axiosApi';
import {
  createProductFailure,
  createProductRequest,
  createProductSuccess,
  fetchProductsFailure,
  fetchProductsRequest,
  fetchProductsSuccess
} from '../actions/productsActions';
import {historyPush} from '../actions/historyActions';
import {addNotification} from "../actions/notifierActions";

export function* fetchProducts({payload: categoryId}) {
  try {
    let url = '/products';

    if (categoryId) {
      url += '?category=' + categoryId;
    }

    const response = yield axiosApi.get(url);
    yield put(fetchProductsSuccess(response.data));
  } catch (e) {
    yield put(fetchProductsFailure());
    yield put(addNotification({message: 'Fetch products failed', options: {variant: 'error'}}));
  }
}

export function* createProduct({payload: productData}) {
  try {
    yield axiosApi.post('/products', productData);
    yield put(createProductSuccess());
    yield put(historyPush('/'));
    yield put(addNotification({message: 'Product created successfully', options: {variant: 'success'}}));
  } catch (e) {
    yield put(createProductFailure(e.response.data));
    yield put(addNotification({message: 'Create product failed', options: {variant: 'error'}}));
  }
}

const productsSagas = [
  takeEvery(fetchProductsRequest, fetchProducts),
  takeEvery(createProductRequest, createProduct),
];

export default productsSagas;