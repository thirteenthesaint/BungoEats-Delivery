import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Badge,
  Avatar
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Home from './pages/Home';
import MenuPage from './pages/Menu';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Register from './pages/Register';
import Restaurants from './pages/Restaurants';
import RestaurantMenu from './pages/RestaurantMenu';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItemsCount, setCartItemsCount] = useState(0);

  return (
    <Router>
      <div className="App" style={{ backgroundColor: '#FAFAFA', minHeight: '100vh' }}>
        {/* Header with Search */}
        <AppBar 
          position="sticky" 
          elevation={0}
          sx={{ 
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E0E0E0'
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <RestaurantIcon sx={{ mr: 1, color: '#FF6B35', fontSize: 32 }} />
              <Typography 
                variant="h5" 
                component={Link}
                to="/"
                sx={{ 
                  fontWeight: 700,
                  color: '#2D3436',
                  letterSpacing: '-0.5px',
                  textDecoration: 'none'
                }}
              >
                BungoEats
              </Typography>
            </Box>

            {/* Search Bar */}
            <Box sx={{ flexGrow: 1, mx: 4, maxWidth: 500 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search for restaurants or food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  backgroundColor: '#F5F5F5',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: '#FF6B35',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF6B35',
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#757575' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Navigation Icons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {user ? (
                <>
                  <IconButton 
                    component={Link} 
                    to="/cart"
                    sx={{ color: '#2D3436' }}
                  >
                    <Badge badgeContent={cartItemsCount} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                  <Button
                    component={Link}
                    to="/orders"
                    sx={{
                      color: '#2D3436',
                      textTransform: 'none',
                      fontWeight: 500
                    }}
                  >
                    My Orders
                  </Button>
                  <Avatar 
                    sx={{ 
                      bgcolor: '#FF6B35', 
                      width: 36, 
                      height: 36,
                      cursor: 'pointer'
                    }}
                  >
                    {user.name ? user.name[0] : 'U'}
                  </Avatar>
                </>
              ) : (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    sx={{
                      color: '#2D3436',
                      textTransform: 'none',
                      fontWeight: 500
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    sx={{
                      backgroundColor: '#FF6B35',
                      textTransform: 'none',
                      fontWeight: 600,
                      borderRadius: 2,
                      px: 3,
                      '&:hover': {
                        backgroundColor: '#E55A2B',
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurant/:id" element={<RestaurantMenu />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
          </Routes>
        </Container>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 4,
            px: 2,
            mt: 'auto',
            backgroundColor: '#2D3436',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" sx={{ mb: 1 }}>
            © 2026 BungoEats - Food Delivery for Bungoma County
          </Typography>
          <Typography variant="caption" sx={{ color: '#B2BEC3' }}>
            Fast, Fresh, and Delicious Food Delivered to Your Door
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, fontSize: '0.9rem' }}>
            Designed by{' '}
            <a 
              href="https://fab13n.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#FF6B35', textDecoration: 'none', fontWeight: 600 }}
            >
              FabcR8r
            </a>
          </Typography>
        </Box>
      </div>
    </Router>
  );
}

export default App;
