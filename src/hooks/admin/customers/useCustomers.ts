"use client";

import { useMemo, useState } from 'react';
import { Customer, CustomerTab } from '@/types/admin/customers';

interface UseCustomersProps {
  customers: Customer[];
  initialTab?: CustomerTab;
  initialSearchTerm?: string;
}

/**
 * Hook for managing customer data, filtering, and search
 */
export function useCustomers({
  customers,
  initialTab = 'active',
  initialSearchTerm = '',
}: UseCustomersProps) {
  const [activeTab, setActiveTab] = useState<CustomerTab>(initialTab);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  // Filter customers based on active tab and search term
  const { activeCustomers, deactivatedCustomers, filteredCustomers } = useMemo(() => {
    const active = customers.filter((customer) => !customer.isDeactivated);
    const deactivated = customers.filter((customer) => customer.isDeactivated);

    const filterBySearch = (customerList: Customer[]) => {
      if (!searchTerm) return customerList;

      const term = searchTerm.toLowerCase();
      return customerList.filter(
        (customer) =>
          customer.name.toLowerCase().includes(term) ||
          customer.email.toLowerCase().includes(term) ||
          customer.phone.includes(searchTerm) ||
          customer.id.toLowerCase().includes(term)
      );
    };

    return {
      activeCustomers: filterBySearch(active),
      deactivatedCustomers: filterBySearch(deactivated),
      filteredCustomers:
        activeTab === 'active' ? filterBySearch(active) : filterBySearch(deactivated),
    };
  }, [customers, activeTab, searchTerm]);

  const clearSearch = () => {
    setSearchTerm('');
  };

  return {
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    clearSearch,
    activeCustomers,
    deactivatedCustomers,
    filteredCustomers,
  };
}

