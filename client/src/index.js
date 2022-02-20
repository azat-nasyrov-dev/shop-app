import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {Router} from 'react-router-dom';
import {NotificationContainer} from 'react-notifications';
import history from './history';

import App from './App';
import productsReducer from './store/reducers/productsReducer';
import categoriesReducer from './store/reducers/categoriesReducer';
import usersSlice from './store/slices/usersSlice';

import 'react-notifications/lib/notifications.css';
import {createTheme, MuiThemeProvider} from '@material-ui/core';

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  users: usersSlice.reducer,
});

const composeEnhancers = window.__REDUX_DEVTOOL_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

const theme = createTheme({
  props: {
    MuiTextField: {
      variant: 'outlined',
      fullWidth: true,
    }
  }
});

const app = (
  <Provider store={store}>
    <Router history={history}>
      <MuiThemeProvider theme={theme}>
        <NotificationContainer/>
        <App/>
      </MuiThemeProvider>
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
