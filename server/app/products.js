const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('List of products will be here');
});

router.get('/:id', (req, res) => {
  res.send('A single product by id will be here');
});

router.post('/', (req, res) => {
  res.send('Will create new product here');
});

module.exports = router;