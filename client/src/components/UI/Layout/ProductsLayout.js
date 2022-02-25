import React from 'react';
import AppDrawer from './AppDrawer';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  titleLink: {
    textDecoration: 'none'
  }
}));

const ProductsLayout = ({children}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppDrawer/>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  );
};

export default ProductsLayout;