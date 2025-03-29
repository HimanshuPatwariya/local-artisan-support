'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface GiftCardProps {
  onPurchase: (amount: number, recipientEmail: string) => Promise<void>;
  onApplyCoupon: (code: string) => Promise<void>;
}

export default function GiftCard({ onPurchase, onApplyCoupon }: GiftCardProps) {
  const { user } = useAuth();
  const [amount, setAmount] = useState(25);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const predefinedAmounts = [25, 50, 100, 200, 500];

  const handlePurchase = async () => {
    if (!user) {
      alert('Please sign in to purchase a gift card');
      return;
    }

    if (!recipientEmail) {
      alert('Please enter recipient email');
      return;
    }

    setIsPurchasing(true);
    try {
      await onPurchase(amount, recipientEmail);
      setAmount(25);
      setRecipientEmail('');
    } catch (error) {
      console.error('Error purchasing gift card:', error);
      alert('Failed to purchase gift card. Please try again.');
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) {
      alert('Please enter a coupon code');
      return;
    }

    setIsApplyingCoupon(true);
    try {
      await onApplyCoupon(couponCode);
      setCouponCode('');
    } catch (error) {
      console.error('Error applying coupon:', error);
      alert('Invalid coupon code. Please try again.');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Purchase Gift Card</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
          {predefinedAmounts.map((value) => (
            <button
              key={value}
              onClick={() => setAmount(value)}
              className={`px-4 py-2 rounded-lg border ${
                amount === value
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-gray-300 hover:border-blue-600'
              }`}
            >
              ${value}
            </button>
          ))}
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Email
          </label>
          <input
            type="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            placeholder="Enter recipient's email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={handlePurchase}
          disabled={isPurchasing}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isPurchasing ? 'Processing...' : 'Purchase Gift Card'}
        </button>
      </div>

      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Apply Coupon Code</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleApplyCoupon}
            disabled={isApplyingCoupon}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isApplyingCoupon ? 'Applying...' : 'Apply'}
          </button>
        </div>
      </div>
    </div>
  );
} 