"use client";

import { useState } from 'react';
import { Check, X, Plus, Trash2, Edit, XCircle } from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isDefault?: boolean;
}

export default function PermissionsMatrix() {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'admin',
      name: 'Administrator',
      description: 'Full access to all system features',
      permissions: ['orders:view', 'orders:create', 'orders:edit', 'orders:delete', 'customers:view', 'customers:edit', 'products:view', 'products:create', 'products:edit', 'products:delete', 'recipes:view', 'recipes:create', 'recipes:edit', 'recipes:delete', 'analytics:view', 'staff:view', 'staff:create', 'staff:edit', 'staff:delete', 'settings:view', 'settings:edit'],
      isDefault: true
    },
    {
      id: 'manager',
      name: 'Manager',
      description: 'Management access to most features',
      permissions: ['orders:view', 'orders:create', 'orders:edit', 'customers:view', 'customers:edit', 'products:view', 'products:create', 'products:edit', 'recipes:view', 'recipes:create', 'recipes:edit', 'analytics:view', 'staff:view'],
      isDefault: true
    },
    {
      id: 'staff',
      name: 'Staff',
      description: 'Basic staff access',
      permissions: ['orders:view', 'orders:edit', 'customers:view', 'products:view', 'recipes:view'],
      isDefault: true
    },
    {
      id: 'delivery',
      name: 'Delivery',
      description: 'Delivery and logistics access',
      permissions: ['orders:view', 'orders:edit', 'customers:view'],
      isDefault: true
    }
  ]);

  const [permissions] = useState<Permission[]>([
    // Orders
    { id: 'orders:view', name: 'View Orders', description: 'View order details and status', category: 'Orders' },
    { id: 'orders:create', name: 'Create Orders', description: 'Create new orders', category: 'Orders' },
    { id: 'orders:edit', name: 'Edit Orders', description: 'Modify existing orders', category: 'Orders' },
    { id: 'orders:delete', name: 'Delete Orders', description: 'Remove orders from system', category: 'Orders' },
    
    // Customers
    { id: 'customers:view', name: 'View Customers', description: 'View customer information', category: 'Customers' },
    { id: 'customers:edit', name: 'Edit Customers', description: 'Modify customer details', category: 'Customers' },
    
    // Products
    { id: 'products:view', name: 'View Products', description: 'View product catalog', category: 'Products' },
    { id: 'products:create', name: 'Create Products', description: 'Add new products', category: 'Products' },
    { id: 'products:edit', name: 'Edit Products', description: 'Modify product details', category: 'Products' },
    { id: 'products:delete', name: 'Delete Products', description: 'Remove products from catalog', category: 'Products' },
    
    // Recipes
    { id: 'recipes:view', name: 'View Recipes', description: 'View recipe details', category: 'Recipes' },
    { id: 'recipes:create', name: 'Create Recipes', description: 'Add new recipes', category: 'Recipes' },
    { id: 'recipes:edit', name: 'Edit Recipes', description: 'Modify existing recipes', category: 'Recipes' },
    { id: 'recipes:delete', name: 'Delete Recipes', description: 'Remove recipes from system', category: 'Recipes' },
    
    // Analytics
    { id: 'analytics:view', name: 'View Analytics', description: 'Access reports and analytics', category: 'Analytics' },
    
    // Staff
    { id: 'staff:view', name: 'View Staff', description: 'View staff member information', category: 'Staff' },
    { id: 'staff:create', name: 'Create Staff', description: 'Add new staff members', category: 'Staff' },
    { id: 'staff:edit', name: 'Edit Staff', description: 'Modify staff details', category: 'Staff' },
    { id: 'staff:delete', name: 'Delete Staff', description: 'Remove staff members', category: 'Staff' },
    
    // Settings
    { id: 'settings:view', name: 'View Settings', description: 'View system settings', category: 'Settings' },
    { id: 'settings:edit', name: 'Edit Settings', description: 'Modify system settings', category: 'Settings' }
  ]);

  const [editingRole, setEditingRole] = useState<string | null>(null);
  const [newRole, setNewRole] = useState({ name: '', description: '' });
  const [showAddRole, setShowAddRole] = useState(false);

  const categories = Array.from(new Set(permissions.map(p => p.category)));

  const togglePermission = (roleId: string, permissionId: string) => {
    setRoles(prev => prev.map(role => {
      if (role.id === roleId) {
        const hasPermission = role.permissions.includes(permissionId);
        return {
          ...role,
          permissions: hasPermission
            ? role.permissions.filter(p => p !== permissionId)
            : [...role.permissions, permissionId]
        };
      }
      return role;
    }));
  };

  const addNewRole = () => {
    if (newRole.name.trim()) {
      const role: Role = {
        id: newRole.name.toLowerCase().replace(/\s+/g, '-'),
        name: newRole.name,
        description: newRole.description,
        permissions: []
      };
      setRoles(prev => [...prev, role]);
      setNewRole({ name: '', description: '' });
      setShowAddRole(false);
    }
  };

  const deleteRole = (roleId: string) => {
    setRoles(prev => prev.filter(role => role.id !== roleId));
  };

  const getPermissionCount = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.permissions.length : 0;
  };

  return (
    <div className="py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Permissions Matrix</h2>
          <p className="text-gray-600 text-base">Manage role permissions and access levels for your staff.</p>
        </div>
        <button
          onClick={() => setShowAddRole(true)}
          className="bg-[#c7b8ea] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#c7b8ea]/80 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Role
        </button>
      </div>

      {/* Add Role Modal */}
      {showAddRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Role</h3>
              <button
                onClick={() => setShowAddRole(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                <input
                  type="text"
                  value={newRole.name}
                  onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Senior Baker, Customer Service"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newRole.description}
                  onChange={(e) => setNewRole(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the role's responsibilities..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddRole(false)}
                className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={addNewRole}
                className="px-4 py-2 bg-[#c7b8ea] text-black rounded text-sm font-semibold hover:bg-[#c7b8ea]/80"
              >
                Add Role
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Matrix Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                  Role
                </th>
                {categories.map(category => (
                  <th key={category} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {category}
                  </th>
                ))}
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {roles.map(role => (
                <tr key={role.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                        {role.name}
                        {role.isDefault && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">{role.description}</div>
                    </div>
                  </td>
                  {categories.map(category => {
                    const categoryPermissions = permissions.filter(p => p.category === category);
                    const rolePermissions = role.permissions.filter(p => 
                      categoryPermissions.some(cp => cp.id === p)
                    );
                    return (
                      <td key={category} className="px-4 py-4 text-center">
                        <div className="flex justify-center">
                          <span className="text-sm text-gray-600">
                            {rolePermissions.length}/{categoryPermissions.length}
                          </span>
                        </div>
                      </td>
                    );
                  })}
                  <td className="px-4 py-4 text-center">
                    <span className="text-sm font-medium text-gray-900">
                      {getPermissionCount(role.id)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => setEditingRole(editingRole === role.id ? null : role.id)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit Permissions"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {!role.isDefault && (
                        <button
                          onClick={() => deleteRole(role.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete Role"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Permissions View */}
      {editingRole && (
        <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">
              Edit Permissions: {roles.find(r => r.id === editingRole)?.name}
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {categories.map(category => {
                const categoryPermissions = permissions.filter(p => p.category === category);
                const role = roles.find(r => r.id === editingRole);
                if (!role) return null;

                return (
                  <div key={category}>
                    <h4 className="text-md font-semibold text-gray-800 mb-3">{category}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {categoryPermissions.map(permission => {
                        const hasPermission = role.permissions.includes(permission.id);
                        return (
                          <div
                            key={permission.id}
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                              hasPermission
                                ? 'border-green-200 bg-green-50'
                                : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                            }`}
                            onClick={() => togglePermission(role.id, permission.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  {hasPermission ? (
                                    <Check className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <X className="w-4 h-4 text-gray-400" />
                                  )}
                                  <span className="text-sm font-medium text-gray-900">
                                    {permission.name}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  {permission.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end mt-6 pt-4 border-t">
              <button
                onClick={() => setEditingRole(null)}
                className="px-4 py-2 bg-[#c7b8ea] text-black rounded text-sm font-semibold hover:bg-[#c7b8ea]/80"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
