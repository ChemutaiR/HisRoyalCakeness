"use client";

import { Package } from 'lucide-react';

interface AddProductButtonProps {
  onClick: () => void;
}

export default function AddProductButton({ onClick }: AddProductButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 px-4 py-2 bg-[#c7b8ea] text-black rounded-lg hover:bg-[#c7b8ea]/80 transition-colors"
    >
      <Package className="w-4 h-4" />
      <span>Add Product</span>
    </button>
  );
}

