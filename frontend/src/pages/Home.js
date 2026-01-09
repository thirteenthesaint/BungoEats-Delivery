<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My HTML Document</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        header {
            background-color: #333;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px;
        }
        main {
            background-color: white;
            padding: 20px;
            margin-top: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        h1 {
            margin: 0;
        }
        h2 {
            color: #333;
        }
        p {
            line-height: 1.6;
            color: #666;
        }
        footer {
            text-align: center;
            margin-top: 20px;
            padding: 10px;
            color: #666;
        }
    </style>
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
    </header>
    
    <main>
        <h2>About This Page</h2>
        <p>This is a basic HTML document with some styling. You can customize this template to create your own web page.</p>
        
        <h2>Features</h2>
        <ul>
            <li>Clean and modern design</li>
            <li>Responsive layout</li>
            <li>Easy to customize</li>
            <li>Built with HTML and CSS</li>
        </ul>
        
        <h2>Get Started</h2>
        <p>Edit this HTML file to add your own content, images, and links. You can modify the styles in the &lt;style&gt; section to change colors, fonts, and layout.</p>
    </main>
    
    <footer>
        <p>&copy; 2026 My Website. All rights reserved.</p>
    </footer>
</body>
</html>import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid, Card, CardContent, Box, Chip } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Street Snacks', 'Quick Meals', 'Local Meals', 'Pizza', 'Chicken', 'Drinks'];

  const restaurants = [
    { id: 1, name: 'KISAM FRIES', type: 'Fast Food', specialties: 'Fries, Snacks, Burgers, Chicken', rating: 4.5, deliveryTime: '20-30 min', emoji: '🍟', categories: ['Street Snacks', 'Quick Meals', 'Chicken'] },
    { id: 2, name: 'PIZZA CHAMP BG', type: 'Pizza', specialties: 'Pizza by slice, Quick pizza meals', rating: 4.6, deliveryTime: '25-35 min', emoji: '🍕', categories: ['Pizza', 'Quick Meals'] },
    { id: 3, name: "Tita's Fast Foods", type: 'Fast Food', specialties: 'Burgers, Chips, Grilled items', location: 'Moi Avenue', rating: 4.4, deliveryTime: '20-30 min', emoji: '🍔', categories: ['Quick Meals', 'Street Snacks'] },
    { id: 4, name: 'ROMA CAFE', type: 'Pizza & Cafe', specialties: 'Pizza, Coffee, Sandwiches', rating: 4.8, deliveryTime: '25-35 min', emoji: '☕', note: 'Best pizza in town', categories: ['Pizza', 'Drinks', 'Quick Meals'] },
    { id: 5, name: 'Noor Restaurant Bungoma', type: 'Cafe & Fast Food', specialties: 'Quick meals, Drinks, Snacks', rating: 4.5, deliveryTime: '20-30 min', emoji: '🍽️', social: '@noor_bungoma', categories: ['Street Snacks', 'Quick Meals', 'Drinks'] },
    { id: 6, name: 'King Fries Chicken Parlour', type: 'Fast Food', specialties: 'Chicken, Chips, Fries', rating: 4.3, deliveryTime: '20-30 min', emoji: '🍗', categories: ['Chicken', 'Street Snacks'] },
    { id: 7, name: 'Shell Service Station', type: 'Quick Service', specialties: 'Burgers, Hot snacks, Soft drinks', rating: 4.0, deliveryTime: '15-25 min', emoji: '⛽', categories: ['Quick Meals', 'Drinks'] },
    { id: 8, name: 'Tuutis Restaurant', type: 'Full Restaurant', specialties: 'Pizzas, Burgers, Quick meals', rating: 4.6, deliveryTime: '30-40 min', emoji: '🍽️', categories: ['Pizza', 'Quick Meals', 'Local Meals'] },
    { id: 9, name: 'Zabibu Restaurant', type: 'Quick Service', specialties: 'Snacks, Fast meals, Rice plates', rating: 4.4, deliveryTime: '25-35 min', emoji: '🍚', categories: ['Local Meals', 'Quick Meals'] },
    { id: 10, name: 'Solitaire', type: 'Casual Restaurant', specialties: 'Fast-to-eat meals', rating: 4.5, deliveryTime: '25-35 min', emoji: '🍽️', categories: ['Quick Meals', 'Local Meals'] },
    { id: 11, name: 'The Foyer Eateries', type: 'Small Eatery', specialties: 'Quick meals, Light bites', rating: 4.3, deliveryTime: '20-30 min', emoji: '🥗', categories: ['Quick Meals', 'Street Snacks'] },
    { id: 12, name: 'Al Jazeera Restaurant', type: 'Casual Restaurant', specialties: 'Quick meals, Local fast eats', rating: 4.4, deliveryTime: '25-35 min', emoji: '🍽️', categories: ['Local Meals', 'Quick Meals'] },
    { id: 13, name: "Lily's Kitchen", type: 'Quick Lunch', specialties: 'Fast comfort food', rating: 4.5, deliveryTime: '20-30 min', emoji: '🍲', categories: ['Local Meals', 'Quick Meals'] },
    { id: 14, name: 'Vybz Lounge', type: 'Lounge', specialties: 'Quick bites', rating: 4.2, deliveryTime: '25-35 min', emoji: '🍸', categories: ['Street Snacks', 'Drinks'] },
    { id: 15, name: 'Macris Restaurant', type: 'Restaurant', specialties: 'Quick quality meals', rating: 4.7, deliveryTime: '30-40 min', emoji: '⭐', categories: ['Local Meals', 'Quick Meals'] },
    { id: 16, name: 'Keringet Hotel & Restaurant', type: 'Hotel Restaurant', specialties: 'Quick meal options', rating: 4.4, deliveryTime: '30-40 min', emoji: '🏨', categories: ['Local Meals', 'Quick Meals'] },
    { id: 17, name: 'Wanakhatandi Rooftop Restaurant', type: 'Large Restaurant', specialties: 'Quick food choices', rating: 4.6, deliveryTime: '30-40 min', emoji: '🏢', categories: ['Local Meals', 'Quick Meals', 'Pizza'] }
  ];

  const filteredRestaurants = selectedCategory === 'All' 
    ? restaurants 
    : restaurants.filter(restaurant => restaurant.categories.includes(selectedCategory));





  return (
    <Box sx={{ bgcolor: '#FAFAFA', minHeight: '100vh', pb: 4 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', py: 6, bgcolor: 'white', borderRadius: 2, mt: 3, mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#1F2937', mb: 2 }}>
            Order Your Favorite Food
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
            Delicious meals delivered to your doorstep in Bungoma County
          </Typography>
          <Button
            component={Link}
            to="/menu"
            variant="contained"
            size="large"
            startIcon={<ShoppingCart />}
            sx={{ 
              bgcolor: '#7C3AED',
              color: 'white',
              px: 5,
              py: 1.5,
              borderRadius: 3,
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#6D28D9'
              }
            }}
          >
            Browse Menu
          </Button>
        </Box>

        {/* Categories */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#1F2937' }}>
            Categories
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => setSelectedCategory(category)}
                sx={{
                  bgcolor: selectedCategory === category ? '#7C3AED' : 'white',
                  color: selectedCategory === category ? 'white' : '#6B7280',
                  fontWeight: 600,
                  px: 2,
                  py: 2.5,
                  fontSize: '0.95rem',
                  border: selectedCategory === category ? 'none' : '1px solid #E5E7EB',
                  '&:hover': {
                    bgcolor: selectedCategory === category ? '#6D28D9' : '#F3F4F6'
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Restaurants Grid */}
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#1F2937' }}>
            {selectedCategory === 'All' ? 'Our Partner Restaurants' : `Restaurants serving ${selectedCategory}`}
          </Typography>
          <Grid container spacing={3}>
            {filteredRestaurants.map((restaurant) => (
              <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
                <Card sx={{ height: '100%', borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' } }}>
                  <Box sx={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#F9FAFB', fontSize: '4rem' }}>
                    {restaurant.emoji}
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: '#1F2937' }}>
                      {restaurant.name}
                    </Typography>
                    <Chip label={restaurant.type} size="small" sx={{ mb: 1.5, bgcolor: '#EDE9FE', color: '#7C3AED', fontWeight: 600, fontSize: '0.75rem' }} />
                    {restaurant.location && (
                      <Typography variant="caption" display="block" sx={{ mb: 1, color: '#6B7280' }}>
                        📍 {restaurant.location}
                      </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.875rem' }}>
                      {restaurant.specialties}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          ⭐ {restaurant.rating}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          ⏱️ {restaurant.deliveryTime}
                        </Typography>
                      </Box>
                    </Box>
                    {restaurant.note && (
                      <Typography variant="caption" sx={{ display: 'block', mb: 2, color: '#7C3AED', fontWeight: 600 }}>
                        ⭐ {restaurant.note}
                      </Typography>
                    )}
                    <Button component={Link} to="/menu" fullWidth variant="contained" sx={{ bgcolor: '#7C3AED', color: 'white', borderRadius: 2, textTransform: 'none', fontWeight: 600, py: 1, '&:hover': { bgcolor: '#6D28D9' } }}>
                      View Menu
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 6, py: 5, bgcolor: 'white', borderRadius: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#1F2937' }}>
            Ready to Order?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Browse our full menu and get your food delivered fast
          </Typography>
          <Button
            component={Link}
            to="/menu"
            variant="contained"
            size="large"
            sx={{ bgcolor: '#7C3AED', color: 'white', px: 6, py: 1.5, borderRadius: 3, textTransform: 'none', fontSize: '1.1rem', fontWeight: 600, '&:hover': { bgcolor: '#6D28D9' } }}
          >
            View Full Menu
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
