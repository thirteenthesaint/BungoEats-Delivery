import React from 'react';
import { MenuItem } from '@/types';
import Card from './ui/Card';
import PrimaryButton from './ui/PrimaryButton';
import { useCart } from '@/store/cartStore';
import { Plus, Minus } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  restaurantId: string;
  restaurantName: string;
}

export default function MenuItemCard({ item, restaurantId, restaurantName }: MenuItemCardProps) {
  const { items, addItem, removeItem } = useCart();
  
  const cartItem = items.find(i => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.imageUrl || '',
      restaurantId,
      restaurantName
    });
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <Card className="flex flex-col h-full">
      {/* Menu Item Image */}
      {item.imageUrl && (
        <div className="mb-4 -mx-5 -mt-5 md:-mx-7 md:-mt-7">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-48 object-cover rounded-t-2xl md:rounded-t-3xl"
          />
        </div>
      )}

      {/* Menu Item Info */}
      <div className="flex-1 space-y-2">
        <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
        
        {item.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
        )}

        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-bold text-red-600">KSh {item.price}</span>
          
          {!item.available && (
            <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs font-semibold rounded-full">
              Unavailable
            </span>
          )}
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="mt-4">
        {quantity === 0 ? (
          <PrimaryButton
            onClick={handleAdd}
            fullWidth
            disabled={!item.available}
          >
            Add to Cart
          </PrimaryButton>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handleRemove}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={handleAdd}
              className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}
