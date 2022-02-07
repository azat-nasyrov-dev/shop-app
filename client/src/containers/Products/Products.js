import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {fetchProducts} from "../../store/actions/productsActions";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Products</Typography>
        </Grid>
        <Grid item>
          <Button color="primary" component={Link} to="/products/new">Add product</Button>
        </Grid>
      </Grid>
      <Grid item container spacing={1}>
        {products.map(product => (
          <div key={product.id}>
            {product.title} ({product.price})
          </div>
        ))}
      </Grid>
    </Grid>
  );
};

export default Products;