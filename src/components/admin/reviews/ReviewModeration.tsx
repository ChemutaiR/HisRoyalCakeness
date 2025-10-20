"use client";

import { useState } from 'react';
import { Star, CheckCircle, XCircle, Flag, Eye } from 'lucide-react';

export default function ReviewModeration() {
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [showModerationModal, setShowModerationModal] = useState(false);
  const [filterRating, setFilterRating] = useState('all');
  const [filterStatus, setFilterStatus] = useState('pending');
  const [moderationAction, setModerationAction] = useState<'approve' | 'reject' | 'flag'>('approve');
  const [moderationReason, setModerationReason] = useState('');

  const reviews = [
    {
      id: '#REV001',
      customer: {
        name: 'Sarah Miller',
        avatar: 'SM',
        orderId: '#12345'
      },
      rating: 5,
      review: 'Absolutely amazing Red Velvet cake! The texture was perfect and the cream cheese frosting was divine. Will definitely order again!',
      cakeType: 'Red Velvet Cake',
      date: '2024-01-15',
      status: 'Pending',
      flagged: false,
      moderationNotes: '',
      response: ''
    },
    {
      id: '#REV002',
      customer: {
        name: 'John Smith',
        avatar: 'JS',
        orderId: '#12346'
      },
      rating: 2,
      review: 'The cake was okay but not worth the price. Expected better quality for the amount I paid. The frosting was too sweet.',
      cakeType: 'Chocolate Fudge Cake',
      date: '2024-01-14',
      status: 'Pending',
      flagged: true,
      moderationNotes: 'Customer complaint about pricing and quality',
      response: ''
    },
    {
      id: '#REV003',
      customer: {
        name: 'Emily Johnson',
        avatar: 'EJ',
        orderId: '#12347'
      },
      rating: 4,
      review: 'Good cake overall, but delivery was late. The cake itself was delicious though.',
      cakeType: 'Vanilla Cake',
      date: '2024-01-13',
      status: 'Approved',
      flagged: false,
      moderationNotes: 'Approved - minor delivery issue mentioned but cake quality praised',
      response: 'Thank you Emily! We apologize for the delivery delay and are glad you enjoyed the cake.'
    },
    {
      id: '#REV004',
      customer: {
        name: 'Mike Wilson',
        avatar: 'MW',
        orderId: '#12348'
      },
      rating: 1,
      review: 'Terrible experience. Cake was completely different from what I ordered. Waste of money.',
      cakeType: 'Birthday Cake',
      date: '2024-01-12',
      status: 'Rejected',
      flagged: true,
      moderationNotes: 'Rejected - serious complaint about order accuracy',
      response: ''
    },
    {
      id: '#REV005',
      customer: {
        name: 'Lisa Brown',
        avatar: 'LB',
        orderId: '#12349'
      },
      rating: 5,
      review: 'Perfect birthday cake! Exactly as described and delivered on time. Highly recommend!',
      cakeType: 'Rainbow Cake',
      date: '2024-01-11',
      status: 'Pending',
      flagged: false,
      moderationNotes: '',
      response: ''
    }
  ];

  const filteredReviews = reviews.filter(review => {
    const ratingMatch = filterRating === 'all' || review.rating.toString() === filterRating;
    const statusMatch = filterStatus === 'all' || review.status.toLowerCase() === filterStatus;
    return ratingMatch && statusMatch;
  });

  const handleModerateReview = (review: any, action: 'approve' | 'reject' | 'flag') => {
    setSelectedReview(review);
    setModerationAction(action);
    setShowModerationModal(true);
  };

  const handleSubmitModeration = () => {
    // Here you would typically make an API call to update the review status
    // console.log('Moderating review:', selectedReview.id, 'Action:', moderationAction, 'Reason:', moderationReason);
    setShowModerationModal(false);
    setModerationReason('');
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Review Moderation</h2>
          <p className="text-gray-600 text-base">Moderate and manage customer reviews before they go live.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Flag className="w-4 h-4" />
          <span>Flagged: {reviews.filter(r => r.flagged).length}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Rating</label>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Reviews Awaiting Moderation</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cake</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReviews.map(review => (
                <tr key={review.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-[#c7b8ea] text-black rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                        {review.customer.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{review.customer.name}</div>
                        <div className="text-sm text-gray-500">Order #{review.customer.orderId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getRatingStars(review.rating)}
                      <span className="ml-2 text-sm text-gray-600">({review.rating})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs">
                      <p className="line-clamp-2">{review.review}</p>
                      {review.flagged && (
                        <div className="flex items-center mt-1 text-red-600">
                          <Flag className="w-3 h-3 mr-1" />
                          <span className="text-xs">Flagged</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.cakeType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(review.status)}`}>
                      {review.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => {
                        setSelectedReview(review);
                        setShowModerationModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {review.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleModerateReview(review, 'approve')}
                          className="text-green-600 hover:text-green-900"
                          title="Approve"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleModerateReview(review, 'reject')}
                          className="text-red-600 hover:text-red-900"
                          title="Reject"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleModerateReview(review, 'flag')}
                          className="text-orange-600 hover:text-orange-900"
                          title="Flag for Review"
                        >
                          <Flag className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Moderation Modal */}
      {showModerationModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Moderate Review</h3>
              <button
                onClick={() => setShowModerationModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Review Details */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#c7b8ea] text-black rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    {selectedReview.customer.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{selectedReview.customer.name}</div>
                    <div className="text-sm text-gray-500">Order #{selectedReview.customer.orderId}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  {getRatingStars(selectedReview.rating)}
                  <span className="ml-2 text-sm text-gray-600">({selectedReview.rating}/5)</span>
                </div>
              </div>
              <div className="mb-3">
                <div className="text-sm font-medium text-gray-700 mb-1">Cake: {selectedReview.cakeType}</div>
                <div className="text-sm text-gray-500">Date: {selectedReview.date}</div>
              </div>
              <div className="text-gray-800 leading-relaxed">
                &quot;{selectedReview.review}&quot;
              </div>
            </div>

            {/* Moderation Actions */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Moderation Action</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setModerationAction('approve')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                      moderationAction === 'approve'
                        ? 'bg-green-100 text-green-800 border-2 border-green-300'
                        : 'bg-gray-100 text-gray-700 border-2 border-transparent'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => setModerationAction('reject')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                      moderationAction === 'reject'
                        ? 'bg-red-100 text-red-800 border-2 border-red-300'
                        : 'bg-gray-100 text-gray-700 border-2 border-transparent'
                    }`}
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                  <button
                    onClick={() => setModerationAction('flag')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                      moderationAction === 'flag'
                        ? 'bg-orange-100 text-orange-800 border-2 border-orange-300'
                        : 'bg-gray-100 text-gray-700 border-2 border-transparent'
                    }`}
                  >
                    <Flag className="w-4 h-4" />
                    Flag
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Moderation Notes</label>
                <textarea
                  value={moderationReason}
                  onChange={(e) => setModerationReason(e.target.value)}
                  placeholder="Add notes about your moderation decision..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]"
                  rows={3}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <button
                onClick={() => setShowModerationModal(false)}
                className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitModeration}
                className={`px-4 py-2 rounded text-sm font-medium text-white ${
                  moderationAction === 'approve'
                    ? 'bg-green-600 hover:bg-green-700'
                    : moderationAction === 'reject'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-orange-600 hover:bg-orange-700'
                }`}
              >
                {moderationAction === 'approve' ? 'Approve Review' : 
                 moderationAction === 'reject' ? 'Reject Review' : 'Flag Review'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
