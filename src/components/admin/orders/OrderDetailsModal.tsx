/**
 * Order Details Modal Component
 * 
 * Displays comprehensive order information including design reference images
 * in a full-screen modal with image gallery functionality.
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { AdminOrder } from '@/types/admin';
import { ResolvedOrder } from '@/types/orders/orderWithReferences';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: AdminOrder | null;
  resolvedOrder?: ResolvedOrder | null;
}

export default function OrderDetailsModal({ 
  isOpen, 
  onClose, 
  order, 
  resolvedOrder 
}: OrderDetailsModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageError, setImageError] = useState<Set<number>>(new Set());

  // Reset state when modal opens/closes or order changes
  useEffect(() => {
    if (isOpen && order) {
      setCurrentImageIndex(0);
      setIsZoomed(false);
      setImageError(new Set());
    }
  }, [isOpen, order]);

  if (!isOpen || !order) return null;

  // Get mock uploaded images from public folder to simulate customer uploads
  const getMockUploadedImages = (cakeName: string): string[] => {
    const mockUploads: Record<string, string[]> = {
      'Vanilla': [
        '/product-images/vanilla cake.jpg',
        '/product-images/vanilla blueberry.jpg',
        '/product-images/vanilla orange.jpg'
      ],
      'Chocolate': [
        '/product-images/chcocolate fudge.jpg',
        '/product-images/chocolate chip cake.jpg',
        '/product-images/chocolate mint.jpg',
        '/product-images/chocolate orange.jpg'
      ],
      'Red Velvet': [
        '/product-images/red velvet.jpg',
        '/product-images/white forest.jpg'
      ],
      'Strawberry': [
        '/product-images/strawberry cake.jpg',
        '/product-images/strawberry forest.jpg',
        '/product-images/vanilla blueberry.jpg'
      ],
      'Black Forest': [
        '/product-images/black forest.jpg',
        '/product-images/chcocolate fudge.jpg'
      ],
      'Coconut': [
        '/product-images/coconut cake.jpg',
        '/product-images/lemon coconut cake.jpg',
        '/product-images/orange coconut cake.jpg'
      ],
      'Banana': [
        '/product-images/banana cake.jpg',
        '/product-images/vanilla cake.jpg'
      ],
      'Mocha': [
        '/product-images/mocha cake.jpg',
        '/product-images/chcocolate fudge.jpg'
      ],
      'Carrot': [
        '/product-images/carrot cake.jpg',
        '/product-images/vanilla cake.jpg'
      ],
      'Lemon': [
        '/product-images/lemon cake.jpg',
        '/product-images/lemon blueberry cake.jpg',
        '/product-images/lemon coconut cake.jpg',
        '/product-images/lemon poppy cake.jpg'
      ],
      'Orange': [
        '/product-images/orange coconut cake.jpg',
        '/product-images/orange poppy cake.jpg',
        '/product-images/vanilla orange.jpg'
      ],
      'Marble': [
        '/product-images/marble vanilla chocolate.jpg',
        '/product-images/vanilla cake.jpg',
        '/product-images/chcocolate fudge.jpg'
      ],
      'Rainbow': [
        '/product-images/rainbow cake.jpg',
        '/product-images/sprinkle confetti cake.jpg'
      ],
      'Confetti': [
        '/product-images/sprinkle confetti cake.jpg',
        '/product-images/rainbow cake.jpg'
      ],
      'White Forest': [
        '/product-images/white forest.jpg',
        '/product-images/red velvet.jpg'
      ],
      'Strawberry Forest': [
        '/product-images/strawberry forest.jpg',
        '/product-images/strawberry cake.jpg',
        '/product-images/white forest.jpg'
      ],
      'Vanilla Blueberry': [
        '/product-images/vanilla blueberry.jpg',
        '/product-images/vanilla cake.jpg',
        '/product-images/lemon blueberry cake.jpg'
      ],
      'Vanilla Orange': [
        '/product-images/vanilla orange.jpg',
        '/product-images/vanilla cake.jpg',
        '/product-images/orange coconut cake.jpg'
      ],
      'Lemon Blueberry': [
        '/product-images/lemon blueberry cake.jpg',
        '/product-images/lemon cake.jpg',
        '/product-images/vanilla blueberry.jpg'
      ],
      'Lemon Coconut': [
        '/product-images/lemon coconut cake.jpg',
        '/product-images/lemon cake.jpg',
        '/product-images/coconut cake.jpg'
      ],
      'Lemon Poppy': [
        '/product-images/lemon poppy cake.jpg',
        '/product-images/lemon cake.jpg'
      ],
      'Orange Poppy': [
        '/product-images/orange poppy cake.jpg',
        '/product-images/orange coconut cake.jpg'
      ],
      'Chocolate Chip': [
        '/product-images/chocolate chip cake.jpg',
        '/product-images/chcocolate fudge.jpg'
      ],
      'Chocolate Mint': [
        '/product-images/chocolate mint.jpg',
        '/product-images/chcocolate fudge.jpg'
      ],
      'Chocolate Orange': [
        '/product-images/chocolate orange.jpg',
        '/product-images/chcocolate fudge.jpg',
        '/product-images/orange coconut cake.jpg'
      ],
      'Butterscotch': [
        '/product-images/butterscotch cake.jpg',
        '/product-images/vanilla cake.jpg'
      ],
      'Caramel': [
        '/product-images/caramel cake.jpg',
        '/product-images/vanilla cake.jpg'
      ],
      'Passion': [
        '/product-images/passion cake.jpg',
        '/product-images/vanilla cake.jpg'
      ],
      'Pina Colada': [
        '/product-images/pinacolada cake.jpg',
        '/product-images/coconut cake.jpg'
      ],
      'Light Fruit': [
        '/product-images/light fruit cake.jpg',
        '/product-images/vanilla cake.jpg'
      ],
      'Mild Fruit': [
        '/product-images/mild fruit cake.jpg',
        '/product-images/light fruit cake.jpg'
      ],
      'Rich Fruit': [
        '/product-images/rich fruit cake.jpg',
        '/product-images/mild fruit cake.jpg'
      ],
      'Eggless': [
        '/product-images/eggless cake.jpg',
        '/product-images/vanilla cake.jpg'
      ],
      'Eggless Vanilla': [
        '/product-images/eggless vanilla cake.jpg',
        '/product-images/eggless cake.jpg'
      ],
      'Vegan': [
        '/product-images/vegan cake.webp',
        '/product-images/eggless cake.jpg'
      ],
      'Zucchini': [
        '/product-images/zucchini cake.jpg',
        '/product-images/carrot cake.jpg'
      ],
      'Custom Loaves': [
        '/product-images/custom loaves.jpg',
        '/product-images/vanilla cake.jpg'
      ]
    };
    
    return mockUploads[cakeName] || [
      '/product-images/vanilla cake.jpg',
      '/product-images/chcocolate fudge.jpg',
      '/product-images/red velvet.jpg'
    ]; // Default fallback with multiple images
  };

  // Use mock uploaded images to simulate customer uploads
  const mockUploadedImages = getMockUploadedImages(order.cake);
  const actualUploadedImages = order.images || [];
  
  // Combine mock uploads with any actual uploaded images (if any)
  const images = [...mockUploadedImages, ...actualUploadedImages];
  const hasImages = images.length > 0;
  const currentImage = images[currentImageIndex];

  const handleImageError = (index: number) => {
    setImageError(prev => new Set(prev).add(index));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const resetZoom = () => {
    setIsZoomed(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      received: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-orange-100 text-orange-800',
      ready: 'bg-green-100 text-green-800',
      delivered: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
       {/* Modal */}
       <div className="relative min-h-screen flex items-center justify-center p-4">
         <div className="relative bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Order Details - {order.orderNumber}
              </h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {order.status.toUpperCase()}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

           {/* Content */}
           <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
             {/* Hero Section with Order Status and Key Info */}
             <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200">
               <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-4">
                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                     <span className="text-2xl">🎂</span>
                   </div>
                   <div>
                     <h3 className="text-xl font-bold text-gray-900">{order.cake}</h3>
                     <p className="text-sm text-gray-600">{order.customerName} • {order.orderNumber}</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <div className="text-2xl font-bold text-gray-900">KES {order.totalAmount.toLocaleString()}</div>
                   <div className="text-sm text-gray-600">Due: {formatDate(order.dueDate)}</div>
                 </div>
               </div>
             </div>

             <div className="p-6">
               <div className="space-y-6">
                 {/* Image Gallery Card - First */}
                 <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                   <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center space-x-2">
                       <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                         <span className="text-purple-600 text-sm">📷</span>
                       </div>
                       <div>
                         <h3 className="text-lg font-semibold text-gray-900">Design Reference Images</h3>
                         <p className="text-sm text-gray-600">{images.length} customer uploaded design references</p>
                       </div>
                     </div>
                     <div className="text-right">
                       <div className="text-sm text-gray-500">Image {currentImageIndex + 1} of {images.length}</div>
                     </div>
                   </div>
                
                   {!hasImages ? (
                     <div className="flex items-center justify-center h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
                       <div className="text-center">
                         <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                           <span className="text-gray-400 text-2xl">📷</span>
                         </div>
                         <p className="text-gray-500 font-medium">No design reference images uploaded</p>
                         <p className="text-gray-400 text-sm mt-1">Customer can upload inspiration images during checkout</p>
                       </div>
                     </div>
                   ) : (
                     <div className="space-y-6">
                       {/* Main Image Display */}
                       <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden shadow-inner">
                         <div className={`relative group ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
                           <Image
                             src={currentImage}
                             alt={`Design reference ${currentImageIndex + 1}`}
                             width={400}
                             height={320}
                             className={`w-full h-80 object-contain transition-all duration-300 ${
                               isZoomed ? 'scale-150' : 'scale-100 group-hover:scale-105'
                             }`}
                             onError={() => handleImageError(currentImageIndex)}
                           />
                           
                           {/* Image Error State */}
                           {imageError.has(currentImageIndex) && (
                             <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                               <div className="text-center">
                                 <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                   <span className="text-gray-400 text-2xl">🖼️</span>
                                 </div>
                                 <p className="text-gray-500 font-medium">Image failed to load</p>
                               </div>
                             </div>
                           )}

                           {/* Overlay Controls */}
                           <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300">
                             {/* Zoom Controls */}
                             <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                               <button
                                 onClick={toggleZoom}
                                 className="p-3 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-lg transition-all hover:scale-110"
                                 title={isZoomed ? 'Zoom Out' : 'Zoom In'}
                               >
                                 {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
                               </button>
                               {isZoomed && (
                                 <button
                                   onClick={resetZoom}
                                   className="p-3 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-lg transition-all hover:scale-110"
                                   title="Reset Zoom"
                                 >
                                   <RotateCcw className="w-5 h-5" />
                                 </button>
                               )}
                             </div>

                             {/* Navigation Arrows */}
                             {images.length > 1 && (
                               <>
                                 <button
                                   onClick={prevImage}
                                   className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                                 >
                                   <ChevronLeft className="w-6 h-6" />
                                 </button>
                                 <button
                                   onClick={nextImage}
                                   className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                                 >
                                   <ChevronRight className="w-6 h-6" />
                                 </button>
                               </>
                             )}
                           </div>

                           {/* Image Counter */}
                           {images.length > 1 && (
                             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                               {currentImageIndex + 1} of {images.length}
                             </div>
                           )}
                         </div>
                       </div>

                       {/* Thumbnail Gallery */}
                       {images.length > 1 && (
                         <div className="space-y-4">
                           <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                             {images.map((image, index) => {
                               const isMockImage = index < mockUploadedImages.length;
                               return (
                                 <button
                                   key={index}
                                   onClick={() => setCurrentImageIndex(index)}
                                   className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 relative group ${
                                     index === currentImageIndex
                                       ? 'border-blue-500 ring-4 ring-blue-200 shadow-lg scale-105'
                                       : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                                   }`}
                                 >
                                   <Image
                                     src={image}
                                     alt={`Thumbnail ${index + 1}`}
                                     width={80}
                                     height={80}
                                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                                     onError={() => handleImageError(index)}
                                   />
                                   {/* Visual indicator for mock vs actual uploads */}
                                   {isMockImage && (
                                     <div className="absolute top-1 right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                                       <span className="text-white text-xs">📷</span>
                                     </div>
                                   )}
                                   {/* Active indicator */}
                                   {index === currentImageIndex && (
                                     <div className="absolute inset-0 bg-blue-500 bg-opacity-20"></div>
                                   )}
                                 </button>
                               );
                             })}
                           </div>
                           
                           {/* Legend */}
                           <div className="flex items-center justify-center space-x-6 text-sm">
                             <div className="flex items-center space-x-2">
                               <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                 <span className="text-white text-xs">📷</span>
                               </div>
                               <span className="text-gray-600">Design Reference</span>
                             </div>
                             <div className="flex items-center space-x-2">
                               <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                               <span className="text-gray-600">Customer Upload</span>
                             </div>
                           </div>
                         </div>
                       )}
                     </div>
                   )}
                 </div>

                 {/* Order Details Cards */}
                 <div className="space-y-6">
                   {/* Customer Information Card */}
                   <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                     <div className="flex items-center space-x-2 mb-4">
                       <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                         <span className="text-blue-600 text-sm">👤</span>
                       </div>
                       <h3 className="text-lg font-semibold text-gray-900">Customer Details</h3>
                     </div>
                     <div className="space-y-3">
                       <div className="flex items-center space-x-3">
                         <span className="text-gray-500 text-sm w-16">Name:</span>
                         <span className="font-medium text-gray-900">{order.customerName}</span>
                       </div>
                       <div className="flex items-center space-x-3">
                         <span className="text-gray-500 text-sm w-16">Email:</span>
                         <span className="font-medium text-gray-900 text-sm">{order.customerEmail}</span>
                       </div>
                       <div className="flex items-center space-x-3">
                         <span className="text-gray-500 text-sm w-16">Phone:</span>
                         <span className="font-medium text-gray-900">{order.customerPhone}</span>
                       </div>
                       <div className="flex items-center space-x-3">
                         <span className="text-gray-500 text-sm w-16">Created:</span>
                         <span className="font-medium text-gray-900 text-sm">{formatDate(order.createdAt)}</span>
                       </div>
                     </div>
                   </div>


                   {/* Notes and Instructions */}
                   {(order.customNotes || order.specialInstructions) && (
                     <div className="space-y-4">
                       {order.customNotes && (
                         <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                           <div className="flex items-center space-x-2 mb-2">
                             <span className="text-blue-600 text-sm">📝</span>
                             <h4 className="font-semibold text-blue-900 text-sm">Custom Notes</h4>
                           </div>
                           <p className="text-blue-800 text-sm">{order.customNotes}</p>
                         </div>
                       )}

                       {order.specialInstructions && (
                         <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                           <div className="flex items-center space-x-2 mb-2">
                             <span className="text-yellow-600 text-sm">⚠️</span>
                             <h4 className="font-semibold text-yellow-900 text-sm">Special Instructions</h4>
                           </div>
                           <p className="text-yellow-800 text-sm">{order.specialInstructions}</p>
                         </div>
                       )}
                     </div>
                   )}
                 </div>

               </div>
             </div>
           </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Order Status: {order.status.toUpperCase()}</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
