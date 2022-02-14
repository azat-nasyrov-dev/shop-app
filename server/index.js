const express = require('express');
const cors = require('cors');
const products = require('./app/products');
const mongoose = require('mongoose');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

const port = 8000;

app.use('/products', products);

const run = async () => {
  await mongoose.connect('mongodb://localhost/shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoDb.disconnect();
  });
};

run().catch(console.error);
