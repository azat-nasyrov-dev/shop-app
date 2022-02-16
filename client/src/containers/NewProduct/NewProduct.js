import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ProductForm from '../../components/ProductForm/ProductForm';
import {createProduct} from '../../store/actions/productsActions';
import {fetchCategories} from '../../store/actions/categoriesActions';

const NewProduct = ({history}) => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.categories);

  const onProductFormSubmit = async productData => {
    await dispatch(createProduct(productData));
    history.push('/');
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item xs>
        <Typography variant="h4">New product</Typography>
      </Grid>
      <Grid item xs>
        <ProductForm onSubmit={onProductFormSubmit} categories={categories}/>
      </Grid>
    </Grid>
  );
};

export default NewProduct;