'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import Portfolio from '@/components/Portfolio';
import LiveChat from '@/components/LiveChat';
import Reviews from '@/components/Reviews';
import { dummyArtisans } from '@/data/dummyData';

// Dummy data for portfolio and testimonials
const dummyPortfolioItems = [
  {
    id: '1',
    title: 'Handcrafted Ceramic Vase',
    description: 'A beautiful hand-thrown ceramic vase with unique glazing.',
    imageUrl: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d',
    category: 'ceramics',
    date: '2024-03-15',
  },
  // Add more portfolio items as needed
];

const dummyTestimonials = [
  {
    id: '1',
    clientName: 'John Doe',
    clientPhoto: 'https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000',
    content: 'Amazing craftsmanship! The attention to detail is incredible.',
    rating: 5,
    date: '2024-03-15',
  },
  // Add more testimonials as needed
];

export default function ArtisanDetails() {
  const params = useParams();
  const { user } = useAuth();
  const [artisan, setArtisan] = useState<any>(null);
  const [showChat, setShowChat] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchArtisan = async () => {
      try {
        // In a real app, this would be a Firebase call
        const artisanData = dummyArtisans.find(a => a.id === params.id);
        setArtisan(artisanData);
      } catch (error) {
        console.error('Error fetching artisan:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtisan();
  }, [params.id]);

  const handleAddToWishlist = async () => {
    if (!user) {
      alert('Please sign in to add items to your wishlist');
      return;
    }

    setIsAddingToWishlist(true);
    try {
      // TODO: Implement Firebase integration
      console.log('Adding artisan to wishlist:', artisan.id);
      alert('Added to wishlist successfully!');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Failed to add to wishlist. Please try again.');
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!artisan) {
    return <div className="text-center py-12">Artisan not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Artisan Header */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="relative h-96">
          <Image
            src={artisan.imageUrl}
            alt={artisan.name}
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000';
            }}
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{artisan.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{artisan.craft}</p>
              <p className="text-gray-700 whitespace-pre-wrap">{artisan.story}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowChat(!showChat)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {showChat ? 'Close Chat' : 'Chat with Artisan'}
              </button>
              <button
                onClick={handleAddToWishlist}
                disabled={isAddingToWishlist}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 disabled:opacity-50"
              >
                {isAddingToWishlist ? 'Adding...' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artisan.products.map((product: any) => (
            <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000';
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <p className="text-blue-600 font-semibold">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Section */}
      <Portfolio
        items={dummyPortfolioItems}
        testimonials={dummyTestimonials}
      />

      {/* Reviews Section */}
      <div className="mt-12">
        <Reviews
          artisanId={artisan.id}
          reviews={[]}
          onAddReview={async (review) => {
            // TODO: Implement Firebase integration
            console.log('Adding review:', review);
          }}
        />
      </div>

      {/* Live Chat */}
      {showChat && (
        <LiveChat
          artisanId={artisan.id}
          artisanName={artisan.name}
          artisanPhoto={artisan.imageUrl}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
} 