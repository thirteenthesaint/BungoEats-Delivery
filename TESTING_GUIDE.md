# BungoEats Testing Guide

This document provides comprehensive testing instructions for the BungoEats food delivery system.

## Testing Overview

The BungoEats system has been designed with the following components that require testing:

1. **Backend API** - RESTful endpoints for authentication, menu, orders, and payments
2. **Frontend UI** - React-based user interface
3. **Database** - MongoDB data persistence
4. **Real-time Features** - Socket.io for live order updates
5. **Integration** - End-to-end user workflows

## Pre-Testing Setup

### 1. Ensure All Services Are Running

**Start MongoDB:**
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

**Start Backend Server:**
```bash
cd C:/Users/HP/Documents/BungoEats_Delivery_System/backend
node server.js
```

Expected output:
```
Server running on port 5000
MongoDB connected successfully
```

**Start Frontend Development Server:**
```bash
cd C:/Users/HP/Documents/BungoEats_Delivery_System/frontend
npm start
```

Expected output:
```
Compiled successfully!
You can now view frontend in the browser.
Local: http://localhost:3000
```

## Backend API Testing

### Manual Testing with Browser/Postman

#### 1. Test Server Health

**Endpoint:** `GET http://localhost:5000/`

**Expected Response:**
```json
{
  "message": "BungoEats API is running",
  "version": "1.0.0"
}
```

#### 2. Test User Registration

**Endpoint:** `POST http://localhost:5000/api/auth/register`

**Request Body:**
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123",
  "phone": "0712345678",
  "address": "Bungoma Town, Kenya"
}
```

**Expected Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "role": "customer"
  }
}
```

#### 3. Test User Login

**Endpoint:** `POST http://localhost:5000/api/auth/login`

**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "test123"
}
```

**Expected Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

#### 4. Test Get Menu Items

**Endpoint:** `GET http://localhost:5000/api/menu`

**Expected Response:**
```json
[
  {
    "_id": "...",
    "name": "Masala Fries",
    "description": "Crispy fries with masala seasoning",
    "category": "french-fries",
    "price": 150,
    "available": true
  }
]
```

#### 5. Test Create Order (Protected Route)

**Endpoint:** `POST http://localhost:5000/api/orders`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "items": [
    {
      "menuItem": "<menu_item_id>",
      "quantity": 2,
      "price": 150
    }
  ],
  "deliveryAddress": "Bungoma Town, Main Street",
  "phoneNumber": "0712345678",
  "notes": "Please call when you arrive",
  "totalAmount": 400
}
```

**Expected Response:**
```json
{
  "success": true,
  "order": {
    "_id": "...",
    "customer": "...",
    "items": [...],
    "status": "pending",
    "totalAmount": 400
  }
}
```

#### 6. Test Get User Orders

**Endpoint:** `GET http://localhost:5000/api/orders/my-orders`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Expected Response:**
```json
[
  {
    "_id": "...",
    "items": [...],
    "status": "pending",
    "totalAmount": 400,
    "createdAt": "2026-01-05T..."
  }
]
```

### Automated Testing Script

Create a test script to verify all endpoints:

**File:** `backend/test/api.test.js`

```javascript
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';
let authToken = '';
let userId = '';
let menuItemId = '';
let orderId = '';

async function runTests() {
  console.log('Starting API Tests...\n');

  try {
    // Test 1: Register User
    console.log('Test 1: User Registration');
    const registerRes = await axios.post(`${BASE_URL}/auth/register`, {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'test123',
      phone: '0712345678',
      address: 'Bungoma Town'
    });
    authToken = registerRes.data.token;
    userId = registerRes.data.user._id;
    console.log('✓ User registered successfully\n');

    // Test 2: Login
    console.log('Test 2: User Login');
    const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
      email: registerRes.data.user.email,
      password: 'test123'
    });
    console.log('✓ User logged in successfully\n');

    // Test 3: Get Menu
    console.log('Test 3: Get Menu Items');
    const menuRes = await axios.get(`${BASE_URL}/menu`);
    console.log(`✓ Retrieved ${menuRes.data.length} menu items\n`);

    // Test 4: Create Order (if menu items exist)
    if (menuRes.data.length > 0) {
      console.log('Test 4: Create Order');
      menuItemId = menuRes.data[0]._id;
      const orderRes = await axios.post(
        `${BASE_URL}/orders`,
        {
          items: [{
            menuItem: menuItemId,
            quantity: 2,
            price: menuRes.data[0].price
          }],
          deliveryAddress: 'Test Address',
          phoneNumber: '0712345678',
          totalAmount: menuRes.data[0].price * 2 + 100
        },
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );
      orderId = orderRes.data.order._id;
      console.log('✓ Order created successfully\n');

      // Test 5: Get User Orders
      console.log('Test 5: Get User Orders');
      const ordersRes = await axios.get(`${BASE_URL}/orders/my-orders`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      console.log(`✓ Retrieved ${ordersRes.data.length} orders\n`);
    }

    console.log('All tests passed! ✓');
  } catch (error) {
    console.error('Test failed:', error.response?.data || error.message);
  }
}

runTests();
```

