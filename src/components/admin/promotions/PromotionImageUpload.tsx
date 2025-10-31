"use client";

import Image from 'next/image';
import { X } from 'lucide-react';
import { RefObject } from 'react';

interface PromotionImageUploadProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  fileInputRef: RefObject<HTMLInputElement>;
  imagePreview: string | null;
  setImagePreview: (url: string | null) => void;
  setFile: (file: File | null) => void;
  initialPreview?: string | null;
}

export default function PromotionImageUpload({
  enabled,
  onToggle,
  fileInputRef,
  imagePreview,
  setImagePreview,
  setFile,
  initialPreview,
}: PromotionImageUploadProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">Promotion Poster Image</label>
        <label className="flex items-center gap-2 text-xs text-gray-600">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => {
              onToggle(e.target.checked);
              if (!e.target.checked) {
                setFile(null);
                setImagePreview(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              } else if (initialPreview) {
                setImagePreview(initialPreview);
              }
            }}
          />
          Enable
        </label>
      </div>
      {enabled && (
        <div className="space-y-2">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files && e.target.files[0];
              if (file) {
                const objectUrl = URL.createObjectURL(file);
                setImagePreview(objectUrl);
                setFile(file);
              }
            }}
            className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
          {imagePreview && (
            <div className="relative w-full h-48 border border-gray-300 rounded-md overflow-hidden bg-gray-100">
              <Image src={imagePreview} alt="Preview" fill className="object-contain" />
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setImagePreview(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


