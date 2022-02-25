import React from 'react';
import {useSelector} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';
import Layout from './components/UI/Layout/Layout';
import Products from './containers/Products/Products';
import NewProduct from './containers/NewProduct/NewProduct';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
  return isAllowed ?
    <Route {...props}/> :
    <Redirect to={redirectTo}/>;
};

const App = () => {
  const user = useSelector(state => state.users.user);

  return (
    <>
      <Layout>
        <Switch>
          <Route path="/" exact component={Products}/>
          <Route path="/category/:id" component={Products}/>
          <ProtectedRoute
            path="/products/new"
            component={NewProduct}
            isAllowed={user && user.role === 'admin'}
            redirectTo="/login"
          />
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
        </Switch>
      </Layout>
    </>
  );
};

export default App;
