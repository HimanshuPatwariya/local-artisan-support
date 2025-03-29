'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsProps {
  artisanId: string;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => Promise<void>;
}

export default function Reviews({ artisanId, reviews, onAddReview }: ReviewsProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !rating || !comment.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddReview({
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        userPhoto: user.photoURL || '',
        rating,
        comment: comment.trim(),
      });
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
      
      {/* Review Form */}
      {user && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <svg
                  className={`h-6 w-6 ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            rows={3}
          />
          <button
            type="submit"
            disabled={isSubmitting || !rating || !comment.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={review.userPhoto}
                  alt={review.userName}
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900">{review.userName}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-gray-700">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 