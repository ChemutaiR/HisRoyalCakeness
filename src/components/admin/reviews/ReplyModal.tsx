"use client";

import { XCircle } from 'lucide-react';
import { Review } from '@/types/admin/reviews';
import { getAvatarColor } from '@/utils/reviews/reviewUtils';
import StarRating from './StarRating';

interface ReplyModalProps {
  isOpen: boolean;
  review: Review | null;
  onClose: () => void;
  onSendResponse?: (response: string) => void;
}

export default function ReplyModal({
  isOpen,
  review,
  onClose,
  onSendResponse,
}: ReplyModalProps) {
  if (!isOpen || !review) return null;

  const handleSubmit = () => {
    const textarea = document.querySelector(
      'textarea[name="response"]'
    ) as HTMLTextAreaElement;
    if (textarea && onSendResponse) {
      onSendResponse(textarea.value);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Reply to Review</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <div
                className={`h-8 w-8 rounded-full ${getAvatarColor(
                  review.customer.name
                )} flex items-center justify-center mr-3`}
              >
                <span className="text-white text-sm font-medium">
                  {review.customer.avatar}
                </span>
              </div>
              <div>
                <div className="font-medium text-gray-900">{review.customer.name}</div>
                <div className="text-sm text-gray-500">{review.customer.orderId}</div>
              </div>
            </div>
            <div className="mb-2">
              <StarRating rating={review.rating} showNumber />
            </div>
            <p className="text-gray-700 italic">&quot;{review.review}&quot;</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Response
            </label>
            <textarea
              name="response"
              defaultValue={review.response}
              rows={4}
              placeholder="Write your response to this review..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Send Response
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

