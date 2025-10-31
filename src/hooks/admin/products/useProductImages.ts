"use client";

import { useCallback } from 'react';

interface UseProductImagesProps {
  images: string[];
  onUpdate: (images: string[]) => void;
}

/**
 * Hook for managing product images
 */
export function useProductImages({ images, onUpdate }: UseProductImagesProps) {
  const handleAddImage = useCallback((imageUrl?: string) => {
    if (imageUrl && imageUrl.trim()) {
      onUpdate([...images, imageUrl.trim()]);
      return true;
    }
    return false;
  }, [images, onUpdate]);

  const handleRemoveImage = useCallback((index: number) => {
    if (index >= 0 && index < images.length) {
      const updatedImages = images.filter((_, i) => i !== index);
      onUpdate(updatedImages);
    }
  }, [images, onUpdate]);

  const handleUpdateImages = useCallback((updatedImages: string[]) => {
    onUpdate(updatedImages);
  }, [onUpdate]);

  return {
    handleAddImage,
    handleRemoveImage,
    handleUpdateImages,
  };
}

