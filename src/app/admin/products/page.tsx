"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import ProductsWithState from '@/components/admin/products/ProductsWithState';

export default function ProductsPage() {
  return (
    <AdminLayout>
      <ProductsWithState />
    </AdminLayout>
  );
}
