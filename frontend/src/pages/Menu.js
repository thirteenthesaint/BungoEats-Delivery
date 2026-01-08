import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Chip, Box, TextField, MenuItem } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import axios from 'axios';

function Menu() {
  const [cart, setCart] = useState({});
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Complete Kenyan Menu Items
  const menuItems = [
    // Street Snacks
    { _id: 1, name: 'Mandazi', category: 'street-snacks', price: 20, description: 'Sweet fried dough nuggets, perfect with tea', emoji: '🍩', available: true, popular: true },
    { _id: 2, name: 'Smokies & Eggs', category: 'street-snacks', price: 80, description: 'Grilled sausages with boiled eggs and kachumbari', emoji: '🍳', available: true, popular: true },
    { _id: 3, name: 'Roasted Maize', category: 'street-snacks', price: 50, description: 'Charcoal-roasted corn with salt, chili or lemon', emoji: '🌽', available: true, popular: true },
    { _id: 4, name: 'Samosas (3pc)', category: 'street-snacks', price: 60, description: 'Crispy triangular pastries with spiced meat or veggies', emoji: '🥟', available: true, popular: true },
    { _id: 5, name: 'Bhajias', category: 'street-snacks', price: 50, description: 'Potato fritters deep-fried in batter', emoji: '🥔', available: true, popular: true },
    { _id: 6, name: 'Smokie Pasua', category: 'street-snacks', price: 70, description: 'Split smoked sausage with kachumbari', emoji: '🌭', available: true, popular: true },
    { _id: 7, name: 'Mshikaki (4 sticks)', category: 'street-snacks', price: 150, description: 'Spiced grilled meat skewers', emoji: '�串', available: true, popular: true },
    { _id: 8, name: 'Boiled Eggs with Kachumbari', category: 'street-snacks', price: 40, description: 'Protein-rich snack with fresh salad', emoji: '🥚', available: true, popular: false },
    
    // Quick Meals
    { _id: 9, name: 'Chips & Fried Chicken', category: 'quick-meals', price: 300, description: 'Fried potatoes with crispy chicken', emoji: '🍟', available: true, popular: true },
    { _id: 10, name: 'Beef Burger', category: 'quick-meals', price: 250, description: 'Juicy burger from local fast-food spots', emoji: '🍔', available: true, popular: true },
    { _id: 11, name: 'Pizza Slice', category: 'quick-meals', price: 200, description: 'Fresh pizza slice', emoji: '🍕', available: true, popular: true },
    { _id: 12, name: 'Chicken Shawarma', category: 'quick-meals', price: 220, description: 'Grilled chicken wrap with veggies', emoji: '🌯', available: true, popular: true },
    { _id: 13, name: 'Fried Rice', category: 'quick-meals', price: 180, description: 'Chinese-style fried rice', emoji: '🍚', available: true, popular: false },
    { _id: 14, name: 'Noodles', category: 'quick-meals', price: 150, description: 'Quick stir-fried noodles', emoji: '🍜', available: true, popular: false },
    
    // Local Meals
    { _id: 15, name: 'Githeri', category: 'local-meals', price: 100, description: 'Hearty maize and beans mix', emoji: '🍲', available: true, popular: true },
    { _id: 16, name: 'Ugali with Sukuma Wiki', category: 'local-meals', price: 120, description: 'Maize meal with collard greens', emoji: '🥗', available: true, popular: true },
    { _id: 17, name: 'Chapati with Stew', category: 'local-meals', price: 150, description: 'Wheat flatbread with meat or veggie sauce', emoji: '🫓', available: true, popular: true },
    { _id: 18, name: 'Matoke with Beans', category: 'local-meals', price: 130, description: 'Steamed plantains with bean stew', emoji: '🍌', available: true, popular: false },
    { _id: 19, name: 'Nyama Choma (1/4 kg)', category: 'local-meals', price: 400, description: 'Charcoal-grilled goat or beef', emoji: '🍖', available: true, popular: true },
    
    // Snacks & Treats
    { _id: 20, name: 'Fresh Sugarcane Juice', category: 'snacks-treats', price: 50, description: 'Refreshing pressed sugarcane juice', emoji: '🥤', available: true, popular: false },
    { _id: 21, name: 'Fresh Fruit Salad', category: 'snacks-treats', price: 80, description: 'Pineapple, watermelon, mango mix', emoji: '🍉', available: true, popular: false },
    { _id: 22, name: 'Chai with Mandazi', category: 'snacks-treats', price: 60, description: 'Milky sweet tea with fried dough', emoji: '☕', available: true, popular: true },
    
    // Drinks
    { _id: 23, name: 'Kenyan Chai (Tea)', category: 'drinks', price: 30, description: 'Hot milky tea with sugar', emoji: '☕', available: true, popular: true },
    { _id: 24, name: 'Fresh Juice', category: 'drinks', price: 80, description: 'Mango, passion, or mixed fruit juice', emoji: '🧃', available: true, popular: true },
    { _id: 25, name: 'Soda', category: 'drinks', price: 60, description: 'Cold soft drink', emoji: '🥤', available: true, popular: false },
    { _id: 26, name: 'Bottled Water', category: 'drinks', price: 40, description: 'Fresh drinking water', emoji: '💧', available: true, popular: false }
  ];

  const categories = [
    { value: 'all', label: 'All Items' },
    { value: 'street-snacks', label: 'Street Snacks' },
    { value: 'quick-meals', label: 'Quick Meals' },
    { value: 'local-meals', label: 'Local Meals' },
    { value: 'snacks-treats', label: 'Snacks & Treats' },
    { value: 'drinks', label: 'Drinks' }
  ];

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Our Menu
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search menu items"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
        <Box sx={{ mb: 3, p: 2, bgcolor: '#EDE9FE', borderRadius: 2 }}>
          <Typography variant="h6">
            Cart: {getTotalItems()} item(s) | Total: KES {Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
          </Typography>
          <Button variant="contained" href="/cart" sx={{ mt: 1, bgcolor: '#7C3AED', '&:hover': { bgcolor: '#6D28D9' } }}>
            View Cart & Checkout
          </Button>
        </Box>
      )}

      {/* Menu Items */}
      <Grid container spacing={3}>
        {filteredItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="div"
                sx={{
                  height: 200,
                  bgcolor: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '5rem'
                }}
              >
                {item.image || '🍽️'}
              </CardMedia>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {item.description}
                </Typography>
                <Chip
                  label={item.category.replace('-', ' ').toUpperCase()}
                  size="small"
                  sx={{ mb: 1 }}
                />
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                  KES {item.price.toFixed(2)}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                {getCartQuantity(item._id) === 0 ? (
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Button
                      variant="outlined"
                      onClick={() => removeFromCart(item._id)}
                      sx={{ minWidth: 40 }}
                    >
                      <Remove />
                    </Button>
                    <Typography variant="h6">
                      {getCartQuantity(item._id)}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => addToCart(item)}
                      sx={{ minWidth: 40 }}
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
