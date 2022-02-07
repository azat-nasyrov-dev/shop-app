import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Products = () => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container direction="row" justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Products</Typography>
        </Grid>
        <Grid item>
          <Button color="primary" component={Link} to="/products/new">Add product</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Products;