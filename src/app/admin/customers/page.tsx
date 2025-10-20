"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import Customers from '@/components/admin/customers/Customers';

export default function CustomersPage() {
  return (
    <AdminLayout 
      title="Customers" 
      description="View and manage customer accounts"
    >
      <Customers />
    </AdminLayout>
  );
}
