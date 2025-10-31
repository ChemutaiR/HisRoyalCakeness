"use client";

import Link from 'next/link';
import { Package, Eye, Pencil, Trash2 } from 'lucide-react';
import { AdminProduct } from '@/store/slices/admin/products';

interface ProductActionsDropdownProps {
  product: AdminProduct;
  isOpen: boolean;
  onToggle: () => void;
  onViewImages: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProductActionsDropdown({
  product,
  isOpen,
  onToggle,
  onViewImages,
  onEdit,
  onDelete,
}: ProductActionsDropdownProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
      <div className="py-1">
        <Link
          href={`/admin/products/${product.id}`}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={onToggle}
        >
          <Package className="w-4 h-4 mr-3" />
          View Product
        </Link>
        <button
          onClick={() => {
            onViewImages();
            onToggle();
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Eye className="w-4 h-4 mr-3" />
          View Images
        </button>
        <button
          onClick={() => {
            onEdit();
            onToggle();
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Pencil className="w-4 h-4 mr-3" />
          Edit
        </button>
        <button
          onClick={() => {
            onDelete();
            onToggle();
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4 mr-3" />
          Delete
        </button>
      </div>
    </div>
  );
}

