const express = require('express');
const router = express.Router();
const Item = require('../models/Item'); // import item model

// GET all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find(); // fetch all items from database
    res.json(items); // return items as JSON
  } catch (err) {
    res.status(500).json({ message: err.message }); // internal server error
  }
});

// CREATE a new item
router.post('/', async (req, res) => {
  // create new item using request body
  const item = new Item({
    name: req.body.name,
    quantity: req.body.quantity
  });

  try {
    const newItem = await item.save(); // save item to database
    res.status(201).json(newItem); // return created item with 201 status
  } catch (err) {
    res.status(400).json({ message: err.message }); // bad request error
  }
});

// READ a single item by ID
router.get('/:id', getItem, (req, res) => {
  res.json(res.item); // return item fetched by getItem middleware
});

// UPDATE an existing item
router.patch('/:id', getItem, async (req, res) => {
  if (req.body.name != null) {
    res.item.name = req.body.name; // update name if provided
  }
  if (req.body.quantity != null) {
    res.item.quantity = req.body.quantity; // update quantity if provided
  }

  try {
    const updatedItem = await res.item.save(); // save updated item
    res.json(updatedItem); // return updated item
  } catch (err) {
    res.status(400).json({ message: err.message }); // bad request error
  }
});

// DELETE an item
router.delete('/:id', getItem, async (req, res) => {
  try {
    await res.item.remove(); // remove item from database
    res.json({ message: 'Deleted Item' }); // confirm deletion
  } catch (err) {
    res.status(500).json({ message: err.message }); // internal server error
  }
});

// middleware to fetch item by ID
async function getItem(req, res, next) {
  let item;
  try {
    item = await Item.findById(req.params.id); // find item by ID
    if (item == null) {
      return res.status(404).json({ message: 'Cannot find item' }); // item not found
    }
  } catch (err) {
    return res.status(500).json({ message: err.message }); // internal server error
  }

  res.item = item; // attach item to response for next middleware
  next(); // proceed to next route handler
}

module.exports = router; // export router for use in server