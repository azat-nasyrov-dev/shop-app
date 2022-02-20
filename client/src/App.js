import React from 'react';
import {Route, Switch} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import Container from '@material-ui/core/Container';
import Products from './containers/Products/Products';
import NewProduct from './containers/NewProduct/NewProduct';
import Register from './containers/Register/Register';

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
          <Route path="/products/new" component={NewProduct}/>
          <Route path="/register" component={Register}/>
        </Switch>
      </Container>
    </main>
  </>
);

export default App;
