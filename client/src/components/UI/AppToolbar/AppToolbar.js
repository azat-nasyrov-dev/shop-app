import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  mainLink: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit'
    }
  },
  staticToolbar: {
    marginBottom: theme.spacing(2)
  }
}));

const AppToolbar = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="h6">
                <Link to="/" className={classes.mainLink}>Computer parts shop</Link>
              </Typography>
            </Grid>
            <Grid item>
              <Button component={Link} to="/register" color="inherit">Sign up</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.staticToolbar}/>
    </>
  );
};

export default AppToolbar;