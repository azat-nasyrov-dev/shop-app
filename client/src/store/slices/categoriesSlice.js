import {createSlice} from '@reduxjs/toolkit';

const name = 'categories';

const categoriesSlice = createSlice({
  name,
  initialState: {
    categories: [],
    fetchLoading: false,
  },
  reducers: {
    fetchCategoriesRequest: (state, action) => {
      state.fetchLoading = true;
    },
    fetchCategoriesSuccess: (state, {payload: categories}) => {
      state.fetchLoading = false;
      state.categories = categories;
    },
    fetchCategoriesFailure: (state, action) => {
      state.fetchLoading = false;
    }
  }
});

export default categoriesSlice;