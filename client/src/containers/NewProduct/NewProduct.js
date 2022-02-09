import React from 'react';
import {useDispatch} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ProductForm from '../../components/ProductForm/ProductForm';
import {createProduct} from '../../store/actions/productsActions';

const NewProduct = ({history}) => {
  const dispatch = useDispatch();

  const onProductFormSubmit = async productData => {
    await dispatch(createProduct(productData));
    history.push('/');
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item xs>
        <Typography variant="h4">New product</Typography>
      </Grid>
      <Grid item xs>
        <ProductForm onSubmit={onProductFormSubmit}/>
      </Grid>
    </Grid>
  );
};

export default NewProduct;