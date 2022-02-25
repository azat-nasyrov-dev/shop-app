import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {loadFromLocalStorage, saveToLocalStorage} from './localStorage';
import productsReducer from './reducers/productsReducer';
import categoriesReducer from './reducers/categoriesReducer';
import usersReducer, {initialState} from './reducers/usersReducer';
import axiosApi from '../axiosApi';

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  users: usersReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadFromLocalStorage();

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

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