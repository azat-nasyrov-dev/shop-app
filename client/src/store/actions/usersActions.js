import axios from '../../axiosApi';
import {historyPush} from './historyActions';
import {NotificationManager} from 'react-notifications';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

const registerUserRequest = () => ({type: REGISTER_USER_REQUEST});
const registerUserSuccess = user => ({type: REGISTER_USER_SUCCESS, user});
const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, error});

const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const logoutUser = () => ({type: LOGOUT_USER});

export const registerUser = userData => {
  return async dispatch => {
    try {
      dispatch(registerUserRequest());
      const response = await axios.post('/users', userData);
      dispatch(registerUserSuccess(response.data));
      dispatch(historyPush('/'));
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(registerUserFailure(error.response.data));
      } else {
        dispatch(registerUserFailure({global: 'No internet'}));
      }
    }
  }
};

export const loginUser = userData => {
  return async dispatch => {
    try {
      dispatch(loginUserRequest());
      const response = await axios.post('/users/sessions', userData);
      dispatch(loginUserSuccess(response.data.user));
      dispatch(historyPush('/'));
      NotificationManager.success('Login successful');
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(loginUserFailure(error.response.data));
      } else {
        dispatch(loginUserFailure({global: 'No internet'}));
      }
    }
  }
};