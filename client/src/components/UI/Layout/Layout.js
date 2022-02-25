import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppToolbar from '../AppToolbar/AppToolbar';
import Container from '@material-ui/core/Container';

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
    </>
  );
};

export default Layout;