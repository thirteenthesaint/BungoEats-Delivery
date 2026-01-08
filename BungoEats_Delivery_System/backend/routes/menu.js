const express = require('express');
const router = express.Router();
const {
  getAllMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuByCategory
} = require('../controllers/menuController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getAllMenuItems);
router.get('/category/:category', getMenuByCategory);
router.get('/:id', getMenuItem);

// Protected routes (restaurant/admin only)
router.post('/', protect, authorize('restaurant', 'admin'), createMenuItem);
router.put('/:id', protect, authorize('restaurant', 'admin'), updateMenuItem);
router.delete('/:id', protect, authorize('restaurant', 'admin'), deleteMenuItem);

module.exports = router;
