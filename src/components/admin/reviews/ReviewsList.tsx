"use client";

import { Review } from '@/types/admin/reviews';
import ReviewCard from './ReviewCard';

interface ReviewsListProps {
  reviews: Review[];
  onReply: (review: Review) => void;
  onFeature?: (reviewId: string) => void;
  onFlag?: (reviewId: string) => void;
}

export default function ReviewsList({
  reviews,
  onReply,
  onFeature,
  onFlag,
}: ReviewsListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rating
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Review
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cake Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onReply={onReply}
              onFeature={onFeature}
              onFlag={onFlag}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

