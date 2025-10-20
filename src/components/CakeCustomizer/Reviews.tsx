'use client';

import { useState } from 'react';
import { Star, MessageCircle, Send } from 'lucide-react';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsProps {
  cakeId: number;
  cakeName: string;
  isAuthenticated: boolean;
}

export default function CakeReviews({ isAuthenticated }: ReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Sarah M.',
      rating: 5,
      comment: 'Absolutely delicious! The vanilla flavor was perfect and the frosting was so smooth. Will definitely order again!',
      date: '2024-01-15'
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'John D.',
      rating: 4,
      comment: 'Great cake for my daughter\'s birthday. Everyone loved it. The size was perfect for 8 people.',
      date: '2024-01-10'
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Maria L.',
      rating: 5,
      comment: 'Best cake I\'ve ever had! The texture was perfect and it tasted amazing. Highly recommend!',
      date: '2024-01-08'
    }
  ]);

  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const handleSubmitReview = async () => {
    if (!newReview.comment.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const review: Review = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'You',
      rating: newReview.rating,
      comment: newReview.comment.trim(),
      date: new Date().toISOString().split('T')[0]
    };
    
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '' });
    setIsSubmitting(false);
  };

  // eslint-disable-next-line no-unused-vars
  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            onClick={interactive ? () => onRatingChange?.(star) : undefined}
            className={`${interactive ? 'cursor-pointer' : 'cursor-default'}`}
            disabled={!interactive}
          >
            <Star 
              className={`w-4 h-4 ${
                star <= rating 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {renderStars(Math.round(averageRating))}
            <span className="ml-2 text-sm text-gray-600">
              {averageRating.toFixed(1)} ({reviews.length} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Write Review Section - Only for authenticated users */}
      {isAuthenticated && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">Write a Review</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              {renderStars(newReview.rating, true, (rating) => 
                setNewReview(prev => ({ ...prev, rating }))
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Comment
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                placeholder="Share your experience with this cake..."
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent resize-none"
                rows={3}
                maxLength={500}
              />
              <div className="text-xs text-gray-500 mt-1 text-right">
                {newReview.comment.length}/500
              </div>
            </div>
            <button
              onClick={handleSubmitReview}
              disabled={!newReview.comment.trim() || isSubmitting}
              className="flex items-center justify-center px-4 py-2 bg-[#c7b8ea] text-white rounded-lg hover:bg-[#b3a4d6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No reviews yet. Be the first to review this cake!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#c7b8ea] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {review.userName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{review.userName}</div>
                    <div className="text-xs text-gray-500">{review.date}</div>
                  </div>
                </div>
                {renderStars(review.rating)}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
            </div>
          ))
        )}
      </div>

      {/* Login Prompt for non-authenticated users */}
      {!isAuthenticated && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-blue-500" />
            <p className="text-sm text-blue-700">
              <a href="/auth/login" className="font-medium hover:underline">
                Log in
              </a>{' '}
              to leave a review for this cake!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
