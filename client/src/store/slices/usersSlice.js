import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

export const registerUser = createAsyncThunk('users/registerUser',
  async (userData) => {
    const response = await axiosApi.post('/users', userData);
    return response.data;
  });

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,
    registerLoading: false,
    registerError: null
  },
  extraReducers: {
    [registerUser.pending]: state => {
      state.registerLoading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.registerLoading = false;
    },
    [registerUser.rejected]: (state, action) => {
      state.registerLoading = false;
      state.registerError = action.payload;
    }
  }
});

export default usersSlice;