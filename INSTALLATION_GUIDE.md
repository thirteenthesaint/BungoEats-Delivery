# BungoEats Installation Guide

This guide will walk you through setting up the BungoEats food delivery system on your local machine or server.

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Installing Prerequisites](#installing-prerequisites)
3. [Database Setup](#database-setup)
4. [Backend Installation](#backend-installation)
5. [Frontend Installation](#frontend-installation)
6. [Running the Application](#running-the-application)
7. [Troubleshooting](#troubleshooting)

## System Requirements

### Minimum Requirements
- **Operating System**: Windows 10/11, macOS 10.14+, or Linux (Ubuntu 18.04+)
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free space
- **Internet**: Stable connection for package downloads

### Software Requirements
- Node.js v14.0.0 or higher
- MongoDB v4.4 or higher (or MongoDB Atlas account)
- npm v6.0.0 or higher (comes with Node.js)
- Git (optional, for version control)

## Installing Prerequisites

### 1. Install Node.js

**Windows:**
1. Download Node.js from https://nodejs.org/
2. Run the installer (.msi file)
3. Follow the installation wizard
4. Verify installation:
```bash
node --version
npm --version
```

**macOS:**
```bash
# Using Homebrew
brew install node

# Verify installation
node --version
npm --version
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 2. Install MongoDB

**Option A: Local Installation**

**Windows:**
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Run the installer
3. Choose "Complete" installation
4. Install MongoDB as a service
5. Start MongoDB service from Services panel

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier available)
4. Get your connection string
5. Whitelist your IP address

## Database Setup

### Local MongoDB

1. Start MongoDB service (if not already running)
2. The database will be created automatically when the application starts
3. Default connection: `mongodb://localhost:27017/bungoeats`

### MongoDB Atlas

1. Log in to MongoDB Atlas
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Use this string in your `.env` file

## Backend Installation

### Step 1: Navigate to Backend Directory

```bash
cd C:/Users/HP/Documents/BungoEats_Delivery_System/backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- socket.io
- axios

### Step 3: Create Environment File

Create a file named `.env` in the backend directory:

```bash
# On Windows (Command Prompt)
type nul > .env

# On macOS/Linux
touch .env
```

Add the following content to `.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/bungoeats
# For MongoDB Atlas, use:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bungoeats?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=30d

# M-Pesa Configuration (Optional - for payment integration)
MPESA_CONSUMER_KEY=your_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
MPESA_PASSKEY=your_mpesa_passkey
MPESA_SHORTCODE=your_business_shortcode
MPESA_ENVIRONMENT=sandbox
# Use 'sandbox' for testing, 'production' for live

# CORS Configuration
CLIENT_URL=http://localhost:3000
```

**Important Security Notes:**
- Change `JWT_SECRET` to a random, secure string
- Never commit `.env` file to version control
- Use strong, unique values in production

### Step 4: Verify Backend Installation

```bash
node server.js
```

You should see:
```
Server running on port 5000
MongoDB connected successfully
```

## Frontend Installation

### Step 1: Navigate to Frontend Directory

```bash
cd C:/Users/HP/Documents/BungoEats_Delivery_System/frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- react
- react-dom
- react-router-dom
- @mui/material
- @mui/icons-material
- @emotion/react
- @emotion/styled
- axios
- socket.io-client

### Step 3: Configure API Endpoint (Optional)

If your backend is running on a different port or domain, update the API URLs in the frontend files:

1. Open `src/pages/Menu.js`, `Cart.js`, `Orders.js`, `Login.js`, `Register.js`
2. Find `http://localhost:5000`
3. Replace with your backend URL if different

### Step 4: Verify Frontend Installation

```bash
npm start
```

The application should open in your browser at `http://localhost:3000`

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd C:/Users/HP/Documents/BungoEats_Delivery_System/backend
node server.js
```

**Terminal 2 - Frontend:**
```bash
cd C:/Users/HP/Documents/BungoEats_Delivery_System/frontend
npm start
```

### Production Mode

**Backend:**
```bash
cd backend
NODE_ENV=production node server.js
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve the build folder using a static server
npx serve -s build -l 3000
```

## Initial Data Setup

### Create Sample Menu Items

You can use the following script to populate initial menu items:

```bash
cd backend
node scripts/seedMenu.js
```

(Note: You'll need to create this script or manually add items through the API)

### Create Admin User

1. Register through the frontend at `/register`
2. Manually update the user role in MongoDB:

```javascript
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "admin@bungoeats.com" },
  { $set: { role: "admin" } }
)
```

## Testing the Installation

### 1. Test Backend API

Open a browser or use curl:

```bash
# Test server is running
curl http://localhost:5000/api/menu

# Should return an empty array or menu items
```

### 2. Test Frontend

1. Open browser to `http://localhost:3000`
2. You should see the BungoEats homepage
3. Try navigating to different pages
4. Test registration and login

### 3. Test Real-time Features

1. Open two browser windows
2. Login as different users
3. Place an order in one window
4. Check if order appears in real-time in the other window

## Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Ensure MongoDB service is running
- Check if port 27017 is available
- Verify MONGODB_URI in .env file

**2. Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
- Change PORT in .env file
- Or kill the process using the port:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # macOS/Linux
  lsof -ti:5000 | xargs kill -9
  ```

**3. npm Install Fails**
```
Error: EACCES: permission denied
```
**Solution:**
- Run with administrator/sudo privileges
- Or fix npm permissions:
  ```bash
  npm config set prefix ~/.npm-global
  export PATH=~/.npm-global/bin:$PATH
  ```

**4. CORS Errors**
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:**
- Ensure backend CORS is configured correctly
- Check CLIENT_URL in backend .env matches frontend URL
- Verify frontend is making requests to correct backend URL

**5. JWT Token Errors**
```
Error: jwt malformed
```
**Solution:**
- Clear browser localStorage
- Re-login to get new token
- Verify JWT_SECRET is set in .env

### Getting Help

If you encounter issues not covered here:

1. Check the console logs (both browser and terminal)
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check MongoDB connection and data
5. Review the README.md for additional information

## Next Steps

After successful installation:

1. **Customize the Application**
   - Update branding and colors
   - Add your restaurant partners
   - Configure payment methods

2. **Set Up M-Pesa Integration**
   - Register for Daraja API
   - Configure M-Pesa credentials
   - Test payment flow

3. **Deploy to Production**
   - Choose hosting platform (Heroku, Railway, AWS, etc.)
   - Set up production database
   - Configure domain and SSL

4. **Monitor and Maintain**
   - Set up error logging
   - Monitor performance
   - Regular backups

## Security Checklist

Before going to production:

- [ ] Change all default passwords
- [ ] Use strong JWT_SECRET
- [ ] Enable HTTPS/SSL
- [ ] Set up rate limiting
- [ ] Configure proper CORS settings
- [ ] Enable MongoDB authentication
- [ ] Set up regular backups
- [ ] Implement input validation
- [ ] Add security headers
- [ ] Set up monitoring and alerts

---

**Installation Support**: support@bungoeats.co.ke  
**Documentation**: See README.md for detailed API documentation
