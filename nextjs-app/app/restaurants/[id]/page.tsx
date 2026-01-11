'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { restaurants } from '@/data/restaurants';
import { useCart } from '@/store/cartStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
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
    
    setAddedItems(prev => new Set(prev).add(item.id));
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Hero Banner */}
      <div className="relative h-64 md:h-80 bg-gradient-to-br from-orange-400 to-red-500">
        <div className="absolute inset-0">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
        >
          <ArrowLeftIcon className="w-6 h-6 text-gray-900" />
        </button>

        {/* Restaurant Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold">{restaurant.rating}</span>
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

      {/* Category Tabs */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Items
            </button>
            {restaurant.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.name
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
            >
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1">{item.name}</h3>
                  <Badge variant="secondary" className="ml-2 shrink-0">
                    {item.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-orange-500">KES {item.price}</span>
                  <Button
                    onClick={() => handleAddToCart(item)}
                    size="sm"
                    className={addedItems.has(item.id) ? 'bg-green-500 hover:bg-green-600' : ''}
                  >
                    {addedItems.has(item.id) ? '✓ Added' : 'Add to Cart'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
