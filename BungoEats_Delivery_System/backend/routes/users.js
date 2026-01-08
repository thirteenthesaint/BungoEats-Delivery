const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Placeholder for user management routes
router.get('/', protect, authorize('admin'), (req, res) => {
  res.json({ message: 'Get all users - Admin only' });
});

module.exports = router;
