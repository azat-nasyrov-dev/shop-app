import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {Router} from 'react-router-dom';
import {createTheme, MuiThemeProvider} from '@material-ui/core';
import {NotificationContainer} from 'react-notifications';
import history from './history';

import App from './App';
import productsReducer from './store/reducers/productsReducer';
import categoriesReducer from './store/reducers/categoriesReducer';
import usersReducer from './store/reducers/usersReducer';

import 'react-notifications/lib/notifications.css';

const saveToLocalStorage = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('shopState', serializedState);
  } catch (e) {
    console.log('Could not save state');
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('shopState');
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

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
    users: store.getState().users
  });
})

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