**Run the test:**
```bash
cd backend
node test/api.test.js
```

## Frontend Testing

### Manual UI Testing Checklist

#### Homepage Testing
- [ ] Navigate to `http://localhost:3000`
- [ ] Verify homepage loads correctly
- [ ] Check all sections are visible (Hero, Features, Popular Items, CTA)
- [ ] Click "Order Now" button - should navigate to `/menu`
- [ ] Click "Sign Up" button - should navigate to `/register`
- [ ] Click "Login" button - should navigate to `/login`
- [ ] Verify all emoji icons display correctly

#### Registration Testing
- [ ] Navigate to `/register`
- [ ] Fill in all required fields
- [ ] Submit form with valid data
- [ ] Verify successful registration and redirect to `/menu`
- [ ] Check token is saved in localStorage
- [ ] Test validation: Try submitting with mismatched passwords
- [ ] Test validation: Try submitting with short password (<6 chars)
- [ ] Test validation: Try registering with existing email

#### Login Testing
- [ ] Navigate to `/login`
- [ ] Enter valid credentials
- [ ] Verify successful login and redirect
- [ ] Test with invalid credentials
- [ ] Verify error message displays
- [ ] Click "Register here" link - should navigate to `/register`

#### Menu Testing
- [ ] Navigate to `/menu`
- [ ] Verify menu items load from backend
- [ ] Test category filter (All, French Fries, Samosas, etc.)
- [ ] Test search functionality
- [ ] Click "Add to Cart" on an item
- [ ] Verify cart counter updates
- [ ] Increase/decrease quantity using +/- buttons
- [ ] Verify cart summary shows correct total
- [ ] Click "View Cart & Checkout" button

#### Cart Testing
- [ ] Navigate to `/cart` with items
- [ ] Verify all cart items display correctly
- [ ] Test quantity increase/decrease
- [ ] Test item removal
- [ ] Test "Clear Cart" button
- [ ] Fill in delivery address and phone number
- [ ] Add special instructions
- [ ] Verify total calculation (subtotal + delivery fee)
- [ ] Click "Place Order" without login - should redirect to login
- [ ] Login and place order
- [ ] Verify order is created and cart is cleared
- [ ] Verify redirect to `/orders`

#### Orders Testing
- [ ] Navigate to `/orders` (must be logged in)
- [ ] Verify order history displays
- [ ] Check order details (items, address, total)
- [ ] Verify order status chip displays correctly
- [ ] Check order tracking stepper
- [ ] Verify order date/time displays correctly

#### Navigation Testing
- [ ] Test all navigation links in navbar
- [ ] Verify active route highlighting
- [ ] Test browser back/forward buttons
- [ ] Test direct URL navigation

### Browser Compatibility Testing

Test the application in multiple browsers:

- [ ] Google Chrome (latest)
- [ ] Microsoft Edge (latest)
- [ ] Mozilla Firefox (latest)
- [ ] Safari (if on macOS)

### Responsive Design Testing

Test at different screen sizes:

- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

## Integration Testing

### End-to-End User Journey

**Scenario 1: New Customer Orders Food**

1. Open `http://localhost:3000`
2. Click "Sign Up"
3. Register with new account
4. Browse menu
5. Add 2-3 items to cart
6. Go to cart
7. Fill delivery details
8. Place order
9. View order in orders page
10. Verify order appears with "pending" status

