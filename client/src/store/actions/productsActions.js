import axiosApi from '../../axiosApi';
import {NotificationManager} from 'react-notifications';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';

export const fetchProductsRequest = () => ({type: FETCH_PRODUCTS_REQUEST});
export const fetchProductsSuccess = products => ({type: FETCH_PRODUCTS_SUCCESS, products});
export const fetchProductsFailure = () => ({type: FETCH_PRODUCTS_FAILURE});

export const createProductSuccess = () => ({type: CREATE_PRODUCT_SUCCESS});

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
    await axiosApi.post('/products', productData);
    dispatch(createProductSuccess());
  };
};