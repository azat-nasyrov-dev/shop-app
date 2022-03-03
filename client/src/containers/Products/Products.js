import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ProductItem from './ProductItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ProductsLayout from '../../components/UI/Layout/ProductsLayout';
import {fetchProductsRequest} from '../../store/actions/productsActions';
import {Helmet} from 'react-helmet';

const useStyles = makeStyles(theme => ({
  progress: {
    height: 200
  }
}));

const Products = () => {
  const params = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const loading = useSelector(state => state.products.productsLoading);
  const user = useSelector(state => state.users.user);
  const categories = useSelector(state => state.categories.categories);
  const currentCategory = categories.find(c => c._id === params.id);
  const categoryName = currentCategory ? currentCategory.title : 'All products';

  useEffect(() => {
    dispatch(fetchProductsRequest(params.id));
  }, [dispatch, params.id]);

  return (
    <ProductsLayout>
      <Helmet>
        <title>{categoryName}</title>
      </Helmet>
      <Grid container direction="column" spacing={2}>
        <Grid item container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4">{categoryName}</Typography>
          </Grid>

          {user?.role === 'admin' && (
            <Grid item>
              <Button color="primary" component={Link} to="/products/new">Add product</Button>
            </Grid>
          )}
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
              key={product._id}
              id={product._id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          ))}
        </Grid>
      </Grid>
    </ProductsLayout>
  );
};

export default Products;