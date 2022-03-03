import usersSlice from '../slices/usersSlice';

export const {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  facebookLoginRequest,
  googleLoginRequest,
  logoutRequest,
} = usersSlice.actions;

