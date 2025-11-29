const mongoose = require('mongoose');

// define a schema for the "Item" collection
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // remove whitespace
  },
  quantity: {
    type: Number,
    default: 1,
    min: 0, // quantity cannot be negative
  },
  price: {
    type: Number,
    required: true,
    min: 0, // price cannot be negative
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// export the model so it can be used in other files
module.exports = mongoose.model('Item', itemSchema);