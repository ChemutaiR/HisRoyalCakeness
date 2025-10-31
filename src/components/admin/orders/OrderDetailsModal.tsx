/**
 * Order Details Modal Component
 * 
 * Displays comprehensive order information including design reference images
 * in a full-screen modal with image gallery functionality.
 */

'use client';

import { AdminOrder } from '@/types/admin';
import { ResolvedOrder } from '@/types/orders/orderWithReferences';
import OrderHeaderSection from './OrderHeaderSection';
import OrderHeroSection from './OrderHeroSection';
import ImageGallerySection from './ImageGallerySection';
import OrderInfoSection from './OrderInfoSection';
import OrderNotesSection from './OrderNotesSection';
import OrderActionsSection from './OrderActionsSection';
import { useImageGallery } from '@/hooks/admin/orders/useImageGallery';
import { getMockUploadedImages } from '@/utils/orders/imageUtils';

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
  // Get mock uploaded images from public folder to simulate customer uploads
  const mockUploadedImages = order ? getMockUploadedImages(order.cake) : [];
  const actualUploadedImages = order?.images || [];
  
  // Combine mock uploads with any actual uploaded images (if any)
  const images = [...mockUploadedImages, ...actualUploadedImages];

  // Use image gallery hook (must be called unconditionally)
  const {
    currentImageIndex,
    isZoomed,
    imageError,
    hasImages,
    nextImage,
    prevImage,
    goToImage,
    toggleZoom,
    resetZoom,
    handleImageError,
  } = useImageGallery({
    images,
    isOpen,
    resetOnOpen: true,
  });

  if (!isOpen || !order) return null;

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
          <OrderHeaderSection
            orderNumber={order.orderNumber}
            status={order.status}
            onClose={onClose}
          />

           {/* Content */}
           <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
             {/* Hero Section with Order Status and Key Info */}
             <OrderHeroSection
               cakeName={order.cake}
               customerName={order.customerName}
               orderNumber={order.orderNumber}
               totalAmount={order.totalAmount}
               dueDate={order.dueDate}
             />

             <div className="p-6">
               <div className="space-y-6">
                 {/* Image Gallery Card - First */}
                 <ImageGallerySection
                   images={images}
                   mockUploadedImagesCount={mockUploadedImages.length}
                   currentImageIndex={currentImageIndex}
                   isZoomed={isZoomed}
                   imageError={imageError}
                   hasImages={hasImages}
                   onNextImage={nextImage}
                   onPrevImage={prevImage}
                   onGoToImage={goToImage}
                   onToggleZoom={toggleZoom}
                   onResetZoom={resetZoom}
                   onImageError={handleImageError}
                 />

                 {/* Order Details Cards */}
                 <div className="space-y-6">
                   {/* Customer Information Card */}
                   <OrderInfoSection
                     customerName={order.customerName}
                     customerEmail={order.customerEmail}
                     customerPhone={order.customerPhone}
                     createdAt={order.createdAt}
                   />

                   {/* Notes and Instructions */}
                   <OrderNotesSection
                     customNotes={order.customNotes}
                     specialInstructions={order.specialInstructions}
                   />
                 </div>
               </div>
             </div>
           </div>

          {/* Footer */}
          <OrderActionsSection
            status={order.status}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
}
