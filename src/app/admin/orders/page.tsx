"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import ManageOrdersContent from '@/components/admin/orders/ManageOrdersContent';
import { AdminOrder } from '@/types/admin';
import { useState, useEffect, useCallback } from 'react';

export default function OrdersPage() {
  // TODO: Replace with Redux state management
  // const isAuthenticated = true; // Temporary placeholder - set to true to allow access
  // const user = { role: 'admin' }; // Temporary placeholder
  // const addNotification = () => {}; // Temporary placeholder

  // TODO: Replace with actual API calls
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  // const [orderHistory, setOrderHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders data
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setOrders([]);
        // setOrderHistory([]);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError('Failed to load order data');
      } finally {
        setLoading(false);
      }
    };
    // Always fetch orders since we disabled authentication checks
    fetchOrders();
  }, []);

  // Function to move delivered orders to history
  const moveDeliveredToHistory = useCallback(() => {
    const deliveredOrders = orders.filter((order: AdminOrder) => order.status === 'delivered');
    if (deliveredOrders.length > 0) {
      deliveredOrders.map((order: AdminOrder) => ({
        id: parseInt(order.id.replace('#', '')),
        orderDate: order.dueDate,
        deliveryDate: new Date().toISOString().split('T')[0],
        customer: order.customerName || 'Customer',
        cake: order.cake,
        size: order.size || '1 kg',
        status: 'Delivered'
      }));
      
      // setOrderHistory((prev: any[]) => [...historyEntries, ...prev]);
      setOrders((prev: AdminOrder[]) => prev.filter((order: AdminOrder) => order.status !== 'delivered'));
    }
  }, [orders]);

  if (loading) {
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
              onClick={() => window.location.reload()}
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
        setOrders={setOrders} 
        moveDeliveredToHistory={moveDeliveredToHistory} 
      />
    </AdminLayout>
  );
}
