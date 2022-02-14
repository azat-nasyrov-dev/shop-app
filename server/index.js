const express = require('express');
const cors = require('cors');
const mongoDb = require('./mongoDb');
const products = require('./app/products');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

const port = 8000;

app.use('/products', products);

const run = async () => {
  await mongoDb.connect();

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoDb.disconnect();
  });
};

run().catch(console.error);
