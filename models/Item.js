const mongoose = require('mongoose');

// define a schema for the "Item" collection
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// export the model so it can be used in other files
module.exports = mongoose.model('Item', itemSchema);
