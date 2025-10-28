"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProductDetailForm from '@/components/admin/products/ProductDetailForm';

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [id, setId] = useState<string>('');
  const router = useRouter();

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
        <button
          onClick={() => router.push('/admin/products')}
          className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </button>
        <ProductDetailForm 
          productId={id}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </AdminLayout>
  );
}
