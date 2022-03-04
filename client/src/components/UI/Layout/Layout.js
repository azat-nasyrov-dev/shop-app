import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppToolbar from '../AppToolbar/AppToolbar';
import Container from '@material-ui/core/Container';
import Notifier from '../../../containers/Notifier/Notifier';

const Layout = ({children}) => {
  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl">
          {children}
        </Container>
      </main>
      <Notifier/>
    </>
  );
};

export default Layout;