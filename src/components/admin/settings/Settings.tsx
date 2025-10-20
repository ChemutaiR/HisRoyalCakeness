"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Globe, CreditCard, Truck, Bell, ArrowRight } from 'lucide-react';

export default function Settings() {
  const [hasUnsavedChanges] = useState(false);

  const settingsSections = [
    {
      id: 'business',
      name: 'Business Information',
      description: 'Configure your business details, hours, and contact information',
      icon: Globe,
      href: '/admin/settings/business',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'payment',
      name: 'Payment & Billing',
      description: 'Set up payment methods, pricing, and billing preferences',
      icon: CreditCard,
      href: '/admin/settings/payment',
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'delivery',
      name: 'Delivery Settings',
      description: 'Configure delivery zones, fees, and logistics',
      icon: Truck,
      href: '/admin/settings/delivery',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      description: 'Manage email notifications and alert preferences',
      icon: Bell,
      href: '/admin/settings/notifications',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const quickStats = [
    {
      label: 'Business Profile',
      value: 'Complete',
      status: 'success'
    },
    {
      label: 'Payment Setup',
      value: 'Pending',
      status: 'warning'
    },
    {
      label: 'Delivery Zones',
      value: '2 Active',
      status: 'success'
    },
    {
      label: 'Notifications',
      value: 'Enabled',
      status: 'success'
    }
  ];

  return (
    <div className="py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Settings Dashboard</h2>
          <p className="text-gray-600 text-base">Configure and manage your bakery&apos;s settings and preferences.</p>
        </div>
        {hasUnsavedChanges && (
          <div className="flex items-center gap-2 text-sm text-orange-600">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            Unsaved changes
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                stat.status === 'success' ? 'bg-green-500' : 
                stat.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.id}
              href={section.href}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 border border-gray-200 hover:border-[#c7b8ea] group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${section.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#c7b8ea] transition-colors duration-200">
                      {section.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {section.description}
                  </p>
                </div>
                <div className="ml-4">
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#c7b8ea] transition-colors duration-200" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Changes */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Changes</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Business hours updated</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">Business Settings</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Delivery zone added</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">Delivery Settings</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Email notifications enabled</p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">Notifications</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-[#c7b8ea] to-[#a8a3d9] rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
        <p className="text-sm opacity-90 mb-4">Common settings tasks you might need to perform</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/settings/business"
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Update Business Info
          </Link>
          <Link
            href="/admin/settings/payment"
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Configure Payments
          </Link>
          <Link
            href="/admin/settings/delivery"
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Set Delivery Zones
          </Link>
          <Link
            href="/admin/settings/notifications"
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Manage Notifications
          </Link>
        </div>
      </div>
    </div>
  );
}