"use client";

import { useMemo, useState } from 'react';
import { Review, FilterRating, FilterStatus } from '@/types/admin/reviews';

interface UseReviewsProps {
  reviews: Review[];
  initialRatingFilter?: FilterRating;
  initialStatusFilter?: FilterStatus;
}

/**
 * Hook for managing review data, filtering, and moderation
 */
export function useReviews({
  reviews,
  initialRatingFilter = 'all',
  initialStatusFilter = 'all',
}: UseReviewsProps) {
  const [filterRating, setFilterRating] = useState<FilterRating>(initialRatingFilter);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(initialStatusFilter);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const ratingMatch =
        filterRating === 'all' || review.rating === parseInt(filterRating);
      const statusMatch = filterStatus === 'all' || review.status === filterStatus;
      return ratingMatch && statusMatch;
    });
  }, [reviews, filterRating, filterStatus]);

  const handleReply = (review: Review) => {
    setSelectedReview(review);
    setShowReplyModal(true);
  };

  const closeReplyModal = () => {
    setShowReplyModal(false);
    setSelectedReview(null);
  };

  return {
    filterRating,
    setFilterRating,
    filterStatus,
    setFilterStatus,
    filteredReviews,
    selectedReview,
    showReplyModal,
    handleReply,
    closeReplyModal,
  };
}

