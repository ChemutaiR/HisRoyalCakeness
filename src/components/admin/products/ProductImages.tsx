"use client";

import Image from 'next/image';
import { X, Plus } from 'lucide-react';

interface ProductImagesProps {
  images: string[];
  isEditing: boolean;
  error?: string;
  onAddImage: () => void;
  onRemoveImage: (index: number) => void;
}

export default function ProductImages({
  images,
  isEditing,
  error,
  onAddImage,
  onRemoveImage,
}: ProductImagesProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Images</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <Image
              src={image}
              alt={`Product image ${index + 1}`}
              width={150}
              height={150}
              className="w-full h-32 object-cover rounded-lg"
            />
            {isEditing && (
              <button
                onClick={() => onRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <button
          onClick={onAddImage}
          className="flex items-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#c7b8ea] hover:text-[#c7b8ea] transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Image
        </button>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

