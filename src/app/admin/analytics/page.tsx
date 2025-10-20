"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import Analytics from '@/components/admin/analytics/Analytics';

export default function AnalyticsPage() {
  return (
    <AdminLayout 
      title="Analytics" 
      description="Monitor sales, revenue, and product performance"
    >
      <Analytics />
    </AdminLayout>
  );
}
