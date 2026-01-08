# BungoEats - Food Delivery System for Bungoma County

## Overview

BungoEats is a comprehensive food delivery platform designed specifically for Bungoma County, Kenya. Inspired by Dial-A-Delivery, this system connects local restaurants and fast-food vendors with customers, providing a seamless ordering and delivery experience.

## Features

### Customer Features
- **Multi-channel Ordering**: Order via web app, mobile app, phone, or WhatsApp
- **Real-time Order Tracking**: Track your order from preparation to delivery
- **M-Pesa Integration**: Secure payment through M-Pesa or cash on delivery
- **Menu Categories**: French fries, samosas, fresh juice, pizza, and ice cream
- **User Accounts**: Save delivery addresses and view order history
- **Live Updates**: Socket.io integration for real-time order status updates

### Restaurant Features
- **Menu Management**: Add, update, and manage menu items
- **Order Management**: Receive and process orders in real-time
- **Inventory Control**: Mark items as available/unavailable
- **Analytics Dashboard**: Track sales and popular items

### Admin Features
- **User Management**: Manage customers and restaurant partners
- **Order Oversight**: Monitor all orders across the platform
- **System Analytics**: View platform-wide statistics

## Technology Stack

### Backend
- **Node.js** with **Express.js**: RESTful API server
- **MongoDB**: NoSQL database for flexible data storage
- **Mongoose**: ODM for MongoDB
- **JWT**: Secure authentication
- **Socket.io**: Real-time bidirectional communication
- **bcrypt**: Password hashing

### Frontend
- **React**: Component-based UI library
- **React Router**: Client-side routing
- **Material-UI**: Modern, responsive UI components
- **Axios**: HTTP client for API requests
- **Socket.io-client**: Real-time updates

## Project Structure

```
BungoEats_Delivery_System/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Restaurant.js
│   │   ├── MenuItem.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── menu.js
│   │   ├── orders.js
│   │   └── restaurants.js
│   ├── middleware/
│   │   └── auth.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── menuController.js
│   │   └── orderController.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── Footer.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Menu.js
│   │   │   ├── Cart.js
│   │   │   ├── Orders.js
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bungoeats
JWT_SECRET=your_jwt_secret_key_here
MPESA_CONSUMER_KEY=your_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
MPESA_PASSKEY=your_mpesa_passkey
```

4. Start the backend server:
```bash
node server.js
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get single menu item
- `POST /api/menu` - Create menu item (restaurant only)
- `PUT /api/menu/:id` - Update menu item (restaurant only)
- `DELETE /api/menu/:id` - Delete menu item (restaurant only)

### Orders
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders/my-orders` - Get user's orders (protected)
- `GET /api/orders/:id` - Get single order (protected)
- `PUT /api/orders/:id/status` - Update order status (restaurant only)

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get single restaurant
- `POST /api/restaurants` - Register restaurant

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: String,
  role: String (customer/restaurant/admin),
  createdAt: Date
}
```

### Restaurant Model
```javascript
{
  name: String,
  owner: ObjectId (ref: User),
  description: String,
  address: String,
  phone: String,
  email: String,
  isActive: Boolean,
  createdAt: Date
}
```

### MenuItem Model
```javascript
{
  restaurant: ObjectId (ref: Restaurant),
  name: String,
  description: String,
  category: String,
  price: Number,
  image: String,
  available: Boolean,
  createdAt: Date
}
```

### Order Model
```javascript
{
  customer: ObjectId (ref: User),
  restaurant: ObjectId (ref: Restaurant),
  items: [{
    menuItem: ObjectId (ref: MenuItem),
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: String,
  deliveryAddress: String,
  phoneNumber: String,
  paymentMethod: String,
  paymentStatus: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Menu Categories

1. **French Fries** (`french-fries`)
   - Regular fries
   - Masala fries
   - Cheese fries

2. **Samosas** (`samosas`)
   - Beef samosas
   - Vegetable samosas
   - Chicken samosas

3. **Fresh Juice** (`fresh-juice`)
   - Orange juice
   - Mango juice
   - Mixed fruit juice
   - Passion juice

4. **Pizza** (`pizza`)
   - Margherita
   - Pepperoni
   - Vegetarian
   - BBQ Chicken

5. **Ice Cream** (`ice-cream`)
   - Vanilla
   - Chocolate
   - Strawberry
   - Mixed flavors

## Payment Integration

The system supports M-Pesa payment integration. To set up:

1. Register for M-Pesa Daraja API at https://developer.safaricom.co.ke/
2. Obtain your Consumer Key, Consumer Secret, and Passkey
3. Add credentials to `.env` file
4. The system will automatically initiate STK push for payments

## Deployment

### Backend Deployment (Heroku/Railway)

1. Create a new app on your hosting platform
2. Set environment variables
3. Deploy using Git:
```bash
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)

1. Build the production version:
```bash
npm run build
```

2. Deploy the `build` folder to your hosting platform

### Database (MongoDB Atlas)

1. Create a cluster on MongoDB Atlas
2. Get connection string
3. Update `MONGODB_URI` in environment variables

## Testing

### Sample Test Users

**Customer Account:**
- Email: customer@test.com
- Password: test123

**Restaurant Account:**
- Email: restaurant@test.com
- Password: test123

## Future Enhancements

1. **Mobile Apps**: Native iOS and Android applications
2. **Rider App**: Dedicated app for delivery personnel
3. **Advanced Analytics**: Detailed business intelligence dashboard
4. **Loyalty Program**: Rewards for frequent customers
5. **Multi-language Support**: Swahili and English
6. **SMS Notifications**: Order updates via SMS
7. **Rating System**: Customer reviews and ratings
8. **Promotional Codes**: Discount and coupon system

## Support

For support, contact:
- Email: support@bungoeats.co.ke
- Phone: +254 700 000 000
- WhatsApp: +254 700 000 000

## License

This project is proprietary software developed for Bungoma County food delivery services.

## Contributors

- Development Team: BungoEats Tech
- Market Research: Bungoma County Analysis Team
- Business Strategy: Based on Dial-A-Delivery model

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Status**: Production Ready
