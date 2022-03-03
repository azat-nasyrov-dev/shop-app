import productsSlice from '../slices/productsSlice';

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  createProductRequest,
  createProductSuccess,
  createProductFailure
} = productsSlice.actions;

