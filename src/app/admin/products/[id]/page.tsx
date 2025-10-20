"use client";

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProductDetailForm from '@/components/admin/products/ProductDetailForm';

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [id, setId] = useState<string>('');

  useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  const handleSave = () => {
    // Optional: Show success message or redirect
    // Intentionally left blank; parent page does not navigate on save
  };

  const handleCancel = () => {
    // Cancel editing mode - no navigation needed
    // The ProductDetailForm already handles canceling edit mode
  };

  if (!id) {
    return (
      <AdminLayout 
        title="Loading..." 
        description="Loading product details..."
      >
        <div className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c7b8ea] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading product details...</p>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Product Configuration" 
      description="Configure product details, pricing, and options"
    >
      <div className="p-6">
        <ProductDetailForm 
          productId={id}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </AdminLayout>
  );
}
