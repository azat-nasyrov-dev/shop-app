const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  const categoryData = req.body;
  const category = new Category(categoryData);
  try {
    await category.save();
    res.send(category);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;