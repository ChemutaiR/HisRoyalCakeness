"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import RolePermissionForm, { RoleFormData } from '@/components/admin/staff/RolePermissionForm';

// Mock role data - replace with actual API call
const mockRoles = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full access to all system features and settings',
    permissions: ['orders:view', 'orders:create', 'orders:edit', 'orders:delete', 'customers:view', 'customers:edit', 'products:view', 'products:create', 'products:edit', 'products:delete', 'recipes:view', 'recipes:create', 'recipes:edit', 'recipes:delete', 'analytics:view', 'staff:view', 'staff:create', 'staff:edit', 'staff:delete', 'settings:view', 'settings:edit'],
    isDefault: true,
    createdAt: '2024-01-01',
    lastModified: '2024-01-15'
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Management access to most features except sensitive settings',
    permissions: ['orders:view', 'orders:create', 'orders:edit', 'customers:view', 'customers:edit', 'products:view', 'products:create', 'products:edit', 'recipes:view', 'recipes:create', 'recipes:edit', 'analytics:view', 'staff:view'],
    isDefault: true,
    createdAt: '2024-01-01',
    lastModified: '2024-01-10'
  },
  {
    id: 'staff',
    name: 'Staff',
    description: 'Basic staff access for daily operations',
    permissions: ['orders:view', 'orders:edit', 'customers:view', 'products:view', 'recipes:view'],
    isDefault: true,
    createdAt: '2024-01-01',
    lastModified: '2024-01-08'
  },
  {
    id: 'delivery',
    name: 'Delivery',
    description: 'Delivery and logistics access only',
    permissions: ['orders:view', 'orders:edit', 'customers:view'],
    isDefault: true,
    createdAt: '2024-01-01',
    lastModified: '2024-01-05'
  },
  {
    id: 'senior-baker',
    name: 'Senior Baker',
    description: 'Experienced baker with recipe management access',
    permissions: ['orders:view', 'products:view', 'products:edit', 'recipes:view', 'recipes:create', 'recipes:edit', 'customers:view'],
    isDefault: false,
    createdAt: '2024-01-12',
    lastModified: '2024-01-14'
  },
  {
    id: 'customer-service',
    name: 'Customer Service',
    description: 'Customer support and service management',
    permissions: ['orders:view', 'orders:edit', 'customers:view', 'customers:edit', 'products:view'],
    isDefault: false,
    createdAt: '2024-01-13',
    lastModified: '2024-01-13'
  }
];

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isDefault?: boolean;
}

export default function EditRolePage() {
  const router = useRouter();
  const params = useParams();
  const roleId = params?.roleId as string;
  
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchRole = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const foundRole = mockRoles.find(r => r.id === roleId);
        if (!foundRole) {
          setError('Role not found');
          return;
        }
        
        setRole(foundRole);
      } catch (err) {
        setError('Failed to load role');
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (roleId) {
      fetchRole();
    }
  }, [roleId]);

  const handleSave = async (data: RoleFormData) => {
    setIsSaving(true);
    try {
      // TODO: Replace with actual API call
      // await updateRole(roleId, data);
      // eslint-disable-next-line no-console
      console.log('Updating role:', roleId, data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Navigate back to permissions page on success
      router.push('/admin/staff/permissions');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to update role:', err);
      setError('Failed to update role');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/staff/permissions');
  };

  if (loading) {
    return (
      <AdminLayout title="Edit Role" description="Edit role and update permissions">
        <div className="p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c7b8ea] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading role...</p>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !role) {
    return (
      <AdminLayout title="Edit Role" description="Edit role and update permissions">
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800 mb-4">{error || 'Role not found'}</p>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-[#c7b8ea] text-black rounded-lg text-sm font-semibold hover:bg-[#c7b8ea]/80"
            >
              Back to Permissions
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Edit Role" 
      description="Edit role and update permissions"
    >
      <div className="p-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}
        <RolePermissionForm
          mode="edit"
          initialData={{
            name: role.name,
            description: role.description,
            permissions: role.permissions,
          }}
          onSave={handleSave}
          onCancel={handleCancel}
          isLoading={isSaving}
        />
      </div>
    </AdminLayout>
  );
}

