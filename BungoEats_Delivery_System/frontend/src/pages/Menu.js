import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Chip, Box, TextField, MenuItem } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import axios from 'axios';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState({});
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { value: 'all', label: 'All Items' },
    { value: 'french-fries', label: 'French Fries' },
    { value: 'samosas', label: 'Samosas' },
    { value: 'fresh-juice', label: 'Fresh Juice' },
    { value: 'pizza', label: 'Pizza' },
    { value: 'ice-cream', label: 'Ice Cream' }
  ];

  useEffect(() => {
    fetchMenuItems();
    loadCart();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/menu');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

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

  const addToCart = (item) => {
    const newCart = { ...cart };
    if (newCart[item._id]) {
      newCart[item._id].quantity += 1;
    } else {
      newCart[item._id] = { ...item, quantity: 1 };
    }
    saveCart(newCart);
  };

  const removeFromCart = (itemId) => {
    const newCart = { ...cart };
    if (newCart[itemId]) {
      if (newCart[itemId].quantity > 1) {
        newCart[itemId].quantity -= 1;
      } else {
        delete newCart[itemId];
      }
      saveCart(newCart);
    }
  };

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = category === 'all' || item.category === category;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && item.available;
  });

  const getCartQuantity = (itemId) => {
    return cart[itemId]?.quantity || 0;
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 5, color: '#1A1A1A' }}>
        Our Menu
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search menu items"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  bgcolor: 'white'
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  bgcolor: 'white'
                }
              }}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>

      {/* Cart Summary */}
      {getTotalItems() > 0 && (
        <Box sx={{ mb: 4, p: 3, bgcolor: '#FFF5F0', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Cart: {getTotalItems()} item(s) | Total: KES {Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
          </Typography>
          <Button 
            variant="contained" 
            href="/cart" 
            sx={{ 
              bgcolor: '#D62300', 
              '&:hover': { bgcolor: '#B01E00' },
              borderRadius: '12px',
              py: 1.5,
              px: 4,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            View Cart & Checkout
          </Button>
        </Box>
      )}

      {/* Menu Items */}
      <Grid container spacing={3}>
        {filteredItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: '16px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12)'
                }
              }}
            >
              <CardMedia
                component="div"
                sx={{
                  height: 200,
                  bgcolor: '#FFF8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '5rem',
                  borderRadius: '16px 16px 0 0'
                }}
              >
                {item.image || '🍽️'}
              </CardMedia>
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 1.5 }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 2, lineHeight: 1.6 }}>
                  {item.description}
                </Typography>
                <Chip
                  label={item.category.replace('-', ' ').toUpperCase()}
                  size="small"
                  sx={{ 
                    mb: 2,
                    bgcolor: '#FFF5F0',
                    color: '#D62300',
                    fontWeight: 600,
                    fontSize: '0.75rem'
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#D62300', fontSize: '1.25rem' }}>
                  KES {item.price.toFixed(2)}
                </Typography>
              </CardContent>
              <Box sx={{ p: 3, pt: 0 }}>
                {getCartQuantity(item._id) === 0 ? (
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => addToCart(item)}
                    sx={{ 
                      bgcolor: '#D62300', 
                      '&:hover': { bgcolor: '#B01E00' },
                      borderRadius: '12px',
                      py: 1.5,
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '1rem'
                    }}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => removeFromCart(item._id)}
                      sx={{ 
                        minWidth: 48,
                        height: 48,
                        borderRadius: '12px',
                        borderColor: '#D62300',
                        color: '#D62300',
                        '&:hover': { 
                          borderColor: '#B01E00',
                          bgcolor: 'rgba(255, 107, 53, 0.04)'
                        }
                      }}
                    >
                      <Remove />
                    </Button>
                    <Typography variant="h6" sx={{ fontWeight: 600, minWidth: 40, textAlign: 'center' }}>
                      {getCartQuantity(item._id)}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => addToCart(item)}
                      sx={{ 
                        minWidth: 48,
                        height: 48,
                        borderRadius: '12px',
                        borderColor: '#D62300',
                        color: '#D62300',
                        '&:hover': { 
                          borderColor: '#B01E00',
                          bgcolor: 'rgba(255, 107, 53, 0.04)'
                        }
                      }}
                    >
                      <Add />
                    </Button>
                  </Box>
                )}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredItems.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No items found. Try adjusting your filters.
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default Menu;
