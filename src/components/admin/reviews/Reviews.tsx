"use client";

import { useState } from 'react';
import { Star, MessageSquare, CheckCircle, XCircle, Flag } from 'lucide-react';

export default function AdminReviews() {
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [filterRating, setFilterRating] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

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
      status: 'Published',
      featured: true,
      response: 'Thank you Sarah! We\'re so glad you loved our Red Velvet cake. Looking forward to your next order!'
    },
    {
      id: '#REV002',
      customer: {
        name: 'John Davis',
        avatar: 'JD',
        orderId: '#12346'
      },
      rating: 4,
      review: 'Great chocolate fudge cake! Very moist and rich. Delivery was a bit late but the cake was worth the wait.',
      cakeType: 'Chocolate Fudge Cake',
      date: '2024-01-16',
      status: 'Pending',
      featured: false,
      response: ''
    },
    {
      id: '#REV003',
      customer: {
        name: 'Lisa Wilson',
        avatar: 'LW',
        orderId: '#12347'
      },
      rating: 5,
      review: 'Perfect vanilla cake for my daughter\'s birthday! The decoration was exactly as requested and tasted heavenly.',
      cakeType: 'Vanilla Cake',
      date: '2024-01-17',
      status: 'Published',
      featured: true,
      response: 'Thank you Lisa! We\'re thrilled that the birthday cake was perfect for your daughter\'s special day!'
    },
    {
      id: '#REV004',
      customer: {
        name: 'Michael Chen',
        avatar: 'MC',
        orderId: '#12348'
      },
      rating: 3,
      review: 'The cake was good but a bit dry. The flavor was nice but could have been more moist.',
      cakeType: 'Carrot Cake',
      date: '2024-01-18',
      status: 'Published',
      featured: false,
      response: 'Thank you for your feedback Michael. We\'ll work on improving the moisture level of our Carrot Cake.'
    },
    {
      id: '#REV005',
      customer: {
        name: 'Emily Rodriguez',
        avatar: 'ER',
        orderId: '#12349'
      },
      rating: 5,
      review: 'Incredible Black Forest cake! The cherries were fresh and the chocolate was rich. Perfect for our anniversary!',
      cakeType: 'Black Forest Cake',
      date: '2024-01-19',
      status: 'Published',
      featured: true,
      response: 'Happy Anniversary Emily! We\'re honored to be part of your special celebration!'
    },
    {
      id: '#REV006',
      customer: {
        name: 'David Thompson',
        avatar: 'DT',
        orderId: '#12350'
      },
      rating: 2,
      review: 'Disappointed with the order. The cake arrived damaged and the flavor was not as expected.',
      cakeType: 'Strawberry Cake',
      date: '2024-01-20',
      status: 'Flagged',
      featured: false,
      response: 'We sincerely apologize David. Please contact us immediately so we can make this right for you.'
    },
    {
      id: '#REV007',
      customer: {
        name: 'Jennifer Lee',
        avatar: 'JL',
        orderId: '#12351'
      },
      rating: 4,
      review: 'Lovely Lemon Blueberry cake! The combination was perfect and not too sweet. Will order again!',
      cakeType: 'Lemon Blueberry Cake',
      date: '2024-01-21',
      status: 'Published',
      featured: false,
      response: 'Thank you Jennifer! We\'re glad you enjoyed the Lemon Blueberry combination!'
    },
    {
      id: '#REV008',
      customer: {
        name: 'Robert Wilson',
        avatar: 'RW',
        orderId: '#12352'
      },
      rating: 5,
      review: 'Outstanding service and amazing cake! The Rainbow cake was a hit at my son\'s birthday party.',
      cakeType: 'Rainbow Cake',
      date: '2024-01-22',
      status: 'Published',
      featured: true,
      response: 'Thank you Robert! We\'re so happy the Rainbow cake made your son\'s birthday extra special!'
    }
  ];

  const analytics = {
    averageRating: 4.7,
    totalReviews: 156,
    responseRate: 94,
    newReviews: 8
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Flagged':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvatarColor = (name: string) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-indigo-500', 'bg-pink-500', 'bg-yellow-500', 'bg-teal-500'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const filteredReviews = reviews.filter(review => {
    const ratingMatch = filterRating === 'all' || review.rating === parseInt(filterRating);
    const statusMatch = filterStatus === 'all' || review.status === filterStatus;
    return ratingMatch && statusMatch;
  });

  const handleReply = (review: any) => {
    setSelectedReview(review);
    setShowReplyModal(true);
  };

  // eslint-disable-next-line no-unused-vars
  const handleFeature = (reviewId: string) => {
    // Handle feature logic here
    // console.log('Feature review:', reviewId);
  };

  // eslint-disable-next-line no-unused-vars
  const handleFlag = (reviewId: string) => {
    // Handle flag logic here
    // console.log('Flag review:', reviewId);
  };

  const closeReplyModal = () => {
    setShowReplyModal(false);
    setSelectedReview(null);
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-2">Review Management</h2>
      <p className="text-gray-600 text-base mb-8">Monitor and respond to customer reviews to maintain your reputation.</p>
      
      {/* Review Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.averageRating}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalReviews}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Response Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.responseRate}%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">🆕</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.newReviews}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Review Management Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Customer Reviews</h3>
          <div className="flex space-x-2">
            <select 
              value={filterRating} 
              onChange={(e) => setFilterRating(e.target.value)}
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
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="all">All Status</option>
              <option value="Published">Published</option>
              <option value="Pending">Pending</option>
              <option value="Flagged">Flagged</option>
            </select>
            <button className="bg-[#c7b8ea] text-black px-3 py-1 rounded-md text-sm font-semibold hover:bg-[#c7b8ea]/80 transition-colors">
              Bulk Actions
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cake Type</th>
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
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className={`h-10 w-10 rounded-full ${getAvatarColor(review.customer.name)} flex items-center justify-center`}>
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
                    <div className="flex items-center">
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                      <span className="ml-1 text-sm text-gray-500">{review.rating}.0</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs">
                      &quot;{review.review}&quot;
                    </div>
                    {review.response && (
                      <div className="text-sm text-blue-600 mt-1 italic">
                        Response: &quot;{review.response}&quot;
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.cakeType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(review.status)}`}>
                        {review.status}
                      </span>
                      {review.featured && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      onClick={() => handleReply(review)}
                      className="text-indigo-600 hover:text-indigo-900" 
                      title="Reply"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleFeature(review.id)}
                      className="text-green-600 hover:text-green-900" 
                      title="Feature"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleFlag(review.id)}
                      className="text-red-600 hover:text-red-900" 
                      title="Flag"
                    >
                      <Flag className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reply Modal */}
      {showReplyModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Reply to Review</h3>
              <button 
                onClick={closeReplyModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className={`h-8 w-8 rounded-full ${getAvatarColor(selectedReview.customer.name)} flex items-center justify-center mr-3`}>
                    <span className="text-white text-sm font-medium">{selectedReview.customer.avatar}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{selectedReview.customer.name}</div>
                    <div className="text-sm text-gray-500">{selectedReview.customer.orderId}</div>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {renderStars(selectedReview.rating)}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">{selectedReview.rating}.0</span>
                </div>
                <p className="text-gray-700 italic">&quot;{selectedReview.review}&quot;</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Response</label>
                <textarea 
                  defaultValue={selectedReview.response}
                  rows={4}
                  placeholder="Write your response to this review..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  onClick={closeReplyModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Send Response
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 