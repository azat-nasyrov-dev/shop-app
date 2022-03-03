import {createSlice} from '@reduxjs/toolkit';

const name = 'products';

const productsSlice = createSlice({
  name,
  initialState: {
    products: [],
    productsLoading: false,
    createProductLoading: false,
    createProductError: null,
  },
  reducers: {
    fetchProductsRequest: state => {
      state.productsLoading = true;
    },
    fetchProductsSuccess: (state, {payload: products}) => {
      state.productsLoading = false;
      state.products = products;
    },
    fetchProductsFailure: state => {
      state.productsLoading = false;
    },
    createProductRequest: state => {
      state.createProductLoading = true;
    },
    createProductSuccess: state => {
      state.createProductLoading = false;
    },
    createProductFailure: (state, {payload: error}) => {
      state.createProductLoading = false;
      state.createProductError = error;
    }
  }
});

export default productsSlice;