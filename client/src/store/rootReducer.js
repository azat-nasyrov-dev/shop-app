import {combineReducers} from 'redux';
import productsSlice from './slices/productsSlice';
import categoriesSlice from "./slices/categoriesSlice";
import usersSlice from './slices/usersSlice';
import notifierSlice from './slices/notifierSlice';

const rootReducer = combineReducers({
  products: productsSlice.reducer,
  categories: categoriesSlice.reducer,
  users: usersSlice.reducer,
  notifier: notifierSlice.reducer,
});

export default rootReducer;