**Expected Result:** Order successfully created and visible in order history

**Scenario 2: Returning Customer**

1. Open `http://localhost:3000`
2. Click "Login"
3. Login with existing credentials
4. Navigate to orders page
5. Verify previous orders are visible
6. Add new items to cart
7. Complete checkout

**Expected Result:** User can access order history and place new orders

## Real-time Features Testing

### Socket.io Testing

1. Open two browser windows
2. Login as different users in each window
3. Place an order in window 1
4. Verify order appears in real-time in window 2 (if viewing orders page)
5. Update order status from backend
6. Verify status updates in real-time in frontend

**Test Socket Connection:**
```javascript
// Open browser console on orders page
// Check for Socket.io connection logs
```

## Database Testing

### Verify Data Persistence

**Using MongoDB Compass or Shell:**

```javascript
// Connect to database
use bungoeats

// Check users collection
db.users.find().pretty()

// Check menu items
db.menuitems.find().pretty()

// Check orders
db.orders.find().pretty()

// Verify indexes
db.users.getIndexes()
db.orders.getIndexes()
```

### Data Validation Testing

- [ ] Try creating user with duplicate email - should fail
- [ ] Try creating order without authentication - should fail
- [ ] Try creating menu item with negative price - should fail
- [ ] Verify required fields are enforced

## Performance Testing

### Load Testing (Basic)

1. Create multiple users
2. Place multiple orders simultaneously
3. Monitor server response times
4. Check for memory leaks

### Frontend Performance

- [ ] Check page load times (should be < 3 seconds)
- [ ] Verify images load efficiently
- [ ] Test with slow 3G network simulation
- [ ] Check bundle size (should be optimized)

## Security Testing

### Authentication Testing

- [ ] Try accessing protected routes without token
- [ ] Try using expired/invalid token
- [ ] Verify passwords are hashed in database
- [ ] Test JWT token expiration

### Input Validation

- [ ] Try SQL injection in input fields
- [ ] Try XSS attacks in text inputs
- [ ] Verify CORS is properly configured
- [ ] Test rate limiting (if implemented)

## Common Issues and Solutions

### Issue 1: Menu Items Not Loading
**Symptoms:** Empty menu page
**Solution:** 
- Check backend is running
- Verify MongoDB has menu items
- Check browser console for errors
- Verify API endpoint URL is correct

### Issue 2: Orders Not Creating
**Symptoms:** Error when placing order
**Solution:**
- Verify user is logged in
- Check JWT token in localStorage
- Verify all required fields are filled
- Check backend logs for errors

### Issue 3: Real-time Updates Not Working
**Symptoms:** Order status doesn't update automatically
**Solution:**
- Check Socket.io connection in browser console
- Verify backend Socket.io is configured
- Check firewall/network settings

## Test Results Documentation

Create a test results file:

**File:** `TEST_RESULTS.md`

```markdown
# Test Results - BungoEats

**Date:** [Date]
**Tester:** [Name]
**Version:** 1.0.0

## Backend API Tests
- [ ] User Registration: PASS/FAIL
- [ ] User Login: PASS/FAIL
- [ ] Get Menu: PASS/FAIL
- [ ] Create Order: PASS/FAIL
- [ ] Get Orders: PASS/FAIL

## Frontend Tests
- [ ] Homepage: PASS/FAIL
- [ ] Registration: PASS/FAIL
- [ ] Login: PASS/FAIL
- [ ] Menu: PASS/FAIL
- [ ] Cart: PASS/FAIL
- [ ] Orders: PASS/FAIL

## Integration Tests
- [ ] End-to-End Order Flow: PASS/FAIL
- [ ] Real-time Updates: PASS/FAIL

## Notes
[Add any observations or issues found]
```

## Conclusion

This testing guide covers:
- ✓ Backend API testing
- ✓ Frontend UI testing
- ✓ Integration testing
- ✓ Database testing
- ✓ Security testing
- ✓ Performance testing

For production deployment, consider:
- Automated testing with Jest/Mocha
- Continuous Integration (CI/CD)
- Load testing with tools like Apache JMeter
- Security audits
- User acceptance testing (UAT)
