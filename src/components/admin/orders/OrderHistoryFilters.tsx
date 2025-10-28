/**
 * Order History Filters Component
 * 
 * Provides filter controls for order history
 */

import React from 'react';
import { Search, Filter, X, Calendar, User, Mail, DollarSign } from 'lucide-react';
import { OrderHistoryFiltersProps } from '@/types/admin/orderHistory';

export default function OrderHistoryFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  isLoading = false
}: OrderHistoryFiltersProps) {
  const handleInputChange = (field: keyof typeof filters, value: string | number | undefined) => {
    onFiltersChange({ [field]: value });
  };

  const handleClearFilter = (field: keyof typeof filters) => {
    onFiltersChange({ [field]: field.includes('Total') ? undefined : '' });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        <button
          onClick={onClearFilters}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          <X className="w-4 h-4" />
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Search Query */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={filters.searchQuery || ''}
              onChange={(e) => handleInputChange('searchQuery', e.target.value)}
              placeholder="Search orders..."
              className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isLoading}
            />
            {filters.searchQuery && (
              <button
                onClick={() => handleClearFilter('searchQuery')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Date From */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="w-4 h-4 inline mr-1" />
            From Date
          </label>
          <input
            type="date"
            value={filters.dateFrom || ''}
            onChange={(e) => handleInputChange('dateFrom', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        {/* Date To */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="w-4 h-4 inline mr-1" />
            To Date
          </label>
          <input
            type="date"
            value={filters.dateTo || ''}
            onChange={(e) => handleInputChange('dateTo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        {/* Customer Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <User className="w-4 h-4 inline mr-1" />
            Customer Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={filters.customerName || ''}
              onChange={(e) => handleInputChange('customerName', e.target.value)}
              placeholder="Enter customer name..."
              className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isLoading}
            />
            {filters.customerName && (
              <button
                onClick={() => handleClearFilter('customerName')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Customer Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Mail className="w-4 h-4 inline mr-1" />
            Customer Email
          </label>
          <div className="relative">
            <input
              type="email"
              value={filters.customerEmail || ''}
              onChange={(e) => handleInputChange('customerEmail', e.target.value)}
              placeholder="Enter email..."
              className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isLoading}
            />
            {filters.customerEmail && (
              <button
                onClick={() => handleClearFilter('customerEmail')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Min Total */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <DollarSign className="w-4 h-4 inline mr-1" />
            Min Total (KES)
          </label>
          <div className="relative">
            <input
              type="number"
              value={filters.minTotal || ''}
              onChange={(e) => handleInputChange('minTotal', e.target.value ? Number(e.target.value) : undefined)}
              placeholder="0"
              min="0"
              step="0.01"
              className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isLoading}
            />
            {filters.minTotal && (
              <button
                onClick={() => handleClearFilter('minTotal')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Max Total */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <DollarSign className="w-4 h-4 inline mr-1" />
            Max Total (KES)
          </label>
          <div className="relative">
            <input
              type="number"
              value={filters.maxTotal || ''}
              onChange={(e) => handleInputChange('maxTotal', e.target.value ? Number(e.target.value) : undefined)}
              placeholder="No limit"
              min="0"
              step="0.01"
              className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isLoading}
            />
            {filters.maxTotal && (
              <button
                onClick={() => handleClearFilter('maxTotal')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters Summary */}
      {Object.values(filters).some(value => value !== undefined && value !== '' && value !== null) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600">Active filters:</span>
            {filters.dateFrom && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                From: {filters.dateFrom}
              </span>
            )}
            {filters.dateTo && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                To: {filters.dateTo}
              </span>
            )}
            {filters.customerName && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Customer: {filters.customerName}
              </span>
            )}
            {filters.customerEmail && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Email: {filters.customerEmail}
              </span>
            )}
            {filters.minTotal && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                Min: KES {filters.minTotal}
              </span>
            )}
            {filters.maxTotal && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                Max: KES {filters.maxTotal}
              </span>
            )}
            {filters.searchQuery && (
              <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                Search: {filters.searchQuery}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
