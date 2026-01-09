import mongoose, { Schema, Model } from 'mongoose';
import { Restaurant } from '@/types';

const RestaurantSchema = new Schema<Restaurant>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  rating: { type: Number, required: true, default: 0 },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  priceLevel: { type: String, required: true },
  tags: [{ type: String }],
  description: { type: String },
  imageUrl: { type: String },
}, {
  timestamps: true,
});

const RestaurantModel: Model<Restaurant> = 
  mongoose.models.Restaurant || mongoose.model<Restaurant>('Restaurant', RestaurantSchema);

export default RestaurantModel;
