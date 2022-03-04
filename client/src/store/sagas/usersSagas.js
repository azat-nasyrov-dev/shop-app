import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from '../../axiosApi';
import {
  facebookLoginRequest, googleLoginRequest,
  loginFailure, loginRequest,
  loginSuccess, logoutRequest,
  logoutSuccess,
  registerFailure,
  registerRequest,
  registerSuccess
} from '../actions/usersActions';
import {historyPush} from '../actions/historyActions';
import {NotificationManager} from 'react-notifications';

export function* registerUser({payload: userData}) {
  try {
    const data = new FormData();
    Object.keys(userData).forEach(key => {
      data.append(key, userData[key]);
    });

    const response = yield axiosApi.post('/users', data);
    yield put(registerSuccess(response.data));
    yield put(historyPush('/'));
  } catch (error) {
    yield put(registerFailure(error.response.data));
  }
}

export function* loginUser({payload: userData}) {
  try {
    const response = yield axiosApi.post('/users/sessions', userData);
    yield put(loginSuccess(response.data.user));
    yield put(historyPush('/'));
    NotificationManager.success('Login successful');
  } catch (error) {
    yield put(loginFailure(error.response.data));
  }
}

export function* facebookLogin({payload: data}) {
  try {
    const response = yield axiosApi.post('/users/facebookLogin', data);
    yield put(loginSuccess(response.data.user));
    yield put(historyPush('/'));
    NotificationManager.success('Login successful');
  } catch (error) {
    yield put(loginFailure(error.response.data));
  }
}

export function* googleLogin({payload: {tokenId, googleId}}) {
  try {
    const body = {tokenId, googleId};
    const response = yield axiosApi.post('/users/googleLogin', body);
    yield put(loginSuccess(response.data.user));
    yield put(historyPush('/'));
    NotificationManager.success('Login successful');
  } catch (error) {
    yield put(loginFailure(error.response.data));
  }
}

export function* logout() {
  try {
    yield axiosApi.delete('/users/sessions');
    yield put(logoutSuccess());
    yield put(historyPush('/'));
    NotificationManager.success('Logged out!');
  } catch (e) {
    NotificationManager.error('Could not logout');
  }
}

const usersSagas = [
  takeEvery(registerRequest, registerUser),
  takeEvery(loginRequest, loginUser),
  takeEvery(facebookLoginRequest, facebookLogin),
  takeEvery(googleLoginRequest, googleLogin),
  takeEvery(logoutRequest, logout),
];

export default usersSagas;