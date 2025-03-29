'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

interface AuctionItem {
  id: string;
  artisanId: string;
  artisanName: string;
  artisanPhoto: string;
  title: string;
  description: string;
  startingPrice: number;
  currentPrice: number;
  imageUrl: string;
  endDate: string;
  bids: Bid[];
}

interface Bid {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  timestamp: string;
}

interface AuctionProps {
  item: AuctionItem;
  onPlaceBid: (amount: number) => Promise<void>;
}

export default function Auction({ item, onPlaceBid }: AuctionProps) {
  const { user } = useAuth();
  const [bidAmount, setBidAmount] = useState(item.currentPrice + 1);
  const [isBidding, setIsBidding] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const end = new Date(item.endDate).getTime();
      const now = new Date().getTime();
      const difference = end - now;

      if (difference <= 0) {
        setTimeLeft('Auction ended');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [item.endDate]);

  const handleBid = async () => {
    if (!user) {
      alert('Please sign in to place a bid');
      return;
    }

    if (bidAmount <= item.currentPrice) {
      alert('Bid amount must be higher than current price');
      return;
    }

    setIsBidding(true);
    try {
      await onPlaceBid(bidAmount);
      setBidAmount(bidAmount + 1);
    } catch (error) {
      console.error('Error placing bid:', error);
      alert('Failed to place bid. Please try again.');
    } finally {
      setIsBidding(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-64">
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
      </div>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="relative w-10 h-10 mr-3">
            <Image
              src={item.artisanPhoto}
              alt={item.artisanName}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{item.artisanName}</h3>
            <p className="text-sm text-gray-500">Artisan</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h2>
        <p className="text-gray-600 mb-4">{item.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Starting Price</p>
            <p className="text-lg font-semibold text-gray-900">${item.startingPrice}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Current Price</p>
            <p className="text-lg font-semibold text-blue-600">${item.currentPrice}</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500">Time Left</p>
          <p className="text-lg font-semibold text-red-600">{timeLeft}</p>
        </div>

        <div className="flex space-x-4">
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(Number(e.target.value))}
            min={item.currentPrice + 1}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleBid}
            disabled={isBidding || timeLeft === 'Auction ended'}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isBidding ? 'Placing Bid...' : 'Place Bid'}
          </button>
        </div>

        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Recent Bids</h4>
          <div className="space-y-2">
            {item.bids.slice(-3).map((bid) => (
              <div key={bid.id} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{bid.userName}</span>
                <span className="font-semibold text-gray-900">${bid.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 