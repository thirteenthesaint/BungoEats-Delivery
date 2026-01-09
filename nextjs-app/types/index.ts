// Restaurant Types
export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  status: 'open' | 'closed';
  phone: string;
  address: string;
  priceLevel: string;
  tags: string[];
  description?: string;
  imageUrl?: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
}

// Menu Item Types
export interface MenuItem {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  available: boolean;
  options?: MenuItemOption[];
}

export interface MenuItemOption {
  id: string;
  name: string;
  choices: string[];
  required: boolean;
}

// Cart Types
export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
  selectedOptions?: Record<string, string>;
}

export interface Cart {
  items: CartItem[];
  restaurantId?: string;
}

// Order Types
export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
}

export interface Customer {
  name: string;
  phone: string;
  address?: string;
  deliveryType: 'pickup' | 'delivery';
}

export type OrderStatus = 
  | 'placed' 
  | 'confirmed' 
  | 'preparing' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'cancelled';

export interface Order {
  id: string;
  items: OrderItem[];
  customer: Customer;
  restaurantId: string;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  paymentMethod: 'cash' | 'mpesa' | 'card';
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  estimatedTime?: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CartQuote {
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
}
