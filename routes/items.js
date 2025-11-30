const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// CREATE new item
router.post('/', async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const item = new Item({ name, quantity, price });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to create item', error: err.message });
  }
});

// READ all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch items', error: err.message });
  }
});

// UPDATE item 
router.put('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,     // update ANY fields sent in the request
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);
  } catch (err) {
    res.status(400).json({
      message: 'Failed to update item',
      error: err.message
    });
  }
});


// DELETE item
router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete item', error: err.message });
  }
});

module.exports = router;