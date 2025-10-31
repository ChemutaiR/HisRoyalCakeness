"use client";

import Image from 'next/image';
import { MoreVertical } from 'lucide-react';
import { AdminProduct } from '@/store/slices/admin/products';
import ProductActionsDropdown from './ProductActionsDropdown';

interface ProductRowProps {
  product: AdminProduct;
  isDropdownOpen: boolean;
  onToggleDropdown: () => void;
  onViewImages: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProductRow({
  product,
  isDropdownOpen,
  onToggleDropdown,
  onViewImages,
  onEdit,
  onDelete,
}: ProductRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-12 w-12 flex-shrink-0">
            <Image
              className="h-12 w-12 rounded-lg object-cover"
              src={product.images[0] || '/placeholder-image.jpg'}
              alt={product.name}
              width={48}
              height={48}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{product.name}</div>
            <div className="text-sm text-gray-500 max-w-md">{product.description}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            product.isActive
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {product.isActive ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="relative dropdown-container">
          <button
            onClick={onToggleDropdown}
            className="text-gray-500 hover:text-gray-700"
            aria-label="More actions"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          <ProductActionsDropdown
            product={product}
            isOpen={isDropdownOpen}
            onToggle={onToggleDropdown}
            onViewImages={onViewImages}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      </td>
    </tr>
  );
}

