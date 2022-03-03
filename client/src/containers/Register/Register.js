import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import {registerRequest} from '../../store/actions/usersActions';
import FormElement from '../../components/UI/Form/FormElement';
import ButtonWithProgress from '../../components/UI/ButtonWithProgress/ButtonWithProgress';
import {Helmet} from 'react-helmet';

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

const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: '',
    password: '',
    displayName: '',
  });

  const error = useSelector(state => state.users.registerError);
  const loading = useSelector(state => state.users.registerLoading);

  const inputChangeHandler = e => {
    const {name, value} = e.target;

    setUser(prev => ({...prev, [name]: value}));
  };

  const submitFormHandler = e => {
    e.preventDefault();

    dispatch(registerRequest({...user}));
  };

  const getFieldError = fieldName => {
    try {
      return error.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };

  return (
    <Container component="section" maxWidth="xs">
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.header}>
          Sign up
        </Typography>
        <Grid container spacing={1} direction="column" component="form" onSubmit={submitFormHandler} noValidate>
          <FormElement
            required
            label="Email"
            type="email"
            onChange={inputChangeHandler}
            name="email"
            value={user.email}
            autoComplete="new-email"
            error={getFieldError('email')}
          />
          <FormElement
            required
            label="Password"
            type="password"
            onChange={inputChangeHandler}
            name="password"
            value={user.password}
            autoComplete="new-password"
            error={getFieldError('password')}
          />
          <FormElement
            required
            label="Display Name"
            type="text"
            onChange={inputChangeHandler}
            name="displayName"
            value={user.displayName}
            error={getFieldError('displayName')}
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
              Sign up
            </ButtonWithProgress>
          </Grid>
          <Grid item container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} variant="body2" to="/login">
                Already have an account? Sing in
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Register;