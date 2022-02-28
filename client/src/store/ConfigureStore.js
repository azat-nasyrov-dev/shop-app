import {combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {loadFromLocalStorage, saveToLocalStorage} from './localStorage';
import productsReducer from './reducers/productsReducer';
import usersReducer, {initialState} from './reducers/usersReducer';
import axiosApi from '../axiosApi';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import {configureStore} from '@reduxjs/toolkit';
import categoriesSlice from './slices/categoriesSlice';

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesSlice.reducer,
  users: usersReducer,
});

const persistedState = loadFromLocalStorage();

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  sagaMiddleware,
  thunkMiddleware,
];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: true,
  preloadedState: persistedState,
});

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  saveToLocalStorage({
    users: {
      ...initialState,
      user: store.getState().users.user,
    }
  });
});

axiosApi.interceptors.request.use(config => {
  try {
    config.headers['Authorization'] = store.getState().users.user.token;
  } catch (e) {
    // do nothing, no token exists
  }

  return config;
});

axiosApi.interceptors.response.use(res => res, e => {
  if (!e.response) {
    e.response = {data: {global: 'No internet'}};
  }

  throw e;
});

export default store;