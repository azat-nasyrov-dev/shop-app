import React from 'react';
import {Route, Switch} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import Container from '@material-ui/core/Container';
import Products from './containers/Products/Products';

const App = () => (
  <>
    <CssBaseline/>
    <header>
      <AppToolbar/>
    </header>
    <main>
      <Container maxWidth="xl">
        <Switch>
          <Route path="/" exact component={Products}/>
        </Switch>
      </Container>
    </main>
  </>
);

export default App;
