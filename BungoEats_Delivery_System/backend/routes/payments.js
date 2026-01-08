const express = require('express');
const router = express.Router();
const {
  initiateMpesaPayment,
  mpesaCallback,
  verifyPayment
} = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

// Protected routes
router.post('/mpesa', protect, initiateMpesaPayment);
router.post('/verify/:orderId', protect, verifyPayment);

// Callback route (public - called by M-Pesa)
router.post('/mpesa/callback', mpesaCallback);

module.exports = router;
