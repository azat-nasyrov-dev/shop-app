import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {MuiThemeProvider} from '@material-ui/core';
import {SnackbarProvider} from 'notistack';
import history from './history';
import store from './store/ConfigureStore';
import theme from './theme';

import App from './App';
import './index.css';

const app = (
  <Provider store={store}>
    <Router history={history}>
      <SnackbarProvider>
        <MuiThemeProvider theme={theme}>
          <App/>
        </MuiThemeProvider>
      </SnackbarProvider>
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
