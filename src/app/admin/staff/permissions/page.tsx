"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import RolesTable from '@/components/admin/staff/RolesTable';

export default function StaffPermissionsPage() {
  return (
    <AdminLayout 
      title="Staff Permissions" 
      description="Manage staff roles and permissions for your bakery"
    >
      <div className="p-6">
        <RolesTable />
      </div>
    </AdminLayout>
  );
}