"use client";

import { AdminProduct } from '@/store/slices/admin/products';
import ProductRow from './ProductRow';

interface ProductsTableProps {
  products: AdminProduct[];
  searchTerm: string;
  openDropdownId: string | null;
  onToggleDropdown: (productId: string) => void;
  onViewImages: (product: AdminProduct) => void;
  onEdit: (product: AdminProduct) => void;
  onDelete: (productId: string) => void;
}

export default function ProductsTable({
  products,
  searchTerm,
  openDropdownId,
  onToggleDropdown,
  onViewImages,
  onEdit,
  onDelete,
}: ProductsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800 tracking-wide">Products</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  {searchTerm ? 'No products found matching your search.' : 'No products available.'}
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  isDropdownOpen={openDropdownId === product.id}
                  onToggleDropdown={() => onToggleDropdown(product.id)}
                  onViewImages={() => onViewImages(product)}
                  onEdit={() => onEdit(product)}
                  onDelete={() => onDelete(product.id)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

