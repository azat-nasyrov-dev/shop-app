const path = require('path');
const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const config = require('../config');
const Product = require('../models/Product');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'title');
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

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const productData = req.body;

    if (req.file) {
      productData.image = 'uploads/' + req.file.filename;
    }

    const product = new Product(productData);
    await product.save();

    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;