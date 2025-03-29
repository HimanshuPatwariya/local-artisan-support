'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

interface WishlistItem {
  id: string;
  artisanId: string;
  artisanName: string;
  artisanPhoto: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  type: 'product' | 'auction';
}

interface WishlistProps {
  onRemoveItem: (itemId: string) => Promise<void>;
}

export default function Wishlist({ onRemoveItem }: WishlistProps) {
  const { user } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removingItem, setRemovingItem] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;
      
      try {
        // TODO: Implement Firebase integration
        // For now, using dummy data
        const dummyItems: WishlistItem[] = [
          {
            id: '1',
            artisanId: '1',
            artisanName: 'Sarah Johnson',
            artisanPhoto: 'https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000',
            title: 'Handcrafted Ceramic Vase',
            description: 'A unique hand-thrown ceramic vase with intricate patterns.',
            imageUrl: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d',
            price: 150,
            type: 'product',
          },
          // Add more dummy items as needed
        ];
        setItems(dummyItems);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, [user]);

  const handleRemoveItem = async (itemId: string) => {
    setRemovingItem(itemId);
    try {
      await onRemoveItem(itemId);
      setItems(items.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      alert('Failed to remove item from wishlist. Please try again.');
    } finally {
      setRemovingItem(null);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign in to View Wishlist</h2>
        <p className="text-gray-600">Please sign in to view and manage your wishlist items.</p>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center py-12">Loading wishlist...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h2>
        <p className="text-gray-600">Add items to your wishlist to keep track of your favorite crafts.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-48">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000';
              }}
            />
            <button
              onClick={() => handleRemoveItem(item.id)}
              disabled={removingItem === item.id}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <div className="flex items-center mb-2">
              <div className="relative w-8 h-8 mr-2">
                <Image
                  src={item.artisanPhoto}
                  alt={item.artisanName}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <span className="text-sm text-gray-600">{item.artisanName}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-blue-600">${item.price}</span>
              <span className="text-sm text-gray-500 capitalize">{item.type}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 