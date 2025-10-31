"use client";

import React from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

interface DecorationImageUploadProps {
  imageUrl: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
}

export default function DecorationImageUpload({
  imageUrl,
  fileInputRef,
  onFileSelect,
  onRemove,
}: DecorationImageUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        required
      />
      {imageUrl && (
        <div className="mt-2 relative inline-block">
          <Image
            src={imageUrl}
            alt="Preview"
            width={160}
            height={160}
            className="h-40 w-40 object-cover rounded-md border border-gray-200"
          />
          <button
            type="button"
            onClick={onRemove}
            className="absolute -top-2 -right-2 p-1 bg-white border border-gray-200 rounded-full shadow hover:bg-gray-50"
            aria-label="Remove image"
            title="Remove image"
          >
            <X className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      )}
    </div>
  );
}

