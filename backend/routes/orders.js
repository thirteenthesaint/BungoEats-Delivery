const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrder,
  getUserOrders,
  updateOrderStatus,
  cancelOrder,
  rateOrder
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.post('/', createOrder);
router.get('/user/:userId', getUserOrders);
router.get('/:id', getOrder);
router.patch('/:id/status', authorize('restaurant', 'rider', 'admin'), updateOrderStatus);
router.patch('/:id/cancel', cancelOrder);
router.post('/:id/rate', rateOrder);

module.exports = router;
