"use client";

import { Review, ReviewAnalytics } from '@/types/admin/reviews';
import { useReviews } from '@/hooks/admin/reviews/useReviews';
import ReviewsHeader from './ReviewsHeader';
import ReviewsAnalytics from './ReviewsAnalytics';
import ReviewsFilters from './ReviewsFilters';
import ReviewsList from './ReviewsList';
import ReplyModal from './ReplyModal';

export default function AdminReviews() {
  const reviews: Review[] = [
    {
      id: '#REV001',
      customer: {
        name: 'Sarah Miller',
        avatar: 'SM',
        orderId: '#12345',
      },
      rating: 5,
      review:
        'Absolutely amazing Red Velvet cake! The texture was perfect and the cream cheese frosting was divine. Will definitely order again!',
      cakeType: 'Red Velvet Cake',
      date: '2024-01-15',
      status: 'Published',
      featured: true,
      response:
        'Thank you Sarah! We\'re so glad you loved our Red Velvet cake. Looking forward to your next order!',
    },
    {
      id: '#REV002',
      customer: {
        name: 'John Davis',
        avatar: 'JD',
        orderId: '#12346',
      },
      rating: 4,
      review:
        'Great chocolate fudge cake! Very moist and rich. Delivery was a bit late but the cake was worth the wait.',
      cakeType: 'Chocolate Fudge Cake',
      date: '2024-01-16',
      status: 'Pending',
      featured: false,
      response: '',
    },
    {
      id: '#REV003',
      customer: {
        name: 'Lisa Wilson',
        avatar: 'LW',
        orderId: '#12347',
      },
      rating: 5,
      review:
        'Perfect vanilla cake for my daughter\'s birthday! The decoration was exactly as requested and tasted heavenly.',
      cakeType: 'Vanilla Cake',
      date: '2024-01-17',
      status: 'Published',
      featured: true,
      response:
        'Thank you Lisa! We\'re thrilled that the birthday cake was perfect for your daughter\'s special day!',
    },
    {
      id: '#REV004',
      customer: {
        name: 'Michael Chen',
        avatar: 'MC',
        orderId: '#12348',
      },
      rating: 3,
      review:
        'The cake was good but a bit dry. The flavor was nice but could have been more moist.',
      cakeType: 'Carrot Cake',
      date: '2024-01-18',
      status: 'Published',
      featured: false,
      response:
        'Thank you for your feedback Michael. We\'ll work on improving the moisture level of our Carrot Cake.',
    },
    {
      id: '#REV005',
      customer: {
        name: 'Emily Rodriguez',
        avatar: 'ER',
        orderId: '#12349',
      },
      rating: 5,
      review:
        'Incredible Black Forest cake! The cherries were fresh and the chocolate was rich. Perfect for our anniversary!',
      cakeType: 'Black Forest Cake',
      date: '2024-01-19',
      status: 'Published',
      featured: true,
      response:
        'Happy Anniversary Emily! We\'re honored to be part of your special celebration!',
    },
    {
      id: '#REV006',
      customer: {
        name: 'David Thompson',
        avatar: 'DT',
        orderId: '#12350',
      },
      rating: 2,
      review:
        'Disappointed with the order. The cake arrived damaged and the flavor was not as expected.',
      cakeType: 'Strawberry Cake',
      date: '2024-01-20',
      status: 'Flagged',
      featured: false,
      response:
        'We sincerely apologize David. Please contact us immediately so we can make this right for you.',
    },
    {
      id: '#REV007',
      customer: {
        name: 'Jennifer Lee',
        avatar: 'JL',
        orderId: '#12351',
      },
      rating: 4,
      review:
        'Lovely Lemon Blueberry cake! The combination was perfect and not too sweet. Will order again!',
      cakeType: 'Lemon Blueberry Cake',
      date: '2024-01-21',
      status: 'Published',
      featured: false,
      response: 'Thank you Jennifer! We\'re glad you enjoyed the Lemon Blueberry combination!',
    },
    {
      id: '#REV008',
      customer: {
        name: 'Robert Wilson',
        avatar: 'RW',
        orderId: '#12352',
      },
      rating: 5,
      review:
        'Outstanding service and amazing cake! The Rainbow cake was a hit at my son\'s birthday party.',
      cakeType: 'Rainbow Cake',
      date: '2024-01-22',
      status: 'Published',
      featured: true,
      response:
        'Thank you Robert! We\'re so happy the Rainbow cake made your son\'s birthday extra special!',
    },
  ];

  const analytics: ReviewAnalytics = {
    averageRating: 4.7,
    totalReviews: 156,
    responseRate: 94,
    newReviews: 8,
  };

  const {
    filterRating,
    setFilterRating,
    filterStatus,
    setFilterStatus,
    filteredReviews,
    selectedReview,
    showReplyModal,
    handleReply,
    closeReplyModal,
  } = useReviews({ reviews });

  // eslint-disable-next-line no-unused-vars
  const handleFeature = (reviewId: string) => {
    // Handle feature logic here
  };

  // eslint-disable-next-line no-unused-vars
  const handleFlag = (reviewId: string) => {
    // Handle flag logic here
  };

  return (
    <div className="py-8">
      <ReviewsHeader />

      <ReviewsAnalytics analytics={analytics} />

      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <ReviewsFilters
          filterRating={filterRating}
          filterStatus={filterStatus}
          onRatingChange={setFilterRating}
          onStatusChange={setFilterStatus}
        />

        <ReviewsList
          reviews={filteredReviews}
          onReply={handleReply}
          onFeature={handleFeature}
          onFlag={handleFlag}
        />
      </div>

      <ReplyModal
        isOpen={showReplyModal}
        review={selectedReview}
        onClose={closeReplyModal}
      />
    </div>
  );
}
