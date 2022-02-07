const express = require('express');
const products = require('./app/products');
const app = express();

const port = 8000;

app.use('/products', products);

app.listen(port, () => {
  console.log(`Server started on ${port} port!`);
});