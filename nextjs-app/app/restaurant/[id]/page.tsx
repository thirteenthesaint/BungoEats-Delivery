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
    
    setAddedItems(prev => new Set(prev).add(item.id));
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }, 2000);
  };

  const saveCart = (newCart: {[key: string]: number}) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
    localStorage.setItem('restaurantId', params.id as string);
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

      {/* Menu Items */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Menu content will go here */}
      </div>
    </div>
  );
}

function addToCart(itemId: string) {
  const cart = {};
  const setCart = () => {};
  const saveCart = () => {};
  const addToCart = (itemId: string) => {
    const newCart = { ...cart, [itemId]: ((cart as Record<string, number>)[itemId] || 0) + 1 };
    setCart(newCart);
    saveCart(newCart);
  };

  const removeFromCart = (itemId: string) => {
    const newCart = { ...cart } as Record<string, number>;
    if (newCart[itemId] > 1) {
      newCart[itemId]--;
    } else {
      delete newCart[itemId];
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const categories = ['All', ...new Set(menuItems.map(item => item.category))];
  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const cartItemCount = Object.values(cart).reduce((sum, count) => sum + count, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Restaurant not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-xl font-bold text-gray-900">{restaurant.name}</h1>
            </div>
            <Link href="/cart" className="relative">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Restaurant Info */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start space-x-6">
            <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={restaurant.image || '/placeholder-restaurant.jpg'}
                alt={restaurant.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{restaurant.name}</h2>
              <p className="text-gray-600 mb-3">{restaurant.description}</p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium text-gray-900">{restaurant.rating}</span>
                </div>
                <span className="text-gray-600">{restaurant.deliveryTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-t border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-2 overflow-x-auto py-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          {filteredItems.map(item => (
            <div key={item._id} className="bg-white rounded-lg shadow-sm p-4 flex items-start space-x-4">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={item.image || '/placeholder-food.jpg'}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                <p className="text-red-600 font-bold text-lg">KSh {item.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                {cart[item._id] ? (
                  <>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">{cart[item._id]}</span>
                    <button
                      onClick={() => addToCart(item._id)}
                      className="w-8 h-8 rounded-full bg-red-600 text-white hover:bg-red-700 flex items-center justify-center"
                    >
                      +
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => addToCart(item._id)}
                    disabled={!item.available}
                    className="px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
                  >
                    {item.available ? 'Add' : 'Unavailable'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-6 left-0 right-0 px-4 sm:px-6 lg:px-8 z-50">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/cart"
              className="block w-full bg-red-600 text-white py-4 rounded-full shadow-lg hover:bg-red-700 transition-colors text-center font-bold"
            >
              View Cart ({cartItemCount} items)
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
