'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Check } from 'lucide-react';
import { Decoration } from '@/types/shop/catalog/decorations';

interface DecorationCardProps {
  decoration: Decoration;
  isSelected: boolean;
  onToggle: (decoration: Decoration) => void;
}

export default function DecorationCard({ 
  decoration, 
  isSelected, 
  onToggle 
}: DecorationCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleToggle = () => {
    onToggle(decoration);
  };

  return (
    <div 
      className={`relative bg-white rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
        isSelected 
          ? 'border-[#c7b8ea] shadow-lg' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={handleToggle}
    >
      {/* Image */}
      <div className="aspect-square relative rounded-t-lg overflow-hidden">
        {imageError ? (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        ) : (
          <Image
            src={decoration.imageUrl}
            alt={decoration.name}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        )}
        
        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2 bg-[#c7b8ea] text-black rounded-full p-1">
            <Check className="w-3 h-3" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h4 className="text-sm font-medium text-gray-800 tracking-wide mb-1 line-clamp-1">
          {decoration.name}
        </h4>
        <p className="text-xs text-gray-500 leading-relaxed mb-2 line-clamp-2">
          {decoration.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900 tracking-tight">
            KES {decoration.price.toLocaleString()}
          </span>
          <button
            className={`p-1 rounded-full transition-colors ${
              isSelected 
                ? 'bg-[#c7b8ea] text-black' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
          >
            {isSelected ? (
              <Check className="w-3 h-3" />
            ) : (
              <Plus className="w-3 h-3" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
