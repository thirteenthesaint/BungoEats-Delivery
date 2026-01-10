import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Router>
      <div className="App">
        <AppBar position="static" sx={{ background: '#DC2626' }}>
          <Toolbar>
            <Typography 
              variant="h6" 
              component={Link} 
              to="/" 
              sx={{ 
                flexGrow: 1, 
                textDecoration: 'none', 
                color: 'inherit',
                cursor: 'pointer'
              }}
            >
              BungoEats
            </Typography>
            <IconButton color="inherit" component={Link} to="/cart" sx={{ mr: 1 }}>
              <ShoppingCartIcon />
            </IconButton>
            <IconButton 
              color="inherit" 
              onClick={handleMenuClick}
              edge="end"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem component={Link} to="/" onClick={handleMenuClose}>
                Home
              </MenuItem>
              <MenuItem component={Link} to="/restaurants" onClick={handleMenuClose}>
                Restaurants
              </MenuItem>
              <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
                Login
              </MenuItem>
              <MenuItem component={Link} to="/register" onClick={handleMenuClose}>
                Register
              </MenuItem>
            </Menu>
            {user && (
              <>
                <Button color="inherit" component={Link} to="/orders">
                  My Orders
                </Button>
                <Button color="inherit" onClick={() => setUser(null)}>
                  Logout
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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

        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: '#2c3e50',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Typography variant="body2">
            © 2026 BungoEats
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, fontSize: '0.9rem' }}>
            Designed by{' '}
            <a 
              href="https://fab13n.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#9b59b6', textDecoration: 'none', fontWeight: 600 }}
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
