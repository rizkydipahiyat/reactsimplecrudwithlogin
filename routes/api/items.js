const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Memanggil Schema Database dari Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
	Item.find()
		.sort({ date: -1 })
		.then(item => res.json(item));
});

// @route   POST api/items
// @desc    Create A Post
// @access  Private
router.post('/', auth, (req, res) => {
	const newItem = new Item({
		name: req.body.name,
	});

	newItem.save().then(item => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    Delete An Post
// @access  Private
router.delete('/:id', auth, (req, res) => {
	Item.findById(req.params.id)
		.then(item => item.remove())
		.then(() => res.json({ success: true }))
		.catch(err => res.status(404).json({ success: false }));
});
module.exports = router;
