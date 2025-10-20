"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import Settings from '@/components/admin/settings/Settings';

export default function SettingsPage() {
  return (
    <AdminLayout 
      title="Settings" 
      description="Configure business and application settings"
    >
      <Settings />
    </AdminLayout>
  );
}
