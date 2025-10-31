"use client";

import { useState, useEffect, useCallback } from 'react';

interface UseImageGalleryProps {
  images: string[];
  isOpen: boolean;
  resetOnOpen?: boolean;
}

/**
 * Hook for managing image gallery state (navigation, zoom, errors)
 */
export function useImageGallery({ images, isOpen, resetOnOpen = true }: UseImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageError, setImageError] = useState<Set<number>>(new Set());

  // Reset state when modal opens/closes or images change
  useEffect(() => {
    if (resetOnOpen && isOpen) {
      setCurrentImageIndex(0);
      setIsZoomed(false);
      setImageError(new Set());
    }
  }, [isOpen, images.length, resetOnOpen]);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToImage = useCallback((index: number) => {
    if (index >= 0 && index < images.length) {
      setCurrentImageIndex(index);
    }
  }, [images.length]);

  const toggleZoom = useCallback(() => {
    setIsZoomed(prev => !prev);
  }, []);

  const resetZoom = useCallback(() => {
    setIsZoomed(false);
  }, []);

  const handleImageError = useCallback((index: number) => {
    setImageError(prev => new Set(prev).add(index));
  }, []);

  return {
    currentImageIndex,
    isZoomed,
    imageError,
    currentImage: images[currentImageIndex] || null,
    hasImages: images.length > 0,
    nextImage,
    prevImage,
    goToImage,
    toggleZoom,
    resetZoom,
    handleImageError,
  };
}

