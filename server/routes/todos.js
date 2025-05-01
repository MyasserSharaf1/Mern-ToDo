const express = require('express');
const Todo    = require('../models/Todo');
const auth    = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new to-do
router.post('/', auth, async (req, res) => {
  const { title, description, dueDate } = req.body;
  try {
    const todo = new Todo({
      userId: req.user.id,
      title,
      description,
      dueDate
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all to-dos (with optional status & search filters)
router.get('/', auth, async (req, res) => {
  const { status, search } = req.query;
  const filter = { userId: req.user.id };
  if (status) filter.status = status;
  if (search) filter.title = { $regex: search, $options: 'i' };

  try {
    const todos = await Todo.find(filter).sort({ dueDate: 1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a to-do
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Not found.' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a to-do
router.delete('/:id', auth, async (req, res) => {
  try {
    const removed = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!removed) return res.status(404).json({ message: 'Not found.' });
    res.json({ message: 'Deleted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
