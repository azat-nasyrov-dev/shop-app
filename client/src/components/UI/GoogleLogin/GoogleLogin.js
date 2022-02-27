import React from 'react';
import {useDispatch} from 'react-redux';
import {googleClientId} from '../../../config';
import Button from '@material-ui/core/Button';
import GoogleIcon from '../GoogleIcon/GoogleIcon';
import GoogleLoginButton from 'react-google-login';
import {googleLogin} from '../../../store/actions/usersActions';

const GoogleLogin = () => {
  const dispatch = useDispatch();

  const handleLogin = response => {
    console.log(response);
    dispatch(googleLogin(response));
  };

  return (
    <GoogleLoginButton
      clientId={googleClientId}
      render={props => (
        <Button
          fullWidth
          color="primary"
          variant="outlined"
          startIcon={<GoogleIcon/>}
          onClick={props.onClick}
        >
          Login with Google
        </Button>
      )}
      onSuccess={handleLogin}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLogin;