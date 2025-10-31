"use client";

import { FilterRating, FilterStatus } from '@/types/admin/reviews';

interface ReviewsFiltersProps {
  filterRating: FilterRating;
  filterStatus: FilterStatus;
  onRatingChange: (rating: FilterRating) => void;
  onStatusChange: (status: FilterStatus) => void;
  onBulkActions?: () => void;
}

export default function ReviewsFilters({
  filterRating,
  filterStatus,
  onRatingChange,
  onStatusChange,
  onBulkActions,
}: ReviewsFiltersProps) {
  return (
    <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
      <h3 className="text-lg font-semibold text-gray-800">Customer Reviews</h3>
      <div className="flex space-x-2">
        <select
          value={filterRating}
          onChange={(e) => onRatingChange(e.target.value as FilterRating)}
          className="border border-gray-300 rounded-md px-3 py-1 text-sm"
        >
          <option value="all">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => onStatusChange(e.target.value as FilterStatus)}
          className="border border-gray-300 rounded-md px-3 py-1 text-sm"
        >
          <option value="all">All Status</option>
          <option value="Published">Published</option>
          <option value="Pending">Pending</option>
          <option value="Flagged">Flagged</option>
        </select>
        {onBulkActions && (
          <button
            onClick={onBulkActions}
            className="bg-[#c7b8ea] text-black px-3 py-1 rounded-md text-sm font-semibold hover:bg-[#c7b8ea]/80 transition-colors"
          >
            Bulk Actions
          </button>
        )}
      </div>
    </div>
  );
}

