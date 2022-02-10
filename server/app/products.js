const path = require('path');
const express = require('express');
const multer = require('multer');
const fileDb = require('../fileDb');
const {nanoid} = require('nanoid');
const config = require('../config');

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
  const products = await fileDb.getItems();
  res.send(products);
});

router.get('/:id', async (req, res) => {
  const product = await fileDb.getItemById(req.params.id);
  res.send(product);
});

router.post('/', upload.single('image'), async (req, res) => {
  const product = req.body;

  if (req.file) {
    product.image = req.file.filename;
  }

  await fileDb.addItem(product);
  res.send(product);
});

module.exports = router;