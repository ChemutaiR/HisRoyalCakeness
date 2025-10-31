/**
 * usePromotionImage Hook
 * 
 * Custom hook for managing promotion image upload, preview, and removal
 */

'use client';

import React, { useState, useRef, useCallback } from 'react';

export interface UsePromotionImageReturn {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
  imageFile: File | null;
  imagePreview: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageRemove: () => void;
  setInitialPreview: (url: string | null) => void;
  reset: () => void;
}

export function usePromotionImage(
  initialPreview?: string | null
): UsePromotionImageReturn {
  const [enabled, setEnabled] = useState<boolean>(!!initialPreview);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialPreview || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setEnabled(true);
  }, []);

  const handleImageRemove = useCallback(() => {
    // Revoke object URL to free memory
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    
    setImageFile(null);
    setImagePreview(null);
    setEnabled(false);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [imagePreview]);

  const setInitialPreview = useCallback((url: string | null) => {
    // Revoke previous blob URL if exists
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    
    setImagePreview(url);
    setEnabled(!!url);
    setImageFile(null);
  }, [imagePreview]);

  const reset = useCallback(() => {
    // Revoke object URL to free memory
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    
    setImageFile(null);
    setImagePreview(null);
    setEnabled(false);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [imagePreview]);

  return {
    enabled,
    setEnabled,
    imageFile,
    imagePreview,
    fileInputRef,
    handleImageSelect,
    handleImageRemove,
    setInitialPreview,
    reset,
  };
}

