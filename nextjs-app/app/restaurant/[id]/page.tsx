'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { restaurants } from '@/data/restaurants';
import { useCart } from '@/store/cartStore';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { StarIcon, ClockIcon, MapPinIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

export default function RestaurantPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const restaurant = restaurants.find((r) => r.id === params.id);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Restaurant not found</h1>
          <Button onClick={() => router.push('/')}>Go back home</Button>
        </div>
      </div>
    );
  }

  const allMenuItems = restaurant.categories.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, category: cat.name }))
  );

  const filteredItems =
    selectedCategory === 'all'
      ? allMenuItems
      : allMenuItems.filter((item) => item.category === selectedCategory);

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
    });
    
    setAddedItems(new Set(addedItems).add(item.id));
    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>
      </div>

      {/* Restaurant Hero */}
      <div className="relative h-64 bg-gradient-to-r from-green-600 to-green-700">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-8 text-white">
          <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <StarIcon className="w-5 h-5" />
              <span>{restaurant.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="w-5 h-5" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPinIcon className="w-5 h-5" />
              <span>Bungoma</span>
            </div>
            <span className="font-semibold">{restaurant.priceRange}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {restaurant.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Menu content will go here */}
      </div>
    </div>
  );
}
