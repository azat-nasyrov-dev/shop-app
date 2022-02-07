const express = require('express');
const fileDb = require('./fileDb');
const products = require('./app/products');
const app = express();
app.use(express.json());

fileDb.init();

const port = 8000;

app.use('/products', products);

app.listen(port, () => {
  console.log(`Server started on ${port} port!`);
});