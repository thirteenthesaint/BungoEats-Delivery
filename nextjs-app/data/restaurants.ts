export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  rating: number;
  priceRange: string;
  deliveryTime: string;
  tags: string[];
  image: string;
  iconType: 'local' | 'rice' | 'pizza' | 'burger' | 'grill' | 'cafe';
  emoji: string;
  description: string;
  categories: MenuCategory[];
  priority?: number;
}

export const restaurants: Restaurant[] = [
  {
    id: '0',
    name: 'SnackIt!',
    slug: 'snackit',
    rating: 4.9,
    priceRange: 'KES 50–300',
    deliveryTime: '15–25 min',
    tags: ['Street Food', 'Drinks', 'Fast Food'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    iconType: 'burger',
    emoji: '🌭',
    description: 'Your favorite street food spot! Quick bites, refreshing drinks, and local favorites.',
    priority: 1,
    categories: [
      {
        id: 'street-food',
        name: 'Street Food',
        items: [
          {
            id: 'smokie-pasua',
            name: 'Smokie Pasua',
            description: 'Grilled smokie with kachumbari',
            price: 70,
            image: 'https://images.unsplash.com/photo-1612392062798-2dbaa2c2c2d1?w=500&q=80'
          },
          {
            id: 'chips-mayai',
            name: 'Chips Mayai',
            description: 'Kenyan street food classic - fries omelette',
            price: 150,
            image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=80'
          },
          {
            id: 'bhajia',
            name: 'Bhajia',
            description: 'Crispy potato fritters',
            price: 100,
            image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80'
          },
          {
            id: 'samosa',
            name: 'Samosa (3 pcs)',
            description: 'Crispy beef samosas',
            price: 90,
            image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80'
          }
        ]
      },
      {
        id: 'drinks',
        name: 'Drinks',
        items: [
          {
            id: 'fresh-juice',
            name: 'Fresh Juice',
            description: 'Passion, mango, or mixed fruit',
            price: 150,
            image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&q=80'
          },
          {
            id: 'soda',
            name: 'Soda',
            description: 'Chilled soft drinks',
            price: 80,
            image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=500&q=80'
          },
          {
            id: 'water',
            name: 'Bottled Water',
            description: 'Fresh drinking water',
            price: 50,
            image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=500&q=80'
          }
        ]
      }
    ]
  },
  {
    id: '1',
    name: 'Noor Restaurant Bungoma',
    slug: 'noor-restaurant-bungoma',
    rating: 4.7,
    priceRange: 'KES 100–500',
    deliveryTime: '25–35 min',
    tags: ['Kenyan', 'Breakfast', 'Local Dishes'],
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    iconType: 'local',
    emoji: '🍛',
    description: 'Authentic Kenyan cuisine with a modern twist. Famous for traditional breakfast and hearty meals.',
    categories: [
      {
        id: 'breakfast',
        name: 'Breakfast',
        items: [
          {
            id: 'chapati-beans',
            name: 'Chapati & Beans',
            description: 'Soft chapati served with delicious cooked beans',
            price: 150,
            image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80'
          },
          {
            id: 'mandazi-tea',
            name: 'Mandazi & Tea',
            description: 'Fresh mandazi with hot Kenyan tea',
            price: 120,
            image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80'
          }
        ]
      },
      {
        id: 'main-dishes',
        name: 'Main Dishes',
        items: [
          {
            id: 'beef-stew-ugali',
            name: 'Beef Stew & Ugali',
            description: 'Tender beef stew served with fresh ugali',
            price: 300,
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80'
          },
          {
            id: 'chicken-wet-fry',
            name: 'Chicken Wet Fry',
            description: 'Juicy chicken pieces in rich tomato sauce',
            price: 450,
            image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&q=80'
          },
          {
            id: 'pilau-beef',
            name: 'Pilau Beef',
            description: 'Aromatic spiced rice with tender beef',
            price: 350,
            image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80'
          }
        ]
      },
      {
        id: 'drinks',
        name: 'Drinks',
        items: [
          {
            id: 'tea-coffee',
            name: 'Tea / Coffee',
            description: 'Hot Kenyan tea or fresh coffee',
            price: 100,
            image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80'
          },
          {
            id: 'fresh-juice',
            name: 'Fresh Juice',
            description: 'Freshly squeezed fruit juice',
            price: 200,
            image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&q=80'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Tuutis Restaurant',
    slug: 'tuutis-restaurant',
    rating: 4.8,
    priceRange: 'KES 250–800',
    deliveryTime: '30–45 min',
    tags: ['Grill', 'Rice Dishes', 'Kenyan'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    iconType: 'rice',
    emoji: '🍗',
    description: 'Premium grilled meats and aromatic rice dishes. A favorite for special occasions.',
    categories: [
      {
        id: 'rice-dishes',
        name: 'Rice Dishes',
        items: [
          {
            id: 'chicken-biryani',
            name: 'Chicken Biryani',
            description: 'Fragrant basmati rice with spiced chicken',
            price: 500,
            image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80'
          },
          {
            id: 'beef-pilau',
            name: 'Beef Pilau',
            description: 'Traditional Kenyan pilau with tender beef',
            price: 400,
            image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&q=80'
          }
        ]
      },
      {
        id: 'grill',
        name: 'Grill',
        items: [
          {
            id: 'nyama-choma-goat',
            name: 'Nyama Choma (Goat)',
            description: 'Perfectly grilled goat meat, Kenyan style',
            price: 700,
            image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=500&q=80'
          },
          {
            id: 'wet-fry-chicken',
            name: 'Wet Fry Chicken',
            description: 'Succulent chicken in savory sauce',
            price: 450,
            image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&q=80'
          },
          {
            id: 'grilled-tilapia',
            name: 'Grilled Tilapia',
            description: 'Fresh tilapia grilled to perfection',
            price: 600,
            image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=80'
          }
        ]
      },
      {
        id: 'sides',
        name: 'Sides',
        items: [
          {
            id: 'masala-chips',
            name: 'Masala Chips',
            description: 'Crispy fries with spicy masala seasoning',
            price: 250,
            image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=80'
          },
          {
            id: 'mint-juice',
            name: 'Mint Juice',
            description: 'Refreshing mint-flavored drink',
            price: 200,
            image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Roma Cafe',
    slug: 'roma-cafe',
    rating: 4.6,
    priceRange: 'KES 200–800',
    deliveryTime: '20–30 min',
    tags: ['Pizza', 'Burgers', 'Fast Food', 'Coffee'],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
    iconType: 'cafe',
    emoji: '🍕',
    description: 'Italian-inspired cafe with amazing pizzas, burgers, and premium coffee.',
    categories: [
      {
        id: 'pizza',
        name: 'Pizza',
        items: [
          {
            id: 'margherita-pizza',
            name: 'Margherita Pizza',
            description: 'Classic pizza with tomato, mozzarella, and basil',
            price: 650,
            image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80'
          },
          {
            id: 'chicken-pizza',
            name: 'Chicken Pizza',
            description: 'Loaded with grilled chicken and vegetables',
            price: 750,
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80'
          },
          {
            id: 'pepperoni-pizza',
            name: 'Pepperoni Pizza',
            description: 'Spicy pepperoni with extra cheese',
            price: 800,
            image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80'
          }
        ]
      },
      {
        id: 'burgers',
        name: 'Burgers',
        items: [
          {
            id: 'beef-burger',
            name: 'Beef Burger',
            description: 'Juicy beef patty with fresh vegetables',
            price: 400,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80'
          },
          {
            id: 'chicken-burger',
            name: 'Chicken Burger',
            description: 'Crispy chicken with special sauce',
            price: 450,
            image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500&q=80'
          }
        ]
      },
      {
        id: 'coffee',
        name: 'Coffee & Drinks',
        items: [
          {
            id: 'cappuccino',
            name: 'Cappuccino',
            description: 'Rich espresso with steamed milk',
            price: 250,
            image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80'
          },
          {
            id: 'fries',
            name: 'Fries',
            description: 'Crispy golden french fries',
            price: 200,
            image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=80'
          }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Solitaire Restaurant',
    slug: 'solitaire-restaurant',
    rating: 4.5,
    priceRange: 'KES 300–500',
    deliveryTime: '25–40 min',
    tags: ['Local Dishes', 'Fast Food', 'Kenyan'],
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80',
    iconType: 'burger',
    emoji: '🍔',
    description: 'Comfort food at its best. Local favorites and fast food classics.',
    categories: [
      {
        id: 'local-dishes',
        name: 'Local Dishes',
        items: [
          {
            id: 'fried-chicken-chips',
            name: 'Fried Chicken & Chips',
            description: 'Crispy fried chicken with golden fries',
            price: 450,
            image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500&q=80'
          },
          {
            id: 'beef-stew-rice',
            name: 'Beef Stew & Rice',
            description: 'Hearty beef stew with steamed rice',
            price: 350,
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80'
          }
        ]
      },
      {
        id: 'fast-food',
        name: 'Fast Food',
        items: [
          {
            id: 'burger-fries',
            name: 'Burger & Fries',
            description: 'Classic burger combo with crispy fries',
            price: 400,
            image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&q=80'
          },
          {
            id: 'chicken-wrap',
            name: 'Chicken Wrap',
            description: 'Grilled chicken wrapped with fresh veggies',
            price: 350,
            image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&q=80'
          }
        ]
      }
    ]
  },
  {
    id: '5',
    name: 'Al Jazeera Restaurant',
    slug: 'al-jazeera-restaurant',
    rating: 4.7,
    priceRange: 'KES 80–500',
    deliveryTime: '20–35 min',
    tags: ['Rice', 'Grill', 'Kenyan', 'Breakfast'],
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    iconType: 'rice',
    emoji: '🍲',
    description: 'Affordable and delicious meals. Perfect for everyday dining.',
    categories: [
      {
        id: 'rice',
        name: 'Rice',
        items: [
          {
            id: 'chicken-pilau',
            name: 'Chicken Pilau',
            description: 'Spiced rice with tender chicken pieces',
            price: 350,
            image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80'
          },
          {
            id: 'beef-pilau',
            name: 'Beef Pilau',
            description: 'Traditional pilau with succulent beef',
            price: 300,
            image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&q=80'
          },
          {
            id: 'plain-rice',
            name: 'Plain Rice',
            description: 'Steamed white rice',
            price: 150,
            image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=500&q=80'
          }
        ]
      },
      {
        id: 'grill',
        name: 'Grill',
        items: [
          {
            id: 'grilled-chicken',
            name: 'Grilled Chicken',
            description: 'Perfectly seasoned grilled chicken',
            price: 500,
            image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&q=80'
          },
          {
            id: 'beef-skewers',
            name: 'Beef Skewers',
            description: 'Marinated beef on skewers',
            price: 400,
            image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=500&q=80'
          }
        ]
      },
      {
        id: 'drinks',
        name: 'Drinks',
        items: [
          {
            id: 'tea',
            name: 'Tea',
            description: 'Hot Kenyan tea',
            price: 80,
            image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80'
          },
          {
            id: 'soda',
            name: 'Soda',
            description: 'Chilled soft drink',
            price: 100,
            image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=500&q=80'
          }
        ]
      }
    ]
  },
  {
    id: '6',
    name: 'Ekero Choma Place',
    slug: 'ekero-choma-place',
    rating: 4.9,
    priceRange: 'KES 100–700',
    deliveryTime: '35–50 min',
    tags: ['Choma', 'Grill', 'Kenyan'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    iconType: 'grill',
    emoji: '🍖',
    description: 'The best nyama choma in Bungoma. Authentic grilled meats and traditional sides.',
    categories: [
      {
        id: 'choma',
        name: 'Choma',
        items: [
          {
            id: 'goat-choma',
            name: 'Goat Choma',
            description: 'Premium grilled goat meat',
            price: 700,
            image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=500&q=80'
          },
          {
            id: 'beef-choma',
            name: 'Beef Choma',
            description: 'Tender grilled beef',
            price: 600,
            image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=500&q=80'
          },
          {
            id: 'chicken-choma',
            name: 'Chicken Choma',
            description: 'Smoky grilled chicken',
            price: 500,
            image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&q=80'
          }
        ]
      },
      {
        id: 'sides',
        name: 'Sides',
        items: [
          {
            id: 'chips',
            name: 'Chips',
            description: 'Crispy french fries',
            price: 200,
            image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=80'
          },
          {
            id: 'kachumbari',
            name: 'Kachumbari',
            description: 'Fresh tomato and onion salad',
            price: 100,
            image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&q=80'
          },
          {
            id: 'ugali',
            name: 'Ugali',
            description: 'Traditional Kenyan staple',
            price: 100,
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80'
          }
        ]
      }
    ]
  }
];

export const getRestaurantBySlug = (slug: string): Restaurant | undefined => {
  return restaurants.find(r => r.slug === slug);
};

export const getRestaurantsByCategory = (category: string): Restaurant[] => {
  if (category === 'All') return restaurants;
  return restaurants.filter(r => r.tags.includes(category));
};

export const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  restaurants.forEach(r => {
    r.tags.forEach(tag => categories.add(tag));
  });
  return ['All', ...Array.from(categories)];
};
