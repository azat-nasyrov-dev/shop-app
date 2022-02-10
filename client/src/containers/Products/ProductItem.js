import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {Link} from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CardMedia from '@material-ui/core/CardMedia';

import imageNotAvailable from '../../assets/images/imageNotAvailable.png';
import {apiURL} from '../../config';

const useStyles = makeStyles({
  card: {
    height: '100%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  }
});

const ProductItem = ({title, price, image, id}) => {
  const classes = useStyles();

  let cardImage = imageNotAvailable;

  if (image) {
    cardImage = apiURL + '/uploads/' + image
  }

  return (
    <Grid item xs sm md={6} lg={4}>
      <Card className={classes.card}>
        <CardHeader title={title}/>
        <CardMedia
          image={cardImage}
          title={title}
          className={classes.media}
        />
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