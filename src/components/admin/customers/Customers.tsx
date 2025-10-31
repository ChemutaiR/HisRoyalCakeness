"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Customer } from '@/types/admin/customers';
import { useCustomers } from '@/hooks/admin/customers/useCustomers';
import CustomersHeader from './CustomersHeader';
import CustomersFilters from './CustomersFilters';
import CustomersTable from './CustomersTable';

export default function Customers() {
  const router = useRouter();
  const [_showAddModal, _setShowAddModal] = useState(false);

  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '#1001',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+254 700 123 456',
      joinDate: '2024-01-10',
      status: 'Active',
      orders: 5,
      totalSpent: 12500,
      avatar: 'JD',
      isDeactivated: false,
      isBlacklisted: false,
    },
    {
      id: '#1002',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+254 700 234 567',
      joinDate: '2024-01-15',
      status: 'Active',
      orders: 3,
      totalSpent: 8900,
      avatar: 'JS',
      isDeactivated: false,
      isBlacklisted: false,
    },
    {
      id: '#1003',
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      phone: '+254 700 345 678',
      joinDate: '2024-01-20',
      status: 'Pending',
      orders: 1,
      totalSpent: 3200,
      avatar: 'MJ',
      isDeactivated: false,
      isBlacklisted: false,
    },
    {
      id: '#1004',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      phone: '+254 700 456 789',
      joinDate: '2024-01-25',
      status: 'Inactive',
      orders: 0,
      totalSpent: 0,
      avatar: 'SW',
      isDeactivated: false,
      isBlacklisted: false,
    },
    {
      id: '#1005',
      name: 'David Brown',
      email: 'david.brown@email.com',
      phone: '+254 700 567 890',
      joinDate: '2024-02-01',
      status: 'Active',
      orders: 8,
      totalSpent: 21500,
      avatar: 'DB',
      isDeactivated: false,
      isBlacklisted: false,
    },
    {
      id: '#1006',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+254 700 678 901',
      joinDate: '2024-02-05',
      status: 'Active',
      orders: 2,
      totalSpent: 6400,
      avatar: 'ED',
      isDeactivated: false,
      isBlacklisted: false,
    },
    {
      id: '#1007',
      name: 'Robert Miller',
      email: 'robert.miller@email.com',
      phone: '+254 700 789 012',
      joinDate: '2024-02-10',
      status: 'Pending',
      orders: 1,
      totalSpent: 2800,
      avatar: 'RM',
      isDeactivated: false,
      isBlacklisted: false,
    },
    {
      id: '#1008',
      name: 'Lisa Garcia',
      email: 'lisa.garcia@email.com',
      phone: '+254 700 890 123',
      joinDate: '2024-02-15',
      status: 'Active',
      orders: 4,
      totalSpent: 11200,
      avatar: 'LG',
      isDeactivated: false,
      isBlacklisted: false,
    },
    {
      id: '#1009',
      name: 'Tom Anderson',
      email: 'tom.anderson@email.com',
      phone: '+254 700 901 234',
      joinDate: '2024-01-05',
      status: 'Deactivated',
      orders: 2,
      totalSpent: 4500,
      avatar: 'TA',
      isDeactivated: true,
      isBlacklisted: false,
    },
    {
      id: '#1010',
      name: 'Maria Rodriguez',
      email: 'maria.rodriguez@email.com',
      phone: '+254 700 012 345',
      joinDate: '2024-01-08',
      status: 'Blacklisted',
      orders: 0,
      totalSpent: 0,
      avatar: 'MR',
      isDeactivated: true,
      isBlacklisted: true,
    },
  ]);

  const {
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    clearSearch,
    activeCustomers,
    deactivatedCustomers,
    filteredCustomers,
  } = useCustomers({ customers });

  const handleCustomerClick = (customer: Customer) => {
    const customerId = customer.id.replace('#', '');
    router.push(`/admin/customers/${customerId}`);
  };

  const handleDeactivate = (id: string) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === id
          ? { ...customer, isDeactivated: true, status: 'Deactivated' }
          : customer
      )
    );
  };

  const handleBlacklist = (id: string) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === id
          ? { ...customer, isDeactivated: true, isBlacklisted: true, status: 'Blacklisted' }
          : customer
      )
    );
  };

  const handleReactivate = (id: string) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === id
          ? { ...customer, isDeactivated: false, isBlacklisted: false, status: 'Active' }
          : customer
      )
    );
  };

  return (
    <div className="py-8">
      <CustomersHeader />

      <CustomersFilters
        searchTerm={searchTerm}
        activeTab={activeTab}
        activeCount={activeCustomers.length}
        deactivatedCount={deactivatedCustomers.length}
        onSearchChange={setSearchTerm}
        onClearSearch={clearSearch}
        onTabChange={setActiveTab}
      />

      <CustomersTable
        customers={filteredCustomers}
        activeTab={activeTab}
        onCustomerClick={handleCustomerClick}
        onDeactivate={handleDeactivate}
        onBlacklist={handleBlacklist}
        onReactivate={handleReactivate}
      />
    </div>
  );
}
