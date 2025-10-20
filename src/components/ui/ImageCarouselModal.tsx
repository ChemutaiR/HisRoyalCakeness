"use client";

import React, { useEffect } from 'react';
import ImageCarousel from './ImageCarousel';
import { cn } from '@/utils';

interface ImageCarouselModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  productName?: string;
  altText?: string;
  showThumbnails?: boolean;
  className?: string;
}

export default function ImageCarouselModal({
  isOpen,
  onClose,
  images,
  productName,
  altText,
  showThumbnails = true,
  className
}: ImageCarouselModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content */}
      <div className={cn(
        "relative bg-white rounded-lg shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden",
        className
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {productName || 'Product Images'}
            </h3>
            {images.length > 0 && (
              <p className="text-sm text-gray-500">
                {images.length} image{images.length !== 1 ? 's' : ''} available
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close image viewer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Image Carousel */}
        <div className="p-4">
          <ImageCarousel
            images={images}
            altText={altText || productName || 'Product image'}
            showThumbnails={showThumbnails}
            showDots={true}
            showArrows={true}
            aspectRatio="aspect-[4/3]"
            maxHeight={500}
            isModal={true}
            onClose={onClose}
          />
        </div>

        {/* Footer */}
        {images.length > 1 && (
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              Use arrow keys, swipe gestures, or click the dots to navigate between images
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
