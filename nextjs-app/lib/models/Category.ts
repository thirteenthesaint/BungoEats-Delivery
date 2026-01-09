import mongoose, { Schema, Model } from 'mongoose';
import { Category } from '@/types';

const CategorySchema = new Schema<Category>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
}, {
  timestamps: true,
});

const CategoryModel: Model<Category> = 
  mongoose.models.Category || mongoose.model<Category>('Category', CategorySchema);

export default CategoryModel;
