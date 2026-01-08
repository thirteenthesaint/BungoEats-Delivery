# BungoEats Code Functionality Summary

## System Architecture Overview

BungoEats is a full-stack MERN (MongoDB, Express, React, Node.js) application designed for food delivery services in Bungoma County, Kenya.

## Backend Functionality

### 1. Server Configuration (server.js)

**Key Features:**
- Express.js server running on port 5000
- MongoDB connection with Mongoose ODM
- CORS enabled for cross-origin requests
- Socket.io for real-time communication
- JSON body parsing middleware
- Environment variables configuration

**Functionality:**
```javascript
// Server initialization
- Connects to MongoDB database
- Sets up middleware (CORS, JSON parser)
- Configures Socket.io for real-time updates
- Defines API routes
- Starts HTTP server
```

### 2. Database Models

#### User Model (models/User.js)
**Fields:**
- name: String (required)
- email: String (unique, required)
- password: String (hashed with bcrypt)
- phone: String
- address: String
- role: String (customer/restaurant/admin)
- createdAt: Date

**Methods:**
- Password hashing before save
- Password comparison for authentication

#### Restaurant Model (models/Restaurant.js)
**Fields:**
- name: String (required)
- owner: ObjectId (reference to User)
- description: String
- address: String
- phone: String
- email: String
- isActive: Boolean
- createdAt: Date

#### MenuItem Model (models/MenuItem.js)
**Fields:**
- restaurant: ObjectId (reference to Restaurant)
- name: String (required)
- description: String
- category: String (french-fries, samosas, fresh-juice, pizza, ice-cream)
- price: Number (required, minimum 0)
- image: String (URL or emoji)
- available: Boolean (default: true)
- createdAt: Date

#### Order Model (models/Order.js)
**Fields:**
- customer: ObjectId (reference to User)
- restaurant: ObjectId (reference to Restaurant)
- items: Array of {menuItem, quantity, price}
- totalAmount: Number (required)
- status: String (pending, confirmed, preparing, out-for-delivery, delivered, cancelled)
- deliveryAddress: String (required)
- phoneNumber: String (required)
- paymentMethod: String (mpesa/cash)
- paymentStatus: String (pending/completed/failed)
- notes: String
- createdAt: Date
- updatedAt: Date

### 3. Authentication System

#### Auth Controller (controllers/authController.js)

**Register Function:**
```javascript
Input: { name, email, password, phone, address }
Process:
  1. Validate input data
  2. Check if user already exists
  3. Hash password with bcrypt
  4. Create new user in database
  5. Generate JWT token
Output: { success, token, user }
```

**Login Function:**
```javascript
Input: { email, password }
Process:
  1. Find user by email
  2. Verify password
  3. Generate JWT token
Output: { success, token, user }
```

**Get Profile Function:**
```javascript
Input: JWT token (from header)
Process:
  1. Verify token
  2. Fetch user data
Output: { success, user }
```

#### Auth Middleware (middleware/auth.js)

**Functionality:**
- Extracts JWT token from Authorization header
- Verifies token validity
- Attaches user data to request object
- Protects routes from unauthorized access

### 4. Menu Management

#### Menu Controller (controllers/menuController.js)

**Get All Menu Items:**
```javascript
Endpoint: GET /api/menu
Query Params: category, available, search
Process:
  1. Build query filters
  2. Fetch items from database
  3. Populate restaurant data
Output: Array of menu items
```

**Create Menu Item:**
```javascript
Endpoint: POST /api/menu
Auth: Required (restaurant role)
Input: { name, description, category, price, image }
Process:
  1. Validate input
  2. Create menu item
  3. Link to restaurant
Output: Created menu item
```

**Update Menu Item:**
```javascript
Endpoint: PUT /api/menu/:id
Auth: Required (restaurant owner)
Input: Updated fields
Process:
  1. Verify ownership
  2. Update item
Output: Updated menu item
```

**Delete Menu Item:**
```javascript
Endpoint: DELETE /api/menu/:id
Auth: Required (restaurant owner)
Process:
  1. Verify ownership
  2. Delete item
Output: Success message
```

### 5. Order Management

#### Order Controller (controllers/orderController.js)

