/**
 * Review Management Types
 */

export interface ReviewCustomer {
  name: string;
  avatar: string;
  orderId: string;
}

export interface Review {
  id: string;
  customer: ReviewCustomer;
  rating: number;
  review: string;
  cakeType: string;
  date: string;
  status: 'Published' | 'Pending' | 'Flagged';
  featured: boolean;
  response?: string;
}

export interface ReviewAnalytics {
  averageRating: number;
  totalReviews: number;
  responseRate: number;
  newReviews: number;
}

export type FilterRating = 'all' | '5' | '4' | '3' | '2' | '1';
export type FilterStatus = 'all' | 'Published' | 'Pending' | 'Flagged';
