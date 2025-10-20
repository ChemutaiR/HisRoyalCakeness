"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import OrderHistory from '@/components/admin/orders/OrderHistory';

export default function OrderHistoryPage() {
  return (
    <AdminLayout 
      title="Order History" 
      description="Review past orders and their details"
    >
      <OrderHistory />
    </AdminLayout>
  );
}
