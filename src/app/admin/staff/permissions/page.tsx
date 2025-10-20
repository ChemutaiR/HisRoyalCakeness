"use client";

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import PermissionsMatrix from '@/components/admin/staff/PermissionsMatrix';
import RolesTable from '@/components/admin/staff/RolesTable';
import { Shield, Users } from 'lucide-react';

export default function StaffPermissionsPage() {
  const [activeTab, setActiveTab] = useState<'matrix' | 'table'>('matrix');

  const tabs = [
    {
      id: 'matrix',
      name: 'Permissions Matrix',
      icon: Shield,
      description: 'Visual matrix to assign permissions to roles'
    },
    {
      id: 'table',
      name: 'Roles & Permissions',
      icon: Users,
      description: 'Detailed table view of roles and their assignments'
    }
  ];

  return (
    <AdminLayout 
      title="Staff Permissions" 
      description="Manage staff roles and permissions for your bakery"
    >
      <div className="p-6">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'matrix' | 'table')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-[#c7b8ea] text-[#c7b8ea]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Description */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm">
            {tabs.find(tab => tab.id === activeTab)?.description}
          </p>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'matrix' && <PermissionsMatrix />}
          {activeTab === 'table' && <RolesTable />}
        </div>
      </div>
    </AdminLayout>
  );
}