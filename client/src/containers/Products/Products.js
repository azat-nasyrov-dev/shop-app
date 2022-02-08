import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {fetchProducts} from '../../store/actions/productsActions';
import ProductItem from './ProductItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  progress: {
    height: 200
  }
}));

const Products = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const loading = useSelector(state => state.products.productsLoading);

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
        {loading ? (
          <Grid container justifyContent="center" alignItems="center" className={classes.progress}>
            <Grid item>
              <CircularProgress/>
            </Grid>
          </Grid>
        ) : products.map(product => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default Products;