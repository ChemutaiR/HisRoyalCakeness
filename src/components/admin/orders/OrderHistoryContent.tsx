/**
 * Order History Content Component
 *
 * Main content area for order history page
 */

import React, { useState, useCallback } from 'react';
import { AlertCircle } from 'lucide-react';
import OrderHistoryModal from './OrderHistoryModal';
import { AdminOrder } from '@/types/admin/orders';
import { useOrderHistory } from '@/hooks/admin/orders/useOrderHistory';
import OrderHistoryStats from './OrderHistoryStats';
import OrderHistoryFilters from './OrderHistoryFilters';
import OrderHistoryHeader from './OrderHistoryHeader';
import OrderHistoryTable from './OrderHistoryTable';

export default function OrderHistoryContent() {
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [showModal, setShowModal] = useState(false);

  const {
    orders,
    filteredOrders,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    totalRevenue,
    loadOrders,
    handleClearFilters,
    hasActiveFilters,
  } = useOrderHistory();

  const handleOrderClick = useCallback(
    (order: AdminOrder) => {
      setSelectedOrder(order);
      setShowModal(true);
    },
    []
  );

  const handleModalClose = useCallback(() => {
    setShowModal(false);
    setSelectedOrder(null);
  }, []);

  const handleExport = useCallback(
    async (format: 'csv' | 'json') => {
      try {
        const data =
          format === 'csv'
            ? filteredOrders.map((order) => ({
                id: order.id,
                orderNumber: order.orderNumber,
                customerName: order.customerName,
                customerEmail: order.customerEmail,
                cake: order.cake,
                totalAmount: order.totalAmount,
                deliveryDate: order.deliveryDate,
              }))
            : filteredOrders;

        const blob = new Blob([JSON.stringify(data, null, 2)], {
          type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `orders-${new Date().toISOString().split('T')[0]}.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        // Export failed - could be handled with user notification in production
      }
    },
    [filteredOrders]
  );

  // Loading state
  if (isLoading && orders.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order history...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && orders.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Orders</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadOrders}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <OrderHistoryStats totalOrders={orders.length} totalRevenue={totalRevenue} />

      <OrderHistoryFilters
        searchQuery={searchQuery}
        dateFrom={dateFrom}
        dateTo={dateTo}
        isLoading={isLoading}
        hasActiveFilters={hasActiveFilters}
        onSearchChange={setSearchQuery}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
        onClearFilters={handleClearFilters}
      />

      <OrderHistoryHeader
        filteredCount={filteredOrders.length}
        hasActiveFilters={hasActiveFilters}
        isLoading={isLoading}
        onRefresh={loadOrders}
        onExportCSV={() => handleExport('csv')}
        onExportJSON={() => handleExport('json')}
      />

      <OrderHistoryTable
        orders={filteredOrders}
        hasActiveFilters={hasActiveFilters}
        onOrderClick={handleOrderClick}
      />

      {/* Modal */}
      <OrderHistoryModal
        isOpen={showModal}
        onClose={handleModalClose}
        order={selectedOrder}
        isReadOnly={true}
      />
    </div>
  );
}
