import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import {NotificationContainer} from 'react-notifications';

import App from './App';
import productsReducer from './store/reducers/productsReducer';
import categoriesReducer from './store/reducers/categoriesReducer';

import 'react-notifications/lib/notifications.css';
import {createTheme, MuiThemeProvider} from '@material-ui/core';

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
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
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <NotificationContainer/>
        <App/>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