**Create Order:**
```javascript
Endpoint: POST /api/orders
Auth: Required
Input: {
  items: [{menuItem, quantity, price}],
  deliveryAddress,
  phoneNumber,
  notes,
  totalAmount
}
Process:
  1. Validate items exist and are available
  2. Calculate total amount
  3. Create order in database
  4. Emit Socket.io event for real-time update
  5. Initiate payment (M-Pesa)
Output: Created order
```

**Get User Orders:**
```javascript
Endpoint: GET /api/orders/my-orders
Auth: Required
Process:
  1. Fetch orders for logged-in user
  2. Populate menu item details
  3. Sort by creation date (newest first)
Output: Array of user's orders
```

**Update Order Status:**
```javascript
Endpoint: PUT /api/orders/:id/status
Auth: Required (restaurant/admin)
Input: { status }
Process:
  1. Verify authorization
  2. Update order status
  3. Emit Socket.io event
Output: Updated order
```

### 6. Payment Integration

#### Payment Controller (controllers/paymentController.js)

**M-Pesa STK Push:**
```javascript
Function: initiateMpesaPayment
Input: { phoneNumber, amount, orderId }
Process:
  1. Get M-Pesa access token
  2. Format phone number
  3. Generate timestamp and password
  4. Send STK push request
  5. Store transaction reference
Output: { success, checkoutRequestId }
```

**Payment Callback:**
```javascript
Endpoint: POST /api/payments/mpesa/callback
Process:
  1. Receive M-Pesa callback
  2. Verify transaction
  3. Update order payment status
  4. Emit Socket.io event
Output: Acknowledgment
```

### 7. Real-time Communication

**Socket.io Events:**

```javascript
// Server-side events
'connection': User connects to Socket.io
'disconnect': User disconnects
'orderUpdate': Broadcast order status changes
'newOrder': Notify restaurants of new orders

// Client-side listeners
'orderUpdate': Update order status in UI
'newOrder': Show notification for new order
```

## Frontend Functionality

### 1. Application Structure (App.js)

**Routing:**
```javascript
/ - Home page
/menu - Menu browsing
/cart - Shopping cart
/orders - Order history
/login - User login
/register - User registration
```

**Global State:**
- User authentication (localStorage)
- Shopping cart (localStorage)
- JWT token management

### 2. Pages Functionality

#### Home Page (pages/Home.js)

**Features:**
- Hero section with call-to-action
- Feature highlights (4 cards)
- Popular items showcase (5 categories)
- Registration/Login CTAs

**User Actions:**
- Navigate to menu
- Navigate to registration
- Navigate to login

#### Menu Page (pages/Menu.js)

**Features:**
- Display all available menu items
- Category filtering (All, French Fries, Samosas, etc.)
- Search functionality
- Add to cart functionality
- Quantity adjustment (+/-)
- Cart summary display

**State Management:**
```javascript
- menuItems: Fetched from API
- cart: Stored in localStorage
- category: Current filter
- searchTerm: Search query
```

**User Actions:**
- Filter by category
- Search items
- Add items to cart
- Increase/decrease quantity
- View cart

#### Cart Page (pages/Cart.js)

**Features:**
- Display cart items
- Quantity adjustment
- Item removal
- Delivery details form
- Total calculation (subtotal + delivery fee)
- Order placement

**Calculations:**
```javascript
Subtotal = Sum of (item.price × item.quantity)
Delivery Fee = KES 100 (fixed)
Total = Subtotal + Delivery Fee
```

**User Actions:**
- Update quantities
- Remove items
- Clear cart
- Enter delivery details
- Place order

#### Orders Page (pages/Orders.js)

**Features:**
- Display order history
- Real-time order status updates (Socket.io)
- Order tracking stepper
- Order details display

**Order Statuses:**
1. Pending
2. Confirmed
3. Preparing
4. Out for Delivery
5. Delivered

**Real-time Updates:**
```javascript
// Socket.io connection
const socket = io('http://localhost:5000')

// Listen for order updates
socket.on('orderUpdate', (updatedOrder) => {
  // Update order in state
})
```

#### Login Page (pages/Login.js)

**Features:**
- Email/password form
- Form validation
- Error handling
- Token storage
- Redirect after login

**Process:**
```javascript
1. User enters credentials
2. Submit to /api/auth/login
3. Receive JWT token
4. Store token in localStorage
5. Redirect to /menu
```

#### Register Page (pages/Register.js)

