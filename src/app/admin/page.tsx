"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';

const ADMIN_TABS = [
  { name: 'Manage Orders', key: 'manageorders', path: '/admin/orders', description: 'View and manage current orders' },
  { name: 'Order History', key: 'orderhistory', path: '/admin/orders/history', description: 'Review past orders and their details' },
  { name: 'Analytics', key: 'analytics', path: '/admin/analytics', description: 'Monitor sales, revenue, and product performance' },
  { name: 'Products', key: 'products', path: '/admin/products', description: 'Manage cake and product listings' },
  { name: 'Customers', key: 'customers', path: '/admin/customers', description: 'View and manage customer accounts' },
  { name: 'Recipes', key: 'recipes', path: '/admin/recipes', description: 'Manage cake recipes and ingredients' },
  { name: 'Promotions', key: 'promotions', path: '/admin/promotions', description: 'Create and manage discounts and promotions' },
  { name: 'Reviews', key: 'reviews', path: '/admin/reviews', description: 'Moderate customer reviews and feedback' },
  { name: 'Settings', key: 'settings', path: '/admin/settings', description: 'Configure business and application settings' },
  { name: 'Staff', key: 'staff', path: '/admin/staff', description: 'Manage staff accounts and permissions' },
];

export default function AdminPage() {
  // TODO: Replace with Redux state management
  // const isAuthenticated = true; // Temporary placeholder - set to true to allow access
  // const user = { role: 'admin' }; // Temporary placeholder

  return (
    <AdminLayout 
      title="Admin Dashboard" 
      description="Manage your bakery operations"
    >
          
          {/* Admin Navigation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADMIN_TABS.map((tab) => (
              <Link
                key={tab.key}
                href={tab.path}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 border border-gray-200 hover:border-[#c7b8ea] group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#c7b8ea] transition-colors duration-200">
                      {tab.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {tab.description}
                    </p>
                  </div>
                  <div className="ml-4">
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-[#c7b8ea] transition-colors duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Stats Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Today&apos;s Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">KES 0</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Customers</p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Products</p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </AdminLayout>
  );
}