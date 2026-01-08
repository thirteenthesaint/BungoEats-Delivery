const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide restaurant name'],
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number']
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    lowercase: true
  },
  address: {
    street: String,
    area: String,
    town: { type: String, required: true },
    county: { type: String, default: 'Bungoma' },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  images: {
    logo: String,
    cover: String,
    gallery: [String]
  },
  cuisine: [String], // e.g., ['Fast Food', 'African', 'Continental']
  openingHours: {
    monday: { open: String, close: String, closed: Boolean },
    tuesday: { open: String, close: String, closed: Boolean },
    wednesday: { open: String, close: String, closed: Boolean },
    thursday: { open: String, close: String, closed: Boolean },
    friday: { open: String, close: String, closed: Boolean },
    saturday: { open: String, close: String, closed: Boolean },
    sunday: { open: String, close: String, closed: Boolean }
  },
  deliveryZones: [String], // Areas they deliver to
  minimumOrder: {
    type: Number,
    default: 0
  },
  deliveryFee: {
    type: Number,
    default: 100 // KSh
  },
  freeDeliveryAbove: {
    type: Number,
    default: 500 // KSh
  },
  averageDeliveryTime: {
    type: Number, // in minutes
    default: 30
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  commission: {
    type: Number,
    default: 15 // percentage
  },
  totalOrders: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
