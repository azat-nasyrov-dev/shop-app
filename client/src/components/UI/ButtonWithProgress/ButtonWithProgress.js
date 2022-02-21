import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  wrapper: {
    position: 'relative'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-10px',
    marginLeft: '-10px',
  }
});

const ButtonWithProgress = ({children, loading, ...props}) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.wrapper}
      {...props}
    >
      {children}
      {loading && <CircularProgress size={20} className={classes.buttonProgress} color="inherit"/>}
    </Button>
  );
};

export default ButtonWithProgress;