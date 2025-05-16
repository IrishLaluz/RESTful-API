const express = require('express');
const router = express.Router();
const db = require('./database');
// Remove or comment out this line
// const auth = require('../middleware/auth');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM posts');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create post - Remove auth middleware
router.post('/', async (req, res) => {  // Remove 'auth' from here
  const { title, content, author } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO posts (title, content, author) VALUES (?, ?, ?)',
      [title, content, author]
    );
    res.status(201).json({ id: result.insertId, title, content, author });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update post - Remove auth middleware
router.put('/:id', async (req, res) => {  // Remove 'auth' from here
  const { title, content, author } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE posts SET title = ?, content = ?, author = ? WHERE id = ?',
      [title, content, author, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ id: req.params.id, title, content, author });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete post - Remove auth middleware
router.delete('/:id', async (req, res) => {  // Remove 'auth' from here
  try {
    const [result] = await db.query('DELETE FROM posts WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;