"use client";

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

interface StaffDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function StaffDetailPage({ params }: StaffDetailPageProps) {
  const [id, setId] = useState<string>('');

  useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  if (!id) {
    return (
      <AdminLayout 
        title="Loading..." 
        description="Loading staff details..."
      >
        <div className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c7b8ea] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading staff details...</p>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Staff Profile" 
      description={`View and edit staff member for ID: ${id}`}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Staff Profile</h2>
        <p className="text-gray-600">Staff profile and edit functionality will be implemented here.</p>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Staff ID: {id}</p>
        </div>
      </div>
    </AdminLayout>
  );
}
