# BungoEats Deployment Guide

## Quick Start - Local Development

### Prerequisites
1. Node.js v14+ installed
2. MongoDB Atlas account (free tier) OR local MongoDB
3. Git installed

### Step 1: Clone Repository
```bash
git clone https://github.com/thirteenthesaint/BungoEats-Delivery.git
cd BungoEats-Delivery
```

### Step 2: Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env file with your MongoDB URI and other credentials
```

### Step 3: Setup Frontend
```bash
cd ../frontend
npm install
```

### Step 4: Seed Database with SnackIt Menu
```bash
cd ../backend
node seedSnackIt.js
```

### Step 5: Run Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# App opens on http://localhost:3000
```

## Production Deployment

### Option 1: Vercel (Frontend) + Railway (Backend)

#### Deploy Backend to Railway:
1. Go to https://railway.app
2. Connect GitHub repository
3. Select `backend` folder as root
4. Add environment variables from .env.example
5. Deploy

#### Deploy Frontend to Vercel:
1. Go to https://vercel.com
2. Import GitHub repository
3. Set root directory to `frontend`
4. Add environment variable: `REACT_APP_API_URL=<your-railway-backend-url>`
5. Deploy

### Option 2: Render (Full Stack)
1. Create Web Service for backend
2. Create Static Site for frontend
3. Configure environment variables
4. Deploy both

## MongoDB Atlas Setup (Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Whitelist IP: 0.0.0.0/0 (allow from anywhere)
5. Get connection string
6. Update MONGODB_URI in .env

## SnackIt Integration

The application includes SnackIt restaurant as a demo:
- **Restaurant:** SnackIt! - Taste the Goodness, Delivered
- **Menu Items:** Smocha, Shawarma, Mushkaki, Yoghurt, Fresh Juice
- **Reference:** https://v0-snack-it.vercel.app/

## Testing

### Test Backend API:
```bash
curl http://localhost:5000/api/health
```

### Test Frontend:
Open http://localhost:3000 in browser

## Troubleshooting

**Port already in use:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**MongoDB connection error:**
- Check MONGODB_URI in .env
- Ensure MongoDB is running (if local)
- Check network access in MongoDB Atlas

**CORS errors:**
- Update FRONTEND_URL in backend .env
- Check backend CORS configuration

## Live Demo URLs

- **Frontend:** [Will be added after deployment]
- **Backend API:** [Will be added after deployment]
- **GitHub:** https://github.com/thirteenthesaint/BungoEats-Delivery
