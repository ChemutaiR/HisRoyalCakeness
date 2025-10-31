"use client";

import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ImageGallerySectionProps {
  images: string[];
  mockUploadedImagesCount: number;
  currentImageIndex: number;
  isZoomed: boolean;
  imageError: Set<number>;
  hasImages: boolean;
  onNextImage: () => void;
  onPrevImage: () => void;
  onGoToImage: (index: number) => void;
  onToggleZoom: () => void;
  onResetZoom: () => void;
  onImageError: (index: number) => void;
}

export default function ImageGallerySection({
  images,
  mockUploadedImagesCount,
  currentImageIndex,
  isZoomed,
  imageError,
  hasImages,
  onNextImage,
  onPrevImage,
  onGoToImage,
  onToggleZoom,
  onResetZoom,
  onImageError,
}: ImageGallerySectionProps) {
  const currentImage = images[currentImageIndex];

  return (
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
                onError={() => onImageError(currentImageIndex)}
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
                    onClick={onToggleZoom}
                    className="p-3 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-lg transition-all hover:scale-110"
                    title={isZoomed ? 'Zoom Out' : 'Zoom In'}
                  >
                    {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
                  </button>
                  {isZoomed && (
                    <button
                      onClick={onResetZoom}
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
                      onClick={onPrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={onNextImage}
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
                  const isMockImage = index < mockUploadedImagesCount;
                  return (
                    <button
                      key={index}
                      onClick={() => onGoToImage(index)}
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
                        onError={() => onImageError(index)}
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
  );
}

