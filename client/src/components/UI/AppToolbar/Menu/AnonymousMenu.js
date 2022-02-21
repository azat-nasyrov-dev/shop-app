import React from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

const AnonymousMenu = () => {
  return (
    <>
      <Button component={Link} to="/register" color="inherit">Sign up</Button>
      <Button component={Link} to="/login" color="inherit">Sign in</Button>
    </>
  );
};

export default AnonymousMenu;