// Admin reviews management types

export interface AdminReview {
  id: string;
  customer: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  product: {
    id: string;
    name: string;
    imageUrl: string;
  };
  order: {
    id: string;
    orderNumber: string;
    orderDate: string;
  };
  rating: number;
  title?: string;
  review: string;
  images?: string[];
  isVerified: boolean;
  status: ReviewStatus;
  isFeatured: boolean;
  response?: ReviewResponse;
  helpfulCount: number;
  reportCount: number;
  createdAt: string;
  updatedAt: string;
}

export type ReviewStatus = 
  | 'published'
  | 'pending'
  | 'hidden'
  | 'flagged'
  | 'deleted';

export interface ReviewResponse {
  id: string;
  response: string;
  respondedBy: string;
  respondedAt: string;
}

export interface ReviewFilters {
  rating?: number;
  status?: ReviewStatus;
  isVerified?: boolean;
  isFeatured?: boolean;
  dateFrom?: string;
  dateTo?: string;
  productId?: string;
  customerId?: string;
  hasResponse?: boolean;
  search?: string;
}

export interface ReviewActions {
  updateStatus: (id: string, status: ReviewStatus) => Promise<void>;
  featureReview: (id: string) => Promise<void>;
  unfeatureReview: (id: string) => Promise<void>;
  addResponse: (id: string, response: string) => Promise<void>;
  updateResponse: (id: string, response: string) => Promise<void>;
  deleteResponse: (id: string) => Promise<void>;
  flagReview: (id: string, reason: string) => Promise<void>;
  unflagReview: (id: string) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  markAsHelpful: (id: string) => Promise<void>;
  reportReview: (id: string, reason: string) => Promise<void>;
}

export interface ReviewStats {
  totalReviews: number;
  publishedReviews: number;
  pendingReviews: number;
  hiddenReviews: number;
  flaggedReviews: number;
  averageRating: number;
  reviewsByRating: Record<number, number>;
  verifiedReviews: number;
  featuredReviews: number;
  reviewsWithResponses: number;
  totalHelpfulVotes: number;
}

export interface ReviewAnalytics {
  ratingDistribution: {
    rating: number;
    count: number;
    percentage: number;
  }[];
  monthlyReviews: {
    month: string;
    count: number;
    averageRating: number;
  }[];
  topRatedProducts: {
    productId: string;
    productName: string;
    averageRating: number;
    reviewCount: number;
  }[];
  customerSatisfaction: {
    period: string;
    averageRating: number;
    totalReviews: number;
  }[];
}

export interface ReviewTemplate {
  id: string;
  name: string;
  template: string;
  variables: string[];
  isActive: boolean;
  createdAt: string;
}

export interface ReviewModerationRule {
  id: string;
  name: string;
  description: string;
  conditions: {
    field: string;
    operator: 'contains' | 'equals' | 'greater_than' | 'less_than';
    value: string;
  }[];
  action: 'auto_approve' | 'auto_hide' | 'flag_for_review';
  isActive: boolean;
  createdAt: string;
}
