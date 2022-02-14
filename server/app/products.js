const path = require('path');
const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const config = require('../config');
const mongoDb = require('../mongoDb');
const Product = require('../models/Product');
const ObjectId = require('mongodb').ObjectId;

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
    const products = await Product.find();
    res.send(products);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const db = mongoDb.getDb();

    const result = await db.collection('products').findOne({_id: new ObjectId(req.params.id)});

    if (result) {
      res.send(result);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const product = req.body;

    if (req.file) {
      product.image = req.file.filename;
    }

    const db = mongoDb.getDb();
    const result = await db.collection('products').insertOne(product);

    res.send({...product, _id: result.ops[0]});
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;