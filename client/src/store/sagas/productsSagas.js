import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from '../../axiosApi';
import {NotificationManager} from 'react-notifications';
import {
  createProductFailure, createProductRequest,
  createProductSuccess,
  fetchProductsFailure, fetchProductsRequest,
  fetchProductsSuccess
} from '../actions/productsActions';
import {historyPush} from '../actions/historyActions';

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
    NotificationManager.error('Could not fetch products');
  }
}

export function* createProduct({payload: productData}) {
  try {
    yield axiosApi.post('/products', productData);
    yield put(createProductSuccess());
    yield put(historyPush('/'));
    NotificationManager.success('Product created successfully');
  } catch (e) {
    yield put(createProductFailure(e.response.data));
    NotificationManager.error('Could not create product');
  }
}

const productsSagas = [
  takeEvery(fetchProductsRequest, fetchProducts),
  takeEvery(createProductRequest, createProduct),
];

export default productsSagas;