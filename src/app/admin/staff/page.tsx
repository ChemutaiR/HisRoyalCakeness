"use client";

import AdminLayout from '@/components/admin/AdminLayout';

export default function StaffPage() {
  return (
    <AdminLayout 
      title="Staff Management" 
      description="Manage staff accounts and permissions"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Staff Management</h2>
        <p className="text-gray-600">Staff management functionality will be implemented here.</p>
      </div>
    </AdminLayout>
  );
}
