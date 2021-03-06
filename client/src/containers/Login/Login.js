import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormElement from '../../components/UI/Form/FormElement';
import Link from '@material-ui/core/Link';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {loginRequest} from '../../store/actions/usersActions';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import ButtonWithProgress from '../../components/UI/ButtonWithProgress/ButtonWithProgress';
import FacebookLogin from '../../components/UI/FacebookLogin/FacebookLogin';
import {Helmet} from 'react-helmet';
import GoogleLogin from '../../components/UI/GoogleLogin/GoogleLogin';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    marginBottom: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  header: {
    marginBottom: theme.spacing(2)
  }
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: '', password: ''
  });
  const error = useSelector(state => state.users.loginError);
  const loading = useSelector(state => state.users.loginLoading);

  const inputChangeHandler = e => {
    const {name, value} = e.target;

    setUser(prev => ({...prev, [name]: value}));
  };

  const submitFormHandler = e => {
    e.preventDefault();

    dispatch(loginRequest({...user}));
  };

  return (
    <Container component="section" maxWidth="xs">
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.header}>
          Sign in
        </Typography>
        <Grid container spacing={1} direction="column" component="form" onSubmit={submitFormHandler}>
          {error && (
            <Grid item xs>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error.message || error.global}
              </Alert>
            </Grid>
          )}
          <FormElement
            label="Email"
            type="email"
            autoComplete="current-email"
            onChange={inputChangeHandler}
            name="email"
            value={user.email}
          />
          <FormElement
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={inputChangeHandler}
            name="password"
            value={user.password}
          />
          <Grid item xs>
            <ButtonWithProgress
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              loading={loading}
              disabled={loading}
            >
              Sign in
            </ButtonWithProgress>
          </Grid>
          <Grid item xs>
            <FacebookLogin/>
          </Grid>
          <Grid item xs>
            <GoogleLogin/>
          </Grid>
          <Grid item container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} variant="body2" to="/register">
                Or sign up
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Login;