"use client";

import { Review } from '@/types/admin/reviews';
import { getStatusColor, getAvatarColor } from '@/utils/reviews/reviewUtils';
import StarRating from './StarRating';
import ReviewModerationControls from './ReviewModerationControls';

interface ReviewCardProps {
  review: Review;
  onReply: (review: Review) => void;
  onFeature?: (reviewId: string) => void;
  onFlag?: (reviewId: string) => void;
}

export default function ReviewCard({
  review,
  onReply,
  onFeature,
  onFlag,
}: ReviewCardProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div
              className={`h-10 w-10 rounded-full ${getAvatarColor(
                review.customer.name
              )} flex items-center justify-center`}
            >
              <span className="text-white font-medium">{review.customer.avatar}</span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{review.customer.name}</div>
            <div className="text-sm text-gray-500">{review.customer.orderId}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StarRating rating={review.rating} showNumber />
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900 max-w-xs">&quot;{review.review}&quot;</div>
        {review.response && (
          <div className="text-sm text-blue-600 mt-1 italic">
            Response: &quot;{review.response}&quot;
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {review.cakeType}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.date}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
              review.status
            )}`}
          >
            {review.status}
          </span>
          {review.featured && (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
              Featured
            </span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <ReviewModerationControls
          onReply={() => onReply(review)}
          onFeature={onFeature ? () => onFeature(review.id) : undefined}
          onFlag={onFlag ? () => onFlag(review.id) : undefined}
        />
      </td>
    </tr>
  );
}

