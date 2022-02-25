import axiosApi from '../../axiosApi';
import {NotificationManager} from 'react-notifications';
import {historyPush} from './historyActions';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';

export const fetchProductsRequest = () => ({type: FETCH_PRODUCTS_REQUEST});
export const fetchProductsSuccess = products => ({type: FETCH_PRODUCTS_SUCCESS, products});
export const fetchProductsFailure = () => ({type: FETCH_PRODUCTS_FAILURE});

export const createProductRequest = () => ({type: CREATE_PRODUCT_REQUEST});
export const createProductSuccess = () => ({type: CREATE_PRODUCT_SUCCESS});
export const createProductFailure = error => ({type: CREATE_PRODUCT_FAILURE, error});

export const fetchProducts = () => {
  return async dispatch => {
    try {
      dispatch(fetchProductsRequest());
      const response = await axiosApi.get('/products');
      dispatch(fetchProductsSuccess(response.data));
    } catch (e) {
      dispatch(fetchProductsFailure());
      NotificationManager.error('Could not fetch products');
    }
  }
};

export const createProduct = productData => {
  return async dispatch => {
    try {
      dispatch(createProductRequest());
      await axiosApi.post('/products', productData);
      dispatch(createProductSuccess());
      dispatch(historyPush('/'));
      NotificationManager.success('Product created successfully');
    } catch (e) {
      dispatch(createProductFailure(e.response.data));
      NotificationManager.error('Could not create product');
    }
  };
};