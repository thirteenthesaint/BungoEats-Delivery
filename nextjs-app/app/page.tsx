'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { restaurants, getAllCategories } from '@/data/restaurants';
import { useAuth } from '@/contexts/AuthContext';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { MagnifyingGlassIcon, StarIcon, ClockIcon, MapPinIcon, HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const { user, addFavourite, removeFavourite } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = getAllCategories();

  const handleFavoriteToggle = async (e: React.MouseEvent, restaurantId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      alert('Please login to add favorites');
      return;
    }
    
    try {
      if (user.favourites.includes(restaurantId)) {
        await removeFavourite(restaurantId);
      } else {
        await addFavourite(restaurantId);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const filteredRestaurants = restaurants
    .filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           restaurant.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || 
                             restaurant.tags.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Sort favorites first if user is logged in
      if (user) {
        const aIsFav = user.favourites.includes(a.id);
        const bIsFav = user.favourites.includes(b.id);
        if (aIsFav && !bIsFav) return -1;
        if (!aIsFav && bIsFav) return 1;
      }
      
      // Then sort by priority (lower number = higher priority)
      if (a.priority && !b.priority) return -1;
      if (!a.priority && b.priority) return 1;
      if (a.priority && b.priority) return a.priority - b.priority;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Premium Spacing */}
      <section className="relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-36">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Delicious Food,
              <br />
              Delivered to Your Door
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed">
              Order from the best restaurants in Bungoma. Fast delivery, great prices.
            </p>
            
            {/* Search Bar - Premium Spacing */}
            <div className="bg-white rounded-2xl shadow-2xl p-3 flex items-center gap-3">
              <div className="flex-1 flex items-center gap-4 px-5">
                <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search restaurants or dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 py-4 outline-none text-gray-900 placeholder-gray-400 text-lg"
                />
              </div>
              <Button variant="primary" size="lg" className="hidden md:block">
                Search
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      </section>

      {/* Categories - Premium Spacing */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-8 py-4 rounded-2xl font-semibold whitespace-nowrap transition-all text-base ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Restaurants - Premium Spacing */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-24">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Featured Restaurants</h2>
            <p className="text-lg text-gray-600">Discover the best food in Bungoma</p>
          </div>
        </div>

        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-xl text-gray-500">No restaurants found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant) => (
              <Link key={restaurant.id} href={`/restaurant/${restaurant.slug}`}>
                <Card hover padding="none" className="overflow-hidden h-full group">
                  {/* Restaurant Emoji Header */}
                  <div className="relative bg-gradient-to-br from-orange-50 to-red-50 p-10 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-5xl shadow-lg">
                      {restaurant.emoji}
                    </div>
                    
                    {/* Favorite Button */}
                    <button
                      onClick={(e) => handleFavoriteToggle(e, restaurant.id)}
                      className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform"
                      aria-label={user?.favourites.includes(restaurant.id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      {user?.favourites.includes(restaurant.id) ? (
                        <HeartIcon className="w-6 h-6 text-red-500" />
                      ) : (
                        <HeartOutlineIcon className="w-6 h-6 text-gray-400 hover:text-red-500" />
                      )}
                    </button>
                    
                    {restaurant.rating >= 4.5 && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="success" size="sm" className="shadow-lg">
                          <StarIcon className="w-4 h-4 inline mr-1" />
                          {restaurant.rating}
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">
                      {restaurant.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed">
                      {restaurant.description}
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-5">
                      <div className="flex items-center gap-2">
                        <StarIcon className="w-5 h-5 text-yellow-400" />
                        <span className="font-semibold text-base">{restaurant.rating}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClockIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-base">{restaurant.deliveryTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {restaurant.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="default" size="sm" className="px-3 py-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section - Premium Spacing */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to order?
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-white/90">
            Join thousands of happy customers in Bungoma
          </p>
          <Link href="#restaurants">
            <Button variant="secondary" size="lg">
              Browse Restaurants
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
