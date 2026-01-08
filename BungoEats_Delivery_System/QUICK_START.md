# 🚀 BungoEats Quick Start Guide

## What is BungoEats?

BungoEats is a complete food delivery platform for Bungoma County, Kenya. It connects restaurants like **SnackIt!** with customers, enabling easy online ordering and delivery tracking.

## 🎯 Features

- ✅ Browse menu from SnackIt restaurant
- ✅ Add items to cart
- ✅ Place orders with M-Pesa payment
- ✅ Real-time order tracking
- ✅ User authentication
- ✅ Responsive design (mobile & desktop)

## 💻 Technology Stack

**Frontend:** React + Material-UI  
**Backend:** Node.js + Express  
**Database:** MongoDB  
**Real-time:** Socket.io  
**Payment:** M-Pesa Integration  

## ⚡ Quick Setup (5 Minutes)

### Step 1: Install Node.js

Double-click the downloaded file:
```
C:\Users\HP\Downloads\node-v24.12.0-x64.msi
```

Follow the installer, accept defaults, and click "Install".

### Step 2: Setup MongoDB Atlas (Free Cloud Database)

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. Create a FREE cluster (M0)
4. Create database user:
   - Username: `bungoeats`
   - Password: `bungoeats123` (or your choice)
5. Network Access: Add IP `0.0.0.0/0` (allow all)
6. Click "Connect" → "Connect your application"
7. Copy connection string (looks like: `mongodb+srv://...`)

### Step 3: Configure Backend

Open PowerShell and run:

```powershell
cd C:\Users\HP\Documents\BungoEats_Delivery_System\backend
npm install
```

Create `.env` file in backend folder:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=bungoeats_secret_key_2026
FRONTEND_URL=http://localhost:3000
```

### Step 4: Configure Frontend

```powershell
cd ..\frontend
npm install
```

### Step 5: Seed Database with SnackIt Menu

```powershell
cd ..\backend
node seedSnackIt.js
```

You should see:
```
✓ Connected to MongoDB
✓ Created restaurant: SnackIt!
✓ Created 8 menu items
✅ Database seeded successfully!
```

### Step 6: Run the Application

**Open 2 PowerShell windows:**

**Window 1 - Backend:**
```powershell
cd C:\Users\HP\Documents\BungoEats_Delivery_System\backend
npm start
```

**Window 2 - Frontend:**
```powershell
cd C:\Users\HP\Documents\BungoEats_Delivery_System\frontend
npm start
```

### Step 7: Open in Browser

The app will automatically open at: **http://localhost:3000**

## 🍔 Using the App

1. **Browse Menu:** See SnackIt items (Smocha, Shawarma, etc.)
2. **Register:** Create an account
3. **Add to Cart:** Click items to add
4. **Checkout:** Enter delivery details
5. **Track Order:** See real-time status updates

## 👨‍🍳 SnackIt Restaurant

The app includes **SnackIt!** as a demo restaurant:

**Menu Items:**
- Smocha (Kes 150) - Smokie + Chapati
- Shawarma (Kes 200) - Spiced meat wrap
- Mushkaki (Kes 180) - Grilled skewers
- Fresh Juice (Kes 100) - Natural juices
- Yoghurt (Kes 80) - Homemade yoghurt
- French Fries (Kes 120) - Crispy fries
- Pizza Slice (Kes 250) - Cheesy pizza
- Ice Cream (Kes 150) - Creamy ice cream

**Reference:** https://v0-snack-it.vercel.app/

## 🔗 GitHub Repository

**URL:** https://github.com/thirteenthesaint/BungoEats-Delivery

To push your code:
```powershell
cd C:\Users\HP\Documents\BungoEats_Delivery_System
.\push_to_github.ps1
```

## 🌐 Deploy to Production

### Option 1: Vercel + Railway (Recommended)

**Backend (Railway):**
1. Go to https://railway.app
2. Sign in with GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Select `BungoEats-Delivery`
5. Set root directory: `backend`
6. Add environment variables (from .env)
7. Deploy!

**Frontend (Vercel):**
1. Go to https://vercel.com
2. "Import Project" → GitHub
3. Select `BungoEats-Delivery`
4. Root directory: `frontend`
5. Add env: `REACT_APP_API_URL=<railway-backend-url>`
6. Deploy!

### Option 2: Render (Full Stack)

1. Go to https://render.com
2. Create Web Service (backend)
3. Create Static Site (frontend)
4. Configure and deploy

## ❓ Troubleshooting

**"npm not found"**
- Restart PowerShell after installing Node.js
- Or restart computer

**"Port 5000 already in use"**
```powershell
netstat -ano | findstr :5000
taskkill /PID <number> /F
```

**"Cannot connect to MongoDB"**
- Check MONGODB_URI in .env
- Ensure IP 0.0.0.0/0 is whitelisted in Atlas
- Check username/password

**"Module not found"**
```powershell
rm -r node_modules
npm install
```

## 📞 Support

- **GitHub Issues:** https://github.com/thirteenthesaint/BungoEats-Delivery/issues
- **Documentation:** See README.md, INSTALLATION_GUIDE.md

## 🎉 Success!

You now have a fully functional food delivery platform running locally!

**Next Steps:**
1. Customize branding and colors
2. Add more restaurants
3. Deploy to production
4. Launch in Bungoma County!

---

**Made with ❤️ for Bungoma County, Kenya**
