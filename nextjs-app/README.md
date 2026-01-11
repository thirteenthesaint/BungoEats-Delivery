# BungoEats Delivery System

A full-featured food delivery application built with Next.js 15, TypeScript, MongoDB, and Tailwind CSS.

## Live Deployment

🚀 **Live URL**: [https://bungo-eats-delivery.vercel.app/](https://bungo-eats-delivery.vercel.app/)

## Features

- ✅ Restaurant browsing with search and category filters
- ✅ Menu viewing with detailed item information
- ✅ Shopping cart functionality
- ✅ Checkout process with customer information and delivery address
- ✅ Multiple payment options (Cash, M-Pesa, Card)
- ✅ Order confirmation and tracking
- ✅ Order history by phone number
- ✅ Admin dashboard for order management
- ✅ Responsive design with mobile-first approach

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Deployment**: Vercel

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL=mongodb+srv://FabcR8r:TR4NSP4R3NT@bungoeats.hgfaw40.mongodb.net/bungoeats?retryWrites=true&w=majority

# API Configuration
NEXT_PUBLIC_API_URL=https://bungo-eats-delivery.vercel.app/api

# Admin Authentication
ADMIN_TOKEN=dev_admin_token_12345

# App Configuration
NEXT_PUBLIC_APP_NAME=BungoEats
NEXT_PUBLIC_DELIVERY_FEE=100
NEXT_PUBLIC_TAX_RATE=0.16
```

## Admin Credentials

- **Admin URL**: [https://bungo-eats-delivery.vercel.app/admin](https://bungo-eats-delivery.vercel.app/admin)
- **Admin Token**: `dev_admin_token_12345`

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env.local` file with environment variables
4. Seed the database:
   ```bash
   npm run seed
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000)

## Deployment

The application is deployed on Vercel. To deploy:

1. Push changes to GitHub
2. Vercel automatically deploys from the main branch
3. Configure environment variables in Vercel dashboard
4. Ensure MongoDB Atlas allows connections from Vercel (0.0.0.0/0)

## Project Structure

- `/app` - Next.js app directory with pages and API routes
- `/lib` - Database models and utilities
- `/scripts` - Database seeding scripts
- `/public` - Static assets
