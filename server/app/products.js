const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const upload = require('../multer').products;

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const criteria = {};

    if (req.query.category) {
      criteria.category = req.query.category;
    }

    const products = await Product.find(criteria).populate('category', 'title');
    res.send(products);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({_id: req.params.id}).populate('category', 'title');

    if (product) {
      res.send(product);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/', auth, permit('admin'), upload.single('image'), async (req, res) => {
  try {
    const productData = {
      category: req.body.category || null,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
    };

    if (req.file) {
      productData.image = req.file.filename;
    }

    const product = new Product(productData);
    await product.save();

    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;