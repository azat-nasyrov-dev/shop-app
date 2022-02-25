const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  image: String,
  category: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;