import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <AppBar position="static" sx={{ backgroundColor: '#D62300', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Toolbar>
            <RestaurantIcon sx={{ mr: 2 }} />
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 600, letterSpacing: '0.5px' }}>
              BungoEats
            </Typography>
            <Button color="inherit" component={Link} to="/" sx={{ mx: 0.5, textTransform: 'none', fontSize: '1rem' }}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/menu" sx={{ mx: 0.5, textTransform: 'none', fontSize: '1rem' }}>
              Menu
            </Button>
            <Button color="inherit" component={Link} to="/cart" sx={{ mx: 0.5, textTransform: 'none', fontSize: '1rem' }}>
              Cart
            </Button>
            {user ? (
              <>
                <Button color="inherit" component={Link} to="/orders" sx={{ mx: 0.5, textTransform: 'none', fontSize: '1rem' }}>
                  My Orders
                </Button>
                <Button color="inherit" onClick={() => setUser(null)} sx={{ mx: 0.5, textTransform: 'none', fontSize: '1rem' }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login" sx={{ mx: 0.5, textTransform: 'none', fontSize: '1rem' }}>
                  Login
                </Button>
                <Button 
                  variant="contained" 
                  component={Link} 
                  to="/register" 
                  sx={{ 
                    mx: 0.5, 
                    textTransform: 'none', 
                    fontSize: '1rem',
                    backgroundColor: 'white',
                    color: '#D62300',
                    '&:hover': {
                      backgroundColor: '#FFF5F0'
                    }
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
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
            backgroundColor: '#D62300',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Typography variant="body2">
            © 2026 BungoEats - Food Delivery for Bungoma County
          </Typography>
        </Box>
      </div>
    </Router>
  );
}

export default App;
