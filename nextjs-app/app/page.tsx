import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { TruckIcon, ClockIcon, ShieldCheckIcon, CurrencyDollarIcon, StarIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const features = [
    {
      icon: TruckIcon,
      title: 'Fast Delivery',
      description: 'Get your food delivered hot and fresh within 30 minutes'
    },
    {
      icon: ClockIcon,
      title: '24/7 Service',
      description: 'Order anytime, anywhere. We\'re always here for you'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Quality Assured',
      description: 'Only the best restaurants and freshest ingredients'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Best Prices',
      description: 'Competitive prices with regular discounts and offers'
    }
  ];

  const popularItems = [
    { emoji: '🍕', name: 'Pizza', price: 'KSh 800', rating: 4.8 },
    { emoji: '🍔', name: 'Burger', price: 'KSh 500', rating: 4.7 },
    { emoji: '🍜', name: 'Noodles', price: 'KSh 400', rating: 4.6 },
    { emoji: '🍗', name: 'Chicken', price: 'KSh 600', rating: 4.9 },
    { emoji: '🥗', name: 'Salad', price: 'KSh 350', rating: 4.5 }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-500 to-orange-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-32 md:py-40 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Delicious Food,
            <br />
            Delivered to Your Door
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-2xl mx-auto">
            Order from the best restaurants in Bungoma. Fast delivery, great prices.
          </p>
          <Link href="/restaurants">
            <Button variant="secondary" size="lg" className="text-lg px-10 py-4">
              Browse Restaurants
            </Button>
          </Link>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      </section>

      {/* Why Choose BungoEats Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
          Why Choose BungoEats?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} padding="lg" className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Popular Items
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {popularItems.map((item, index) => (
              <Card key={index} hover padding="lg" className="text-center">
                <div className="text-6xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{item.name}</h3>
                <p className="text-lg font-semibold text-red-600 mb-3">{item.price}</p>
                <div className="flex items-center justify-center gap-1 text-yellow-500">
                  <StarIcon className="w-5 h-5" />
                  <span className="text-gray-700 font-medium">{item.rating}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to order?
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-white/90">
            Join thousands of happy customers in Bungoma
          </p>
          <Link href="/restaurants">
            <Button variant="secondary" size="lg" className="text-lg px-10 py-4">
              Browse Restaurants
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
