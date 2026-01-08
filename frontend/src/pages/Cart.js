import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, Grid, Card, CardContent, Button, Box,
  TextField, IconButton, Divider, Alert
} from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';
import axios from 'axios';

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const saveCart = (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const updateQuantity = (itemId, change) => {
    const newCart = { ...cart };
    if (newCart[itemId]) {
      newCart[itemId].quantity += change;
      if (newCart[itemId].quantity <= 0) {
        delete newCart[itemId];
      }
      saveCart(newCart);
    }
  };

  const removeItem = (itemId) => {
    const newCart = { ...cart };
    delete newCart[itemId];
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart({});
  };

  const calculateSubtotal = () => {
    return Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateDeliveryFee = () => {
    return 100; // Fixed delivery fee of KES 100
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateDeliveryFee();
  };

  const handleCheckout = () => {
    if (!deliveryAddress || !phoneNumber) {
      setError('Please provide delivery address and phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Format order message for WhatsApp
      let message = '*🍔 NEW ORDER FROM BUNGOEATS*\n\n';
      message += '*📦 ORDER DETAILS:*\n';
      
      Object.values(cart).forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   Restaurant: ${item.restaurantName}\n`;
        message += `   Quantity: ${item.quantity}\n`;
        message += `   Price: KSh ${item.price} x ${item.quantity} = KSh ${item.price * item.quantity}\n\n`;
      });
      
      message += `*💰 PAYMENT SUMMARY:*\n`;
      message += `Subtotal: KSh ${calculateSubtotal()}\n`;
      message += `Delivery Fee: KSh ${calculateDeliveryFee()}\n`;
      message += `*Total: KSh ${calculateTotal()}*\n\n`;
      
      message += `*📍 DELIVERY DETAILS:*\n`;
      message += `Address: ${deliveryAddress}\n`;
      message += `Phone: ${phoneNumber}\n`;
      
      if (notes) {
        message += `\n*📝 SPECIAL INSTRUCTIONS:*\n${notes}\n`;
      }
      
      // Encode message for WhatsApp URL
      const encodedMessage = encodeURIComponent(message);
      const whatsappNumber = '254710121015'; // Your WhatsApp number
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Open WhatsApp
      window.open(whatsappURL, '_blank');
      
      // Clear cart after sending to WhatsApp
      setTimeout(() => {
        clearCart();
        setDeliveryAddress('');
        setPhoneNumber('');
        setNotes('');
        alert('Order sent to WhatsApp! We will confirm your order shortly.');
      }, 1000);
      
    } catch (error) {
      setError('Failed to process order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const cartItems = Object.values(cart);

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Your Cart is Empty
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Add some delicious items from our menu!
        </Typography>
        <Button variant="contained" href="/menu" size="large">
          Browse Menu
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Your Cart
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              {cartItems.map((item) => (
                <Box key={item.id} sx={{ mb: 3 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        {item.restaurantName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        KSh {item.price} each
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => updateQuantity(item.id, -1)}
                          sx={{ bgcolor: '#FEE2E2', color: '#B91C1C' }}
                        >
                          <Remove />
                        </IconButton>
                        <Typography sx={{ fontWeight: 600, minWidth: 30, textAlign: 'center' }}>{item.quantity}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => updateQuantity(item.id, 1)}
                          sx={{ bgcolor: '#DCFCE7', color: '#16A34A' }}
                        >
                          <Add />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ color: '#16A34A', fontWeight: 700 }}>
                          KSh {(item.price * item.quantity)}
                        </Typography>
                        <IconButton
                          color="error"
                          onClick={() => removeItem(item.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}
              <Button
                variant="outlined"
                color="error"
                onClick={clearCart}
                sx={{ mt: 2 }}
              >
                Clear Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Checkout Form */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Delivery Details
              </Typography>
              <TextField
                fullWidth
                label="Delivery Address"
                multiline
                rows={3}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                sx={{ mb: 2 }}
                required
              />
              <TextField
                fullWidth
                label="Phone Number (M-Pesa)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="0712345678"
                sx={{ mb: 2 }}
                required
              />
              <TextField
                fullWidth
                label="Special Instructions (Optional)"
                multiline
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                sx={{ mb: 3 }}
              />

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Subtotal:</Typography>
                  <Typography>KES {calculateSubtotal().toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Delivery Fee:</Typography>
                  <Typography>KES {calculateDeliveryFee().toFixed(2)}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total:</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    KES {calculateTotal().toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Place Order'}
              </Button>

              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, textAlign: 'center' }}>
                Payment via M-Pesa. You will receive a prompt on your phone.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Cart;