**Features:**
- Multi-field registration form
- Password confirmation
- Form validation
- Error handling
- Auto-login after registration

**Validation:**
- Password length (min 6 characters)
- Password match confirmation
- Email format
- Required fields

### 3. API Integration

**Axios Configuration:**
```javascript
// Base URL
const API_URL = 'http://localhost:5000/api'

// Authenticated requests
axios.get(url, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

**API Calls:**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/menu` - Fetch menu items
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Fetch user orders

### 4. Local Storage Management

**Stored Data:**
```javascript
// Authentication
localStorage.setItem('token', jwt_token)
localStorage.setItem('user', JSON.stringify(user))

// Shopping Cart
localStorage.setItem('cart', JSON.stringify(cartObject))
```

**Cart Structure:**
```javascript
{
  "item_id_1": {
    _id: "item_id_1",
    name: "Masala Fries",
    price: 150,
    quantity: 2,
    category: "french-fries"
  },
  "item_id_2": { ... }
}
```

## Menu Categories Implementation

The system supports 5 food categories as requested:

### 1. French Fries (french-fries)
- Regular fries
- Masala fries
- Cheese fries
- Loaded fries

### 2. Samosas (samosas)
- Beef samosas
- Vegetable samosas
- Chicken samosas
- Fish samosas

### 3. Fresh Juice (fresh-juice)
- Orange juice
- Mango juice
- Passion juice
- Mixed fruit juice
- Watermelon juice

### 4. Pizza (pizza)
- Margherita
- Pepperoni
- Vegetarian
- BBQ Chicken
- Hawaiian

### 5. Ice Cream (ice-cream)
- Vanilla
- Chocolate
- Strawberry
- Mixed flavors
- Sundaes

## Security Features

1. **Password Security:**
   - Bcrypt hashing (10 salt rounds)
   - Passwords never stored in plain text

2. **Authentication:**
   - JWT tokens with expiration
   - Protected routes with middleware
   - Token verification on each request

3. **Input Validation:**
   - Required field validation
   - Email format validation
   - Price minimum validation
   - Mongoose schema validation

4. **CORS Configuration:**
   - Restricted to specific origins
   - Credentials support enabled

## Performance Optimizations

1. **Database:**
   - Indexed fields (email, category)
   - Efficient queries with filters
   - Population for related data

2. **Frontend:**
   - Local storage for cart (reduces API calls)
   - Conditional rendering
   - Lazy loading potential

3. **Real-time:**
   - Socket.io for efficient updates
   - Event-driven architecture

## Error Handling

**Backend:**
```javascript
try {
  // Operation
} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message
  })
}
```

**Frontend:**
```javascript
try {
  // API call
} catch (error) {
  setError(error.response?.data?.message || 'Operation failed')
}
```

## Testing Capabilities

The code is designed to be testable:

1. **Unit Testing:**
   - Controllers can be tested independently
   - Models have validation logic
   - Utility functions are pure

2. **Integration Testing:**
   - API endpoints can be tested with supertest
   - Database operations can be mocked

3. **E2E Testing:**
   - Full user workflows can be automated
   - React components can be tested with React Testing Library

## Deployment Readiness

**Environment Variables:**
- All sensitive data in .env
- Separate development/production configs

**Production Considerations:**
- MongoDB Atlas for cloud database
- Environment-based configurations
- Build optimization for frontend
- HTTPS/SSL support

## Code Quality

1. **Modularity:**
   - Separated concerns (MVC pattern)
   - Reusable components
   - Clear file structure

2. **Readability:**
   - Descriptive variable names
   - Comments where needed
   - Consistent formatting

3. **Maintainability:**
   - DRY principles
   - Single responsibility
   - Easy to extend

## Summary

The BungoEats codebase provides:

✓ **Complete Backend API** - RESTful endpoints for all operations
✓ **Full Frontend UI** - React-based customer interface
✓ **Real-time Features** - Socket.io integration
✓ **Payment Integration** - M-Pesa support
✓ **Security** - JWT authentication, password hashing
✓ **Database** - MongoDB with Mongoose ODM
✓ **5 Menu Categories** - French fries, samosas, juice, pizza, ice cream
✓ **Order Management** - Complete order lifecycle
✓ **User Management** - Registration, login, profiles
✓ **Documentation** - Comprehensive guides

**Status:** Production-ready with proper setup and configuration
