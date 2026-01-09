import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, Box, Chip, Button } from '@mui/material';
import { Star, AccessTime, Restaurant as RestaurantIcon, MenuBook } from '@mui/icons-material';

function Restaurants() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('All');

  const restaurants = [
    { id: 1, name: 'KISAM FRIES', type: 'Fast Food', specialties: 'Fries, Snacks, Burgers, Chicken', rating: 4.5, deliveryTime: '20-30 min', emoji: '🍟' },
    { id: 2, name: 'PIZZA CHAMP BG', type: 'Pizza', specialties: 'Pizza by slice, Quick pizza meals', rating: 4.6, deliveryTime: '25-35 min', emoji: '🍕' },
    { id: 3, name: "Tita's Fast Foods", type: 'Fast Food', specialties: 'Burgers, Chips, Grilled items', rating: 4.4, deliveryTime: '20-30 min', emoji: '🍔' },
    { id: 4, name: 'ROMA CAFE', type: 'Cafe', specialties: 'Pizza, Coffee, Sandwiches', rating: 4.7, deliveryTime: '25-35 min', emoji: '☕' },
    { id: 5, name: 'Noor Restaurant Bungoma', type: 'Restaurant', specialties: 'Breakfast, Brunch, Light meals', rating: 4.2, deliveryTime: '20-30 min', emoji: '🍽️' },
    { id: 6, name: 'King Fries Chicken Parlour', type: 'Fast Food', specialties: 'Chicken, Chips, Fries', rating: 4.3, deliveryTime: '20-30 min', emoji: '🍗' },
    { id: 7, name: 'Shell Service Station', type: 'Quick Service', specialties: 'Burgers, Hot snacks, Soft drinks', rating: 4.0, deliveryTime: '15-25 min', emoji: '⛽' },
    { id: 8, name: 'Tuutis Restaurant', type: 'Restaurant', specialties: 'Biryani, Nyama Choma, Wet Fry Chicken', rating: 4.2, deliveryTime: '30-40 min', emoji: '🍽️' },
    { id: 9, name: 'Zabibu Restaurant', type: 'Restaurant', specialties: 'Rice combos, Stews, Grilled meats', rating: 3.7, deliveryTime: '25-35 min', emoji: '🍚' },
    { id: 10, name: 'Solitaire', type: 'Restaurant', specialties: 'Fried chicken, Chips, Burgers, Ugali', rating: 4.0, deliveryTime: '25-35 min', emoji: '🍽️' },
    { id: 11, name: 'The Foyer Eateries', type: 'Eatery', specialties: 'Fast lunch, Grilled meats, Chapati', rating: 5.0, deliveryTime: '20-30 min', emoji: '🥗' },
    { id: 12, name: 'Al Jazeera Restaurant', type: 'Restaurant', specialties: 'Chicken & Pilau, Kenyan breakfast', rating: 3.9, deliveryTime: '25-35 min', emoji: '🍽️' },
    { id: 13, name: "Lily's Kitchen", type: 'Restaurant', specialties: 'Traditional Kenyan meals', rating: 4.5, deliveryTime: '20-30 min', emoji: '🍲' },
    { id: 14, name: 'Vybz Lounge', type: 'Lounge', specialties: 'Quick meals, Light bites, Grills', rating: 4.7, deliveryTime: '25-35 min', emoji: '🍸' },
    { id: 15, name: 'Macris Restaurant', type: 'Restaurant', specialties: 'Nyama Choma, Grilled Tilapia, Steak', rating: 4.7, deliveryTime: '30-40 min', emoji: '⭐' },
    { id: 16, name: 'Keringet Hotel & Restaurant', type: 'Hotel Restaurant', specialties: 'Full breakfast, Hotel dining', rating: 4.4, deliveryTime: '30-40 min', emoji: '🏨' },
    { id: 17, name: 'Wanakhatandi Rooftop Restaurant', type: 'Restaurant', specialties: 'Luhya & Kenyan dishes, Ugali', rating: 3.9, deliveryTime: '30-40 min', emoji: '🏢' },
    { id: 18, name: 'Ekero Choma Place', type: 'Barbecue', specialties: 'Nyama Choma, Grilled meats, Kachumbari', rating: 4.4, deliveryTime: '25-35 min', emoji: '🔥' },
    { id: 19, name: 'Kivuli Resort', type: 'Resort', specialties: 'Local & International meals', rating: 4.5, deliveryTime: '35-45 min', emoji: '🌴' },
    { id: 20, name: 'The Maritini Lounge and Garden Restaurant', type: 'Lounge', specialties: 'Garden dining, Casual meals', rating: 4.6, deliveryTime: '30-40 min', emoji: '🌺' },
    { id: 21, name: 'Hunters Paradise Tuuti Restaurant', type: 'Restaurant', specialties: 'Hotel restaurant, Full menu', rating: 4.5, deliveryTime: '35-45 min', emoji: '🏞️' },
    { id: 22, name: 'Milimani Resort', type: 'Resort', specialties: 'Resort dining, Premium meals', rating: 4.6, deliveryTime: '35-45 min', emoji: '🏖️' },
    { id: 23, name: 'Bungoma Tea Room', type: 'Cafe', specialties: 'Tea, Snacks, Light meals', rating: 4.3, deliveryTime: '15-25 min', emoji: '🫖' },
    { id: 24, name: 'Zuri Place Bungoma', type: 'Restaurant', specialties: 'East African & Local dishes', rating: 4.4, deliveryTime: '25-35 min', emoji: '🍛' },
    { id: 25, name: 'Happy Moments Restaurant', type: 'Restaurant', specialties: 'Local plate meals, Home cooking', rating: 4.5, deliveryTime: '25-35 min', emoji: '😊' }
  ];

  const types = ['All', 'Fast Food', 'Pizza', 'Restaurant', 'Cafe', 'Lounge', 'Street Food', 'Fresh Drinks'];

  const filteredRestaurants = selectedType === 'All' 
    ? restaurants 
    : restaurants.filter(r => r.type.includes(selectedType));

  return (
    <Box sx={{ bgcolor: '#FAFAFA', minHeight: '100vh', pb: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', py: 6, bgcolor: 'white', borderRadius: 2, mt: 3, mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#1F2937', mb: 2 }}>
            Our Partner Restaurants
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {restaurants.length} restaurants serving delicious food in Bungoma County
          </Typography>
        </Box>

        {/* Large View Menu Button */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<MenuBook />}
            onClick={() => navigate('/restaurants')}
            sx={{
              bgcolor: '#B91C1C',
              color: 'white',
              borderRadius: 3,
              px: 6,
              py: 2,
              fontSize: '1.2rem',
              fontWeight: 700,
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(185, 28, 28, 0.3)',
              '&:hover': {
                bgcolor: '#991B1B',
                boxShadow: '0 6px 16px rgba(185, 28, 28, 0.4)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            View Full Menu
          </Button>
        </Box>

        {/* Filter Chips */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1F2937' }}>
            Filter by Type
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            {types.map((type) => (
              <Chip
                key={type}
                label={type}
                onClick={() => setSelectedType(type)}
                sx={{
                  bgcolor: selectedType === type ? '#B91C1C' : 'white',
                  color: selectedType === type ? 'white' : '#6B7280',
                  fontWeight: 600,
                  px: 2,
                  py: 2.5,
                  fontSize: '0.95rem',
                  border: selectedType === type ? 'none' : '1px solid #E5E7EB',
                  '&:hover': {
                    bgcolor: selectedType === type ? '#991B1B' : '#F3F4F6'
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Restaurants Grid */}
        <Grid container spacing={3}>
          {filteredRestaurants.map((restaurant) => (
            <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  borderRadius: 3,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <Box 
                  sx={{ 
                    height: 120, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    bgcolor: '#F9FAFB',
                    fontSize: '4rem'
                  }}
                >
                  {restaurant.emoji}
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: '#1F2937' }}>
                    {restaurant.name}
                  </Typography>
                  
                  <Chip 
                    label={restaurant.type} 
                    size="small" 
                    sx={{ 
                      mb: 1.5, 
                      bgcolor: '#FEE2E2', 
                      color: '#B91C1C',
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }} 
                  />
                  
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
                      <Star sx={{ fontSize: 18, color: '#F59E0B' }} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {restaurant.rating}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AccessTime sx={{ fontSize: 18, color: '#6B7280' }} />
                      <Typography variant="body2" color="text.secondary">
                        {restaurant.deliveryTime}
                      </Typography>
                    </Box>
                  </Box>
                  
                  {restaurant.note && (
                    <Typography variant="caption" sx={{ display: 'block', mb: 2, color: '#B91C1C', fontWeight: 600 }}>
                      ⭐ {restaurant.note}
                    </Typography>
                  )}
                  
                  {restaurant.social && (
                    <Typography variant="caption" sx={{ display: 'block', mb: 2, color: '#6B7280' }}>
                      📱 {restaurant.social}
                    </Typography>
                  )}
                  
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                    sx={{
                      bgcolor: '#B91C1C',
                      color: 'white',
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      py: 1,
                      '&:hover': {
                        bgcolor: '#991B1B'
                      }
                    }}
                  >
                    View Menu
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Restaurants;
