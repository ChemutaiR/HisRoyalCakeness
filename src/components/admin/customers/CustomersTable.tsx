"use client";

import { Customer } from '@/types/admin/customers';
import CustomerRow from './CustomerRow';

interface CustomersTableProps {
  customers: Customer[];
  activeTab: 'active' | 'deactivated';
  onCustomerClick: (customer: Customer) => void;
  onDeactivate: (id: string) => void;
  onBlacklist: (id: string) => void;
  onReactivate: (id: string) => void;
}

export default function CustomersTable({
  customers,
  activeTab,
  onCustomerClick,
  onDeactivate,
  onBlacklist,
  onReactivate,
}: CustomersTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">
          {activeTab === 'active'
            ? 'Active Customer Accounts'
            : 'Deactivated Customer Accounts'}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Join Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Orders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Spent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <CustomerRow
                key={customer.id}
                customer={customer}
                isActiveTab={activeTab === 'active'}
                onCustomerClick={onCustomerClick}
                onDeactivate={onDeactivate}
                onBlacklist={onBlacklist}
                onReactivate={onReactivate}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

