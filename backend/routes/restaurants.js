const express = require('express');
const router = express.Router();
const {
  getAllRestaurants,
  getRestaurant,
  getRestaurantMenu,
  createRestaurant,
  updateRestaurant
} = require('../controllers/restaurantController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurant);
router.get('/:id/menu', getRestaurantMenu);

// Protected routes
router.post('/', protect, authorize('admin'), createRestaurant);
router.put('/:id', protect, authorize('restaurant', 'admin'), updateRestaurant);

module.exports = router;
