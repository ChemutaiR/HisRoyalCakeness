"use client";

import { Star, MessageSquare, CheckCircle } from 'lucide-react';
import { ReviewAnalytics } from '@/types/admin/reviews';

interface ReviewsAnalyticsProps {
  analytics: ReviewAnalytics;
}

export default function ReviewsAnalytics({ analytics }: ReviewsAnalyticsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <Star className="w-6 h-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Average Rating</p>
            <p className="text-2xl font-bold text-gray-900">{analytics.averageRating}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <MessageSquare className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Reviews</p>
            <p className="text-2xl font-bold text-gray-900">{analytics.totalReviews}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <CheckCircle className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Response Rate</p>
            <p className="text-2xl font-bold text-gray-900">{analytics.responseRate}%</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 rounded-lg">
            <span className="text-2xl">🆕</span>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">New Reviews</p>
            <p className="text-2xl font-bold text-gray-900">{analytics.newReviews}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
