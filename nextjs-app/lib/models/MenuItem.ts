import mongoose, { Schema, Model } from 'mongoose';
import { MenuItem } from '@/types';

const MenuItemSchema = new Schema<MenuItem>({
  id: { type: String, required: true, unique: true },
  restaurantId: { type: String, required: true },
  categoryId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  available: { type: Boolean, default: true },
  options: [{
    id: String,
    name: String,
    choices: [String],
    required: Boolean,
  }],
}, {
  timestamps: true,
});

const MenuItemModel: Model<MenuItem> = 
  mongoose.models.MenuItem || mongoose.model<MenuItem>('MenuItem', MenuItemSchema);

export default MenuItemModel;
