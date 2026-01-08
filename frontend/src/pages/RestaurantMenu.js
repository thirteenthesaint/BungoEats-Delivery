import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, Box, Button, IconButton, Chip } from '@mui/material';
import { Add, Remove, ShoppingCart } from '@mui/icons-material';
import { restaurantMenus } from '../data/restaurantMenus';

function RestaurantMenu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const restaurant = restaurantMenus[id];

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  if (!restaurant) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4">Restaurant not found</Typography>
        <Button onClick={() => navigate('/restaurants')} sx={{ mt: 2 }}>Back to Restaurants</Button>
      </Container>
    );
  }

  const categories = ['All', ...new Set(restaurant.menu.map(item => item.category))];
  const filteredMenu = selectedCategory === 'All' 
    ? restaurant.menu 
    : restaurant.menu.filter(item => item.category === selectedCategory);

  const addToCart = (item) => {
    setCart(prev => ({
      ...prev,
      [item.id]: {
        ...item,
        quantity: (prev[item.id]?.quantity || 0) + 1,
        restaurantName: restaurant.name,
        restaurantId: id
      }
    }));
  };

  const removeFromCart = (itemId) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId].quantity > 1) {
        newCart[itemId].quantity -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <Box sx={{ bgcolor: '#FAFAFA', minHeight: '100vh', pb: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', py: 6, bgcolor: 'white', borderRadius: 2, mt: 3, mb: 4 }}>
          <Typography variant="h2" sx={{ fontSize: '4rem', mb: 2 }}>{restaurant.emoji}</Typography>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#1F2937' }}>
            {restaurant.name}
          </Typography>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/restaurants')}
            sx={{ mt: 2, borderColor: '#B91C1C', color: '#B91C1C' }}
          >
            ← Back to Restaurants
          </Button>
        </Box>

        {/* Category Filter */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1F2937' }}>
            Filter by Category
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => setSelectedCategory(category)}
                sx={{
                  bgcolor: selectedCategory === category ? '#B91C1C' : 'white',
                  color: selectedCategory === category ? 'white' : '#6B7280',
                  fontWeight: 600,
                  px: 2,
                  py: 2.5,
                  fontSize: '0.95rem',
                  border: selectedCategory === category ? 'none' : '1px solid #E5E7EB',
                  '&:hover': {
                    bgcolor: selectedCategory === category ? '#991B1B' : '#F3F4F6'
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Menu Items */}
        <Grid container spacing={3}>
          {filteredMenu.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  borderRadius: 3,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#1F2937' }}>
                    {item.name}
                  </Typography>
                  
                  <Chip 
                    label={item.category} 
                    size="small" 
                    sx={{ 
                      mb: 1.5, 
                      bgcolor: '#FEE2E2', 
                      color: '#B91C1C',
                      fontWeight: 600,
                      fontSize: '0.7rem'
                    }} 
                  />
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {item.description}
                  </Typography>
                  
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#16A34A', mb: 2 }}>
                    KSh {item.price}
                  </Typography>
                  
                  {cart[item.id] ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <IconButton 
                        onClick={() => removeFromCart(item.id)}
                        sx={{ bgcolor: '#FEE2E2', color: '#B91C1C', '&:hover': { bgcolor: '#FCA5A5' } }}
                      >
                        <Remove />
                      </IconButton>
                      <Typography variant="h6" sx={{ fontWeight: 600, minWidth: 30, textAlign: 'center' }}>
                        {cart[item.id].quantity}
                      </Typography>
                      <IconButton 
                        onClick={() => addToCart(item)}
                        sx={{ bgcolor: '#DCFCE7', color: '#16A34A', '&:hover': { bgcolor: '#BBF7D0' } }}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  ) : (
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => addToCart(item)}
                      sx={{
                        bgcolor: '#16A34A',
                        color: 'white',
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        py: 1,
                        '&:hover': {
                          bgcolor: '#15803D'
                        }
                      }}
                    >
                      Add to Cart
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Floating Cart Button */}
        {getTotalItems() > 0 && (
          <Box
            sx={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              zIndex: 1000
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/cart')}
              startIcon={<ShoppingCart />}
              sx={{
                bgcolor: '#B91C1C',
                color: 'white',
                borderRadius: 3,
                px: 3,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(185, 28, 28, 0.4)',
                '&:hover': {
                  bgcolor: '#991B1B',
                  boxShadow: '0 6px 16px rgba(185, 28, 28, 0.5)'
                }
              }}
            >
              View Cart ({getTotalItems()})
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default RestaurantMenu;
