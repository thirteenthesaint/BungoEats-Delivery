const Order = require('../models/Order');
const axios = require('axios');

// @desc    Initiate M-Pesa payment
// @route   POST /api/payments/mpesa
// @access  Private
exports.initiateMpesaPayment = async (req, res) => {
  try {
    const { orderId, phoneNumber, amount } = req.body;
    
    // Find order
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }
    
    // M-Pesa STK Push implementation
    // Note: This is a simplified version. In production, you would:
    // 1. Get M-Pesa access token
    // 2. Make STK push request
    // 3. Handle callback
    
    // For now, we'll simulate the payment initiation
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const transactionId = `MPESA${timestamp}`;
    
    // Update order with transaction ID
    order.transactionId = transactionId;
    order.paymentStatus = 'pending';
    await order.save();
    
    res.json({
      success: true,
      message: 'Payment initiated. Please check your phone for M-Pesa prompt.',
      data: {
        orderId: order._id,
        transactionId,
        amount: order.total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    M-Pesa callback
// @route   POST /api/payments/mpesa/callback
// @access  Public (Called by M-Pesa)
exports.mpesaCallback = async (req, res) => {
  try {
    // Handle M-Pesa callback
    // Extract transaction details from callback
    const { Body } = req.body;
    
    // Update order payment status based on callback
    // This is simplified - in production, verify the callback signature
    
    res.json({
      ResultCode: 0,
      ResultDesc: 'Success'
    });
  } catch (error) {
    res.status(500).json({
      ResultCode: 1,
      ResultDesc: 'Failed'
    });
  }
};

// @desc    Verify payment
// @route   POST /api/payments/verify/:orderId
// @access  Private
exports.verifyPayment = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }
    
    // In production, query M-Pesa API to verify payment status
    // For now, we'll return the current status
    
    res.json({
      success: true,
      data: {
        orderId: order._id,
        paymentStatus: order.paymentStatus,
        transactionId: order.transactionId
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
