import connectDB from './mongodb';
import RestaurantModel from './models/Restaurant';
import CategoryModel from './models/Category';
import MenuItemModel from './models/MenuItem';
import * as fs from 'fs';
import * as path from 'path';

// Read seed data from JSON file
const seedDataPath = path.join(__dirname, 'seedData.json');
const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf-8'));

async function seed() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to database
    await connectDB();
    
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await RestaurantModel.deleteMany({});
    await CategoryModel.deleteMany({});
    await MenuItemModel.deleteMany({});
    
    // Seed categories
    console.log('📁 Seeding categories...');
    const createdCategories = await CategoryModel.insertMany(seedData.categories);
    
    // Create a map of category id (string) to MongoDB _id
    const categoryIdMap: Record<string, string> = {};
    createdCategories.forEach((cat: any) => {
      categoryIdMap[cat.id] = cat._id.toString();
    });
    
    console.log(`✅ Seeded ${seedData.categories.length} categories`);
    
    // Seed restaurants and menu items
    console.log('🍽️  Seeding restaurants and menu items...');
    
    for (const restaurant of seedData.restaurants) {
      // Extract menu items
      const menuItems = restaurant.menu;
      
      // Create restaurant without menu field
      const { menu, ...restaurantData } = restaurant;
      const createdRestaurant = await RestaurantModel.create(restaurantData);
      
      // Create menu items for this restaurant using the actual MongoDB _id
      const menuItemsWithIds = menuItems.map((item: any) => ({
        ...item,
        restaurantId: createdRestaurant._id.toString(),
        categoryId: categoryIdMap[item.categoryId] || item.categoryId, // Map to MongoDB _id
      }));
      
      // Debug: log the first menu item to verify IDs
      if (menuItemsWithIds.length > 0) {
        console.log(`    DEBUG: First menu item restaurantId: ${menuItemsWithIds[0].restaurantId}`);
        console.log(`    DEBUG: First menu item categoryId: ${menuItemsWithIds[0].categoryId}`);
      }
      
      await MenuItemModel.insertMany(menuItemsWithIds);
      
      console.log(`  ✅ Seeded ${restaurant.name} with ${menuItems.length} menu items`);
    }
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - ${seedData.categories.length} categories`);
    console.log(`   - ${seedData.restaurants.length} restaurants`);
    
    const totalMenuItems = seedData.restaurants.reduce((sum: number, r: any) => sum + r.menu.length, 0);
    console.log(`   - ${totalMenuItems} menu items`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
