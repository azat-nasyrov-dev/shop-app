import {FETCH_PRODUCTS_SUCCESS} from '../actions/productsActions';

const initialState = {
  products: []
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {...state, products: action.products};
    default:
      return state;
  }
};

export default productsReducer;