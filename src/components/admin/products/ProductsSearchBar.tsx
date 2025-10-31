"use client";

import { Search, X } from 'lucide-react';

interface ProductsSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
}

export default function ProductsSearchBar({
  searchTerm,
  onSearchChange,
  onClear,
}: ProductsSearchBarProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search products... (Ctrl+K)"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-64 pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
        aria-label="Search products"
        title="Search products by name or description. Press Ctrl+K to focus, Escape to clear."
      />
      {searchTerm && (
        <button
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

