import React from 'react';
import { CartItem as CartItemType, useCart } from '@/store/cartStore';
import { Plus, Minus, Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    updateQuantity(item.id, item.quantity - 1);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
      {/* Item Info */}
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900">{item.name}</h4>
        <p className="text-sm text-gray-500">{item.restaurantName}</p>
        <p className="text-sm font-semibold text-red-600 mt-1">KSh {item.price}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleDecrease}
          className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </button>
        
        <span className="font-semibold min-w-[2rem] text-center">{item.quantity}</span>
        
        <button
          onClick={handleIncrease}
          className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
        aria-label="Remove item"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
