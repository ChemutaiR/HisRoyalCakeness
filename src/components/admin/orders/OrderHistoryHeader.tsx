"use client";

import { RefreshCw, Download } from 'lucide-react';

interface OrderHistoryHeaderProps {
  filteredCount: number;
  hasActiveFilters: boolean;
  isLoading: boolean;
  onRefresh: () => void;
  onExportCSV: () => void;
  onExportJSON: () => void;
}

export default function OrderHistoryHeader({
  filteredCount,
  hasActiveFilters,
  isLoading,
  onRefresh,
  onExportCSV,
  onExportJSON,
}: OrderHistoryHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Delivered Orders ({filteredCount})
        </h2>
        {hasActiveFilters && (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            Filtered
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
        <div className="flex items-center gap-1">
          <button
            onClick={onExportCSV}
            className="px-3 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            CSV
          </button>
          <button
            onClick={onExportJSON}
            className="px-3 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            JSON
          </button>
        </div>
      </div>
    </div>
  );
}

