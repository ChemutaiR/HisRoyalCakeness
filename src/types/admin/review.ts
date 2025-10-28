// Review-related type definitions

export interface Review {
  id: number;
  userId: number;
  cakeId: number;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: ReviewUser;
}

export interface ReviewUser {
  id: number;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface CreateReviewData {
  cakeId: number;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
}

export interface UpdateReviewData {
  rating?: number;
  title?: string;
  comment?: string;
  images?: string[];
}

export interface ReviewFilters {
  rating?: number;
  verified?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface ReviewResponse {
  review: Review;
  stats: ReviewStats;
}

export interface ReviewListResponse {
  reviews: Review[];
  stats: ReviewStats;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
