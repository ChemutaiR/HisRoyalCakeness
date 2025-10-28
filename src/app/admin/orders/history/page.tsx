/**
 * Order History Page
 * 
 * Displays delivered orders history with filtering and search capabilities
 */

"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import OrderHistoryContent from '@/components/admin/orders/OrderHistoryContent';

export default function OrderHistoryPage() {
  return (
    <AdminLayout 
      title="Order History" 
      description="View and manage delivered orders history"
    >
      <OrderHistoryContent />
    </AdminLayout>
  );
}