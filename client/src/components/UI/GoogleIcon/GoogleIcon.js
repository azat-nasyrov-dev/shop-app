import React from 'react';
import Icon from '@material-ui/core/Icon';
import googleImage from '../../../assets/images/google.svg';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    verticalAlign: 'top',
  }
});

const GoogleIcon = props => {
  const classes = useStyles();

  return (
    <Icon {...props}>
      <img src={googleImage} alt="google logo" className={classes.root}/>
    </Icon>
  );
};

export default GoogleIcon;