const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    required: true
    },

  profile: {
    type: Schema.Types.ObjectId,  // Use Schema.Types.ObjectId to reference Profile documents
    ref: 'Profile',
  },

});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product, productSchema}