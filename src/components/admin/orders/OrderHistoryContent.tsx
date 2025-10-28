/**
 * Order History Content Component
 * 
 * Main content area for order history page
 */

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { RefreshCw, Download, AlertCircle, Package, DollarSign } from 'lucide-react';
import OrderHistoryModal from './OrderHistoryModal';
import { AdminOrder } from '@/types/admin/orders';
import { DatePicker, Input } from '@/components/ui';
import { adminOrderServiceWithReferences } from '@/mockDatabase/admin/services/orderServiceWithReferences';

export default function OrderHistoryContent() {
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  // Simple local state for search and dates
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  
  // Direct data state
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load orders directly from service
  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const deliveredOrders = adminOrderServiceWithReferences.getAdminOrdersByStatus('delivered');
      setOrders(deliveredOrders);
    } catch (err: any) {
      setError(err.message || 'Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load orders on mount
  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // Filter orders based on search and date filters
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const searchableText = [
          order.id,
          order.orderNumber,
          order.customerName,
          order.customerEmail,
          order.cake,
          order.cream,
          order.topping
        ].join(' ').toLowerCase();
        
        if (!searchableText.includes(searchLower)) {
          return false;
        }
      }

      // Date range filter
      if (dateFrom) {
        const orderDate = new Date(order.deliveryDate);
        if (orderDate < dateFrom) {
          return false;
        }
      }
      
      if (dateTo) {
        const orderDate = new Date(order.deliveryDate);
        if (orderDate > dateTo) {
          return false;
        }
      }

      return true;
    });
  }, [orders, searchQuery, dateFrom, dateTo]);

  // Calculate statistics
  const totalRevenue = useMemo(() => {
    return filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  }, [filteredOrders]);

  // Simple handlers
  const handleOrderClick = useCallback((order: AdminOrder) => {
    setSelectedOrder(order);
    setShowModal(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setShowModal(false);
    setSelectedOrder(null);
  }, []);

  const handleExport = useCallback(async (format: 'csv' | 'json') => {
    try {
      // Simple export implementation
      const data = format === 'csv' 
        ? filteredOrders.map(order => ({
            id: order.id,
            orderNumber: order.orderNumber,
            customerName: order.customerName,
            customerEmail: order.customerEmail,
            cake: order.cake,
            totalAmount: order.totalAmount,
            deliveryDate: order.deliveryDate
          }))
        : filteredOrders;
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
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
  }, [filteredOrders]);

  const handleRefresh = useCallback(async () => {
    await loadOrders();
  }, [loadOrders]);

  // Simple search and date handlers
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleDateFromChange = useCallback((date: Date | undefined) => {
    setDateFrom(date);
  }, []);

  const handleDateToChange = useCallback((date: Date | undefined) => {
    setDateTo(date);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setDateFrom(undefined);
    setDateTo(undefined);
  }, []);

  // Check if any filters are active
  const hasActiveFilters = searchQuery || dateFrom || dateTo;

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
            onClick={handleRefresh}
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
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-semibold text-gray-900">{orders.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">
                KES {totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Search and Date Range */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Orders
            </label>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by order ID, customer name, email, or cake..."
              disabled={isLoading}
              className="w-full"
            />
          </div>

          {/* Date From */}
          <div className="sm:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Date
            </label>
            <DatePicker
              value={dateFrom}
              onChange={handleDateFromChange}
              placeholder="Select start date"
              disabled={isLoading}
            />
          </div>

          {/* Date To */}
          <div className="sm:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Date
            </label>
            <DatePicker
              value={dateTo}
              onChange={handleDateToChange}
              placeholder="Select end date"
              disabled={isLoading}
            />
          </div>

          {/* Clear Button */}
          {hasActiveFilters && (
            <div className="flex items-end">
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Delivered Orders ({filteredOrders.length})
          </h2>
          {hasActiveFilters && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              Filtered
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleExport('csv')}
              className="px-3 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              CSV
            </button>
            <button
              onClick={() => handleExport('json')}
              className="px-3 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              JSON
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800 tracking-wide">Delivered Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cake Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    {hasActiveFilters 
                      ? 'No orders match your current filters. Try adjusting your search criteria.'
                      : 'No delivered orders found in the system.'
                    }
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.id}</div>
                        <div className="text-sm text-gray-500">#{order.orderNumber}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                        <div className="text-sm text-gray-500">{order.customerEmail}</div>
                        <div className="text-sm text-gray-500">{order.customerPhone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="font-medium">{order.cake}</div>
                        <div className="text-gray-500">{order.size}</div>
                        <div className="text-gray-500">{order.cream}</div>
                        {order.topping && (
                          <div className="text-gray-500 text-xs">{order.topping}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(order.deliveryDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(order.deliveryDate).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        KES {order.totalAmount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">{order.paymentMethod}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.paymentStatus === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {order.paymentStatus === 'completed' ? 'Completed' : 'Incomplete'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleOrderClick(order)}
                        className="text-purple-600 hover:text-purple-900 transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>


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
