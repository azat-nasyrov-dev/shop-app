import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  user: null,
};

const name = 'users';

const usersSlice = createSlice({
  name,
  initialState,
  reducers: {
    registerRequest: state => {
      state.registerLoading = true;
    },
    registerSuccess: (state, {payload: user}) => {
      state.registerLoading = false;
      state.user = user;
    },
    registerFailure: (state, {payload: error}) => {
      state.registerLoading = false;
      state.registerError = error;
    },
    loginRequest: state => {
      state.loginLoading = false;
    },
    loginSuccess: (state, {payload: user}) => {
      state.loginLoading = false;
      state.user = user;
    },
    loginFailure: (state, {payload: error}) => {
      state.loginLoading = false;
      state.loginError = error;
    },
    facebookLoginRequest: state => {
      state.loginLoading = true;
    },
    googleLoginRequest: state => {
      state.loginLoading = true;
    },
    logoutRequest: () => {
    },
    logoutSuccess: state => {
      state.user = null;
    }
  }
});

export default usersSlice;