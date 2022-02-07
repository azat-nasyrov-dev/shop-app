import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {Link} from 'react-router-dom';

const ProductItem = ({title, price, id}) => {
  return (
    <Grid item xs sm md={6} lg={4}>
      <Card>
        <CardHeader title={title}/>
        <CardContent>
          <strong style={{marginLeft: '10px'}}>
            Price: {price} KGS
          </strong>
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={'/products' + id}>
            <ArrowForwardIcon/>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;