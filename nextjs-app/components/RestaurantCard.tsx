import React from 'react';
import Link from 'next/link';
import { Restaurant } from '@/types';
import EmojiBadge from './ui/EmojiBadge';
import Card from './ui/Card';
import { useAuth } from '@/contexts/AuthContext';
import { Heart } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const { user, addFavourite, removeFavourite } = useAuth();
  const isFavourite = user?.favourites?.includes(restaurant.id) || false;

  const handleFavouriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      alert('Please login to add favorites');
      return;
    }

    if (isFavourite) {
      removeFavourite(restaurant.id);
    } else {
      addFavourite(restaurant.id);
    }
  };

  return (
    <Link href={`/restaurant/${restaurant.slug}`}>
      <Card hover className="relative">
        {/* Favorite Button */}
        {user && (
          <button
            onClick={handleFavouriteClick}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
            aria-label={isFavourite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={`w-5 h-5 ${
                isFavourite ? 'fill-red-500 text-red-500' : 'text-gray-400'
              }`}
            />
          </button>
        )}

        {/* Restaurant Emoji Badge */}
        <div className="mb-4">
          <EmojiBadge emoji={restaurant.emoji} size="lg" />
        </div>

        {/* Restaurant Info */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900">{restaurant.name}</h3>
          
          <div className="flex flex-wrap gap-2">
            {restaurant.categories.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {category}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>⭐ {restaurant.rating}</span>
              <span>•</span>
              <span>{restaurant.deliveryTime}</span>
            </div>
            {restaurant.priority === 1 && (
              <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                Featured
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
