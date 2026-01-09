import mongoose, { Schema, Model } from 'mongoose';
import { Order } from '@/types';

const OrderSchema = new Schema<Order>({
  id: { type: String, required: true, unique: true },
  items: [{
    menuItemId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    notes: { type: String },
  }],
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    deliveryType: { type: String, enum: ['pickup', 'delivery'], required: true },
  },
  restaurantId: { type: String, required: true },
  subtotal: { type: Number, required: true },
  deliveryFee: { type: Number, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['cash', 'mpesa', 'card'], required: true },
  status: { 
    type: String, 
    enum: ['placed', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'placed'
  },
  estimatedTime: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const OrderModel: Model<Order> = 
  mongoose.models.Order || mongoose.model<Order>('Order', OrderSchema);

export default OrderModel;
