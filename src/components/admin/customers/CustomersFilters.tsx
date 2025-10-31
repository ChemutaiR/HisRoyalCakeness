"use client";

import { Search, X } from 'lucide-react';
import { CustomerTab } from '@/types/admin/customers';

interface CustomersFiltersProps {
  searchTerm: string;
  activeTab: CustomerTab;
  activeCount: number;
  deactivatedCount: number;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onTabChange: (tab: CustomerTab) => void;
}

export default function CustomersFilters({
  searchTerm,
  activeTab,
  activeCount,
  deactivatedCount,
  onSearchChange,
  onClearSearch,
  onTabChange,
}: CustomersFiltersProps) {
  return (
    <div className="mb-6">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search customers by name, email, phone, or ID..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border-b border-gray-300 bg-transparent placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-[#c7b8ea] sm:text-sm"
          />
          {searchTerm && (
            <button
              onClick={onClearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => onTabChange('active')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'active'
                ? 'border-[#c7b8ea] text-[#c7b8ea]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Active Customers ({activeCount})
          </button>
          <button
            onClick={() => onTabChange('deactivated')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'deactivated'
                ? 'border-[#c7b8ea] text-[#c7b8ea]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Deactivated Customers ({deactivatedCount})
          </button>
        </nav>
      </div>
    </div>
  );
}

