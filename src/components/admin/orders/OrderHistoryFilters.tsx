"use client";

import { DatePicker, Input } from '@/components/ui';

interface OrderHistoryFiltersProps {
  searchQuery: string;
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  isLoading: boolean;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onDateFromChange: (date: Date | undefined) => void;
  onDateToChange: (date: Date | undefined) => void;
  onClearFilters: () => void;
}

export default function OrderHistoryFilters({
  searchQuery,
  dateFrom,
  dateTo,
  isLoading,
  hasActiveFilters,
  onSearchChange,
  onDateFromChange,
  onDateToChange,
  onClearFilters,
}: OrderHistoryFiltersProps) {
  return (
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
            onChange={(e) => onSearchChange(e.target.value)}
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
            onChange={onDateFromChange}
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
            onChange={onDateToChange}
            placeholder="Select end date"
            disabled={isLoading}
          />
        </div>

        {/* Clear Button */}
        {hasActiveFilters && (
          <div className="flex items-end">
            <button
              onClick={onClearFilters}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
