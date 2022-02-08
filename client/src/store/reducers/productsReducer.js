import {FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS} from '../actions/productsActions';

const initialState = {
  products: [],
  productsLoading: false,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {...state, productsLoading: true};
    case FETCH_PRODUCTS_SUCCESS:
      return {...state, productsLoading: false, products: action.products};
    case FETCH_PRODUCTS_FAILURE:
      return {...state, productsLoading: false};
    default:
      return state;
  }
};

export default productsReducer;