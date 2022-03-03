import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ProductForm from '../../components/ProductForm/ProductForm';
import {createProductRequest} from '../../store/actions/productsActions';
import {fetchCategoriesRequest} from '../../store/actions/categoriesActions';

const NewProduct = ({history}) => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.categories);
  const error = useSelector(state => state.products.createProductError);
  const loading = useSelector(state => state.products.createProductLoading);

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  const onProductFormSubmit = productData => {
    dispatch(createProductRequest(productData));
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item xs>
        <Typography variant="h4">New product</Typography>
      </Grid>
      <Grid item xs>
        <ProductForm
          onSubmit={onProductFormSubmit}
          categories={categories}
          loading={loading}
          error={error}
        />
      </Grid>
    </Grid>
  );
};

export default NewProduct;