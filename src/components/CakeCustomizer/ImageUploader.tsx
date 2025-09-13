'use client';

import React, { useState } from 'react';
import { Upload, X, Lock, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  isAuthenticated: boolean;
  uploadedImages: string[];
  // eslint-disable-next-line no-unused-vars
  onImagesChange: (images: string[]) => void;
}

export default function ImageUploader({ isAuthenticated, uploadedImages, onImagesChange }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <Lock className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900">Design References</h3>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-3">
            Sign in to upload design reference images to help us understand your preferences.
          </p>
          <button className="text-[#c7b8ea] hover:text-[#c7b8ea]/80 font-medium text-sm">
            Sign in to continue
          </button>
        </div>
      </div>
    );
  }

  const handleFileSelect = (files: FileList) => {
    const newImages: string[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          newImages.push(result);
          onImagesChange([...uploadedImages, ...newImages]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Design References</h3>
      
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging
            ? 'border-[#c7b8ea] bg-[#c7b8ea]/5'
            : 'border-gray-300 hover:border-[#c7b8ea] hover:bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
        <p className="text-sm text-gray-600 mb-2">
          Drag and drop images here, or click to select files
        </p>
        <p className="text-xs text-gray-500 mb-4">
          Upload images to help us understand your design preferences (JPG, PNG, max 5MB each)
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="inline-flex items-center px-4 py-2 bg-[#c7b8ea] text-black text-sm font-semibold rounded-full hover:bg-[#c7b8ea]/80 transition-colors cursor-pointer"
        >
          <ImageIcon className="w-4 h-4 mr-2" />
          Choose Images
        </label>
      </div>

      {/* Uploaded Images */}
      {uploadedImages.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Uploaded Images ({uploadedImages.length})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt={`Reference ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 