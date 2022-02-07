import axiosApi from '../../axiosApi';

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';

export const fetchProductsSuccess = products => ({type: FETCH_PRODUCTS_SUCCESS, products});

export const fetchProducts = () => {
  return async dispatch => {
    const response = await axiosApi.get('/products');
    dispatch(fetchProductsSuccess(response.data));
  }
};