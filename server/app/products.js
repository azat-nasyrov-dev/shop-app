const express = require('express');
const fileDb = require('../fileDb');
const router = express.Router();

router.get('/', (req, res) => {
  const products = fileDb.getItems();
  res.send(products);
});

router.get('/:id', (req, res) => {
  const product = fileDb.getItemById(req.params.id);
  res.send(product);
});

router.post('/', (req, res) => {
  fileDb.addItem(req.body);
  res.send(req.body);
});

module.exports = router;