import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ProductForm from '../../components/ProductForm/ProductForm';

const NewProduct = () => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item xs>
        <Typography variant="h4">New product</Typography>
      </Grid>
      <Grid item xs>
        <ProductForm/>
      </Grid>
    </Grid>
  );
};

export default NewProduct;