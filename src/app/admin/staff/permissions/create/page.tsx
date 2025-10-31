"use client";

import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import RolePermissionForm, { RoleFormData } from '@/components/admin/staff/RolePermissionForm';
import { useState } from 'react';

export default function CreateRolePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (data: RoleFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call
      // await createRole(data);
      // eslint-disable-next-line no-console
      console.log('Creating role:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Navigate back to permissions page on success
      router.push('/admin/staff/permissions');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to create role:', err);
      setError('Failed to create role. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/staff/permissions');
  };

  return (
    <AdminLayout 
      title="Create Role" 
      description="Create a new role and assign permissions"
    >
      <div className="p-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}
        <RolePermissionForm
          mode="create"
          onSave={handleSave}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </AdminLayout>
  );
}

