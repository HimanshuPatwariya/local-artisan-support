'use client';

import Wishlist from '@/components/Wishlist';

export default function WishlistPage() {
  const handleRemoveItem = async (itemId: string) => {
    // TODO: Implement Firebase integration
    console.log('Removing item from wishlist:', itemId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>
      <Wishlist onRemoveItem={handleRemoveItem} />
    </div>
  );
} 