import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {historyPush} from '../actions/historyActions';
import {NotificationManager} from 'react-notifications';

export const registerUser = createAsyncThunk('users/registerUser',
  async (userData, thunkAPI) => {
    const response = await axiosApi.post('/users', userData);
    thunkAPI.dispatch(historyPush('/'));
    NotificationManager.success('Logged in');
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
      console.log(action.response);
      state.registerError = action.payload;
    }
  }
});

export default usersSlice;