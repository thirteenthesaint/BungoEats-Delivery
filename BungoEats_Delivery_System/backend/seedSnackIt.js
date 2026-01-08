// Seed database with SnackIt restaurant and menu
const mongoose = require('mongoose');
require('dotenv').config();

const Restaurant = require('./models/Restaurant');
const MenuItem = require('./models/MenuItem');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bungoeats';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✓ Connected to MongoDB'))
.catch(err => {
  console.error('✗ MongoDB connection error:', err);
  process.exit(1);
});

const seedData = async () => {
  try {
    console.log('\n🌱 Seeding SnackIt restaurant data...');

    // Create SnackIt restaurant
    const snackIt = await Restaurant.create({
      name: 'SnackIt!',
      description: 'Taste the Goodness, Delivered - Familiar, flavorful, forever',
      address: 'Bungoma Town, Bungoma County',
      phone: '+254712345678',
      email: 'info@snackit.co.ke',
      cuisine: ['Fast Food', 'Street Food', 'Beverages'],
      rating: 4.7,
      deliveryTime: '20-30 mins',
      minimumOrder: 100,
      isActive: true,
      openingHours: '24/7',
    });

    console.log('✓ Created restaurant: SnackIt!');

    // Create menu items
    const menuItems = [
      {
        restaurant: snackIt._id,
        name: 'Smocha',
        description: 'A delicious blend of smokie and chapati.',
        category: 'samosas',
        price: 150,
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
        isAvailable: true,
        rating: 4.8,
      },
      {
        restaurant: snackIt._id,
        name: 'Shawarma',
        description: 'Tender, spiced meat wrapped in a soft, warm roti.',
        category: 'fast-food',
        price: 200,
        image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400',
        isAvailable: true,
        rating: 4.9,
      },
      {
        restaurant: snackIt._id,
        name: 'Mushkaki',
        description: 'Succulent, grilled meat skewers.',
        category: 'fast-food',
        price: 180,
        image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',
        isAvailable: true,
        rating: 4.7,
      },
      {
        restaurant: snackIt._id,
        name: 'Fresh Juice',
        description: 'A burst of natural sweetness and vitamins.',
        category: 'fresh-juice',
        price: 100,
        image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
        isAvailable: true,
        rating: 4.8,
      },
      {
        restaurant: snackIt._id,
        name: 'Yoghurt',
        description: 'Creamy, refreshing, and homemade.',
        category: 'ice-cream',
        price: 80,
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
        isAvailable: true,
        rating: 4.6,
      },
      {
        restaurant: snackIt._id,
        name: 'French Fries',
        description: 'Crispy golden fries, perfectly seasoned.',
        category: 'french-fries',
        price: 120,
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
        isAvailable: true,
        rating: 4.5,
      },
      {
        restaurant: snackIt._id,
        name: 'Pizza Slice',
        description: 'Cheesy, delicious pizza slice with your choice of toppings.',
        category: 'pizza',
        price: 250,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
        isAvailable: true,
        rating: 4.6,
      },
      {
        restaurant: snackIt._id,
        name: 'Ice Cream Cone',
        description: 'Smooth, creamy ice cream in various flavors.',
        category: 'ice-cream',
        price: 150,
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400',
        isAvailable: true,
        rating: 4.7,
      },
    ];

    await MenuItem.insertMany(menuItems);
    console.log(`✓ Created ${menuItems.length} menu items`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Restaurant: ${snackIt.name}`);
    console.log(`   - Menu Items: ${menuItems.length}`);
    console.log(`   - Categories: french-fries, samosas, fresh-juice, pizza, ice-cream, fast-food`);
    console.log('\n🚀 You can now start the server!');
    
    process.exit(0);
  } catch (error) {
    console.error('\n✗ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
