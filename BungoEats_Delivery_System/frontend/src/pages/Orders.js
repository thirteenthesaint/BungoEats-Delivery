import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, Card, CardContent, Box, Chip, Grid,
  Stepper, Step, StepLabel, Alert, CircularProgress
} from '@mui/material';
import axios from 'axios';
import io from 'socket.io-client';

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchOrders();

    // Setup Socket.io for real-time updates
    const socket = io('http://localhost:5000', {
      auth: { token }
    });

    socket.on('orderUpdate', (updatedOrder) => {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/orders/my-orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setOrders(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'warning',
      'confirmed': 'info',
      'preparing': 'primary',
      'out-for-delivery': 'secondary',
      'delivered': 'success',
      'cancelled': 'error'
    };
    return colors[status] || 'default';
  };

  const getStatusSteps = () => {
    return ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'];
  };

  const getActiveStep = (status) => {
    const steps = {
      'pending': 0,
      'confirmed': 1,
      'preparing': 2,
      'out-for-delivery': 3,
      'delivered': 4,
      'cancelled': -1
    };
    return steps[status] || 0;
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading your orders...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          No Orders Yet
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Start ordering delicious food from our menu!
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        My Orders
      </Typography>

      {orders.map((order) => (
        <Card key={order._id} sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </Typography>
                  <Chip
                    label={order.status.replace('-', ' ').toUpperCase()}
                    color={getStatusColor(order.status)}
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Placed on: {new Date(order.createdAt).toLocaleString()}
                </Typography>

                <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
                  <strong>Delivery Address:</strong> {order.deliveryAddress}
                </Typography>

                <Typography variant="body2" gutterBottom>
                  <strong>Phone:</strong> {order.phoneNumber}
                </Typography>

                {order.notes && (
                  <Typography variant="body2" gutterBottom>
                    <strong>Notes:</strong> {order.notes}
                  </Typography>
                )}

                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    <strong>Items:</strong>
                  </Typography>
                  {order.items.map((item, index) => (
                    <Typography key={index} variant="body2">
                      • {item.menuItem?.name || 'Item'} x {item.quantity} - KES {(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  ))}
                </Box>

                <Typography variant="h6" sx={{ mt: 2 }}>
                  Total: KES {order.totalAmount.toFixed(2)}
                </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                {order.status !== 'cancelled' && (
                  <Stepper activeStep={getActiveStep(order.status)} orientation="vertical">
                    {getStatusSteps().map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                )}
                {order.status === 'cancelled' && (
                  <Alert severity="error">This order has been cancelled</Alert>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default Orders;
