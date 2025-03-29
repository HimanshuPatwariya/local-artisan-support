'use client';

import { useState } from 'react';
import Auction from '@/components/Auction';
import GiftCard from '@/components/GiftCard';

// Dummy data for auctions
const dummyAuctions = [
  {
    id: '1',
    artisanId: '1',
    artisanName: 'Sarah Johnson',
    artisanPhoto: 'https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000',
    title: 'Handcrafted Ceramic Vase',
    description: 'A unique hand-thrown ceramic vase with intricate patterns.',
    startingPrice: 100,
    currentPrice: 150,
    imageUrl: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d',
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    bids: [
      {
        id: '1',
        userId: 'user1',
        userName: 'John Doe',
        amount: 150,
        timestamp: new Date().toISOString(),
      },
    ],
  },
  // Add more auction items as needed
];

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState<'auctions' | 'gift-cards'>('auctions');

  const handlePlaceBid = async (auctionId: string, amount: number) => {
    // TODO: Implement Firebase integration
    console.log('Placing bid:', { auctionId, amount });
  };

  const handlePurchaseGiftCard = async (amount: number, recipientEmail: string) => {
    // TODO: Implement Firebase integration
    console.log('Purchasing gift card:', { amount, recipientEmail });
  };

  const handleApplyCoupon = async (code: string) => {
    // TODO: Implement Firebase integration
    console.log('Applying coupon:', code);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Marketplace</h1>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('auctions')}
            className={`${
              activeTab === 'auctions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Auctions
          </button>
          <button
            onClick={() => setActiveTab('gift-cards')}
            className={`${
              activeTab === 'gift-cards'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Gift Cards
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'auctions' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyAuctions.map((auction) => (
            <Auction
              key={auction.id}
              item={auction}
              onPlaceBid={(amount) => handlePlaceBid(auction.id, amount)}
            />
          ))}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <GiftCard
            onPurchase={handlePurchaseGiftCard}
            onApplyCoupon={handleApplyCoupon}
          />
        </div>
      )}
    </div>
  );
} 