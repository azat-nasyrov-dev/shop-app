import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS
} from '../actions/productsActions';

const initialState = {
  products: [],
  productsLoading: false,
  createProductLoading: false,
  createProductError: null,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {...state, productsLoading: true};
    case FETCH_PRODUCTS_SUCCESS:
      return {...state, productsLoading: false, products: action.products};
    case FETCH_PRODUCTS_FAILURE:
      return {...state, productsLoading: false};
    case CREATE_PRODUCT_REQUEST:
      return {...state, createProductLoading: true};
    case CREATE_PRODUCT_SUCCESS:
      return {...state, createProductLoading: false};
    case CREATE_PRODUCT_FAILURE:
      return {...state, createProductLoading: false, createProductError: action.error};
    default:
      return state;
  }
};

export default productsReducer;