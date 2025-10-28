"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import ManageOrdersContent from '@/components/admin/orders/ManageOrdersContent';
import { useAdminOrders } from '@/hooks/admin/useAdminOrders';
import { useCallback } from 'react';

export default function OrdersPage() {
  const { 
    orders, 
    isLoading, 
    error, 
    refreshOrders, 
    updateOrderStatus,
    isUpdating
  } = useAdminOrders();

  // Function to move delivered orders to history
  const moveDeliveredToHistory = useCallback(() => {
    const deliveredOrders = orders.filter((order) => order.status === 'delivered');
    if (deliveredOrders.length > 0) {
      // Update orders in the store to move delivered orders to history
      deliveredOrders.forEach(order => {
        updateOrderStatus(order.id, 'delivered');
      });
    }
  }, [orders, updateOrderStatus]);

  if (isLoading) {
    return (
      <AdminLayout title="Loading..." description="Loading orders...">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c7b8ea] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading orders...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Orders Unavailable" description="There was an error loading orders">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Orders Unavailable</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={refreshOrders}
              className="px-4 py-2 bg-[#c7b8ea] text-black rounded-lg hover:bg-[#c7b8ea]/80 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Manage Orders" 
      description="View and manage current orders"
    >
      <ManageOrdersContent 
        orders={orders} 
        moveDeliveredToHistory={moveDeliveredToHistory}
        updateOrderStatus={updateOrderStatus}
        refreshOrders={refreshOrders}
        isUpdating={isUpdating}
      />
    </AdminLayout>
  );
}