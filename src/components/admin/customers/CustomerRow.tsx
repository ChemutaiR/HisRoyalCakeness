"use client";

import { Customer } from '@/types/admin/customers';
import { getStatusColor, getAvatarColor } from '@/utils/customers/statusUtils';
import CustomerActions from './CustomerActions';

interface CustomerRowProps {
  customer: Customer;
  isActiveTab: boolean;
  onCustomerClick: (customer: Customer) => void;
  onDeactivate: (id: string) => void;
  onBlacklist?: (id: string) => void;
  onReactivate: (id: string) => void;
}

export default function CustomerRow({
  customer,
  isActiveTab,
  onCustomerClick,
  onDeactivate,
  onBlacklist,
  onReactivate,
}: CustomerRowProps) {
  return (
    <tr
      className="hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={() => onCustomerClick(customer)}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div
              className={`h-10 w-10 rounded-full ${getAvatarColor(
                customer.name
              )} flex items-center justify-center`}
            >
              <span className="text-white font-medium">{customer.avatar}</span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{customer.name}</div>
            <div className="text-sm text-gray-500">{customer.id}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phone}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.joinDate}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
            customer.status
          )}`}
        >
          {customer.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {customer.orders} orders
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        KES {customer.totalSpent.toLocaleString()}
      </td>
      <td
        className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2"
        onClick={(e) => e.stopPropagation()}
      >
        <CustomerActions
          isActiveTab={isActiveTab}
          onDeactivate={() => onDeactivate(customer.id)}
          onBlacklist={onBlacklist ? () => onBlacklist(customer.id) : undefined}
          onReactivate={() => onReactivate(customer.id)}
        />
      </td>
    </tr>
  );
}

