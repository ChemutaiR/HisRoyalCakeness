"use client";

import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  showNumber?: boolean;
}

export default function StarRating({ rating, showNumber = false }: StarRatingProps) {
  return (
    <div className="flex items-center">
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      {showNumber && <span className="ml-1 text-sm text-gray-500">{rating}.0</span>}
    </div>
  );
}

