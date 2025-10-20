"use client";

import { useState } from 'react';
import { Users, Shield, Edit, Trash2, Search, Eye, X } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  staffCount: number;
  isDefault: boolean;
  createdAt: string;
  lastModified: string;
}

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

export default function RolesTable() {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'admin',
      name: 'Administrator',
      description: 'Full access to all system features and settings',
      permissions: ['orders:view', 'orders:create', 'orders:edit', 'orders:delete', 'customers:view', 'customers:edit', 'products:view', 'products:create', 'products:edit', 'products:delete', 'recipes:view', 'recipes:create', 'recipes:edit', 'recipes:delete', 'analytics:view', 'staff:view', 'staff:create', 'staff:edit', 'staff:delete', 'settings:view', 'settings:edit'],
      staffCount: 1,
      isDefault: true,
      createdAt: '2024-01-01',
      lastModified: '2024-01-15'
    },
    {
      id: 'manager',
      name: 'Manager',
      description: 'Management access to most features except sensitive settings',
      permissions: ['orders:view', 'orders:create', 'orders:edit', 'customers:view', 'customers:edit', 'products:view', 'products:create', 'products:edit', 'recipes:view', 'recipes:create', 'recipes:edit', 'analytics:view', 'staff:view'],
      staffCount: 2,
      isDefault: true,
      createdAt: '2024-01-01',
      lastModified: '2024-01-10'
    },
    {
      id: 'staff',
      name: 'Staff',
      description: 'Basic staff access for daily operations',
      permissions: ['orders:view', 'orders:edit', 'customers:view', 'products:view', 'recipes:view'],
      staffCount: 5,
      isDefault: true,
      createdAt: '2024-01-01',
      lastModified: '2024-01-08'
    },
    {
      id: 'delivery',
      name: 'Delivery',
      description: 'Delivery and logistics access only',
      permissions: ['orders:view', 'orders:edit', 'customers:view'],
      staffCount: 3,
      isDefault: true,
      createdAt: '2024-01-01',
      lastModified: '2024-01-05'
    },
    {
      id: 'senior-baker',
      name: 'Senior Baker',
      description: 'Experienced baker with recipe management access',
      permissions: ['orders:view', 'products:view', 'products:edit', 'recipes:view', 'recipes:create', 'recipes:edit', 'customers:view'],
      staffCount: 2,
      isDefault: false,
      createdAt: '2024-01-12',
      lastModified: '2024-01-14'
    },
    {
      id: 'customer-service',
      name: 'Customer Service',
      description: 'Customer support and service management',
      permissions: ['orders:view', 'orders:edit', 'customers:view', 'customers:edit', 'products:view'],
      staffCount: 1,
      isDefault: false,
      createdAt: '2024-01-13',
      lastModified: '2024-01-13'
    }
  ]);

  const [staffMembers] = useState<StaffMember[]>([
    { id: '1', name: 'John Smith', email: 'john@bakery.com', role: 'admin', status: 'active', lastLogin: '2024-01-15' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah@bakery.com', role: 'manager', status: 'active', lastLogin: '2024-01-15' },
    { id: '3', name: 'Mike Wilson', email: 'mike@bakery.com', role: 'manager', status: 'active', lastLogin: '2024-01-14' },
    { id: '4', name: 'Emily Brown', email: 'emily@bakery.com', role: 'staff', status: 'active', lastLogin: '2024-01-15' },
    { id: '5', name: 'David Lee', email: 'david@bakery.com', role: 'staff', status: 'active', lastLogin: '2024-01-14' },
    { id: '6', name: 'Lisa Davis', email: 'lisa@bakery.com', role: 'staff', status: 'active', lastLogin: '2024-01-15' },
    { id: '7', name: 'Tom Anderson', email: 'tom@bakery.com', role: 'delivery', status: 'active', lastLogin: '2024-01-15' },
    { id: '8', name: 'Maria Garcia', email: 'maria@bakery.com', role: 'senior-baker', status: 'active', lastLogin: '2024-01-14' },
    { id: '9', name: 'Alex Chen', email: 'alex@bakery.com', role: 'customer-service', status: 'active', lastLogin: '2024-01-15' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'default' | 'custom'>('all');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showRoleDetails, setShowRoleDetails] = useState(false);

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'default' && role.isDefault) ||
                         (filterType === 'custom' && !role.isDefault);
    
    return matchesSearch && matchesFilter;
  });

  const getRoleStaff = (roleId: string) => {
    return staffMembers.filter(staff => staff.role === roleId);
  };

  const getPermissionCount = (permissions: string[]) => {
    return permissions.length;
  };

  const getPermissionCategories = (permissions: string[]) => {
    const categories = new Set<string>();
    permissions.forEach(permission => {
      const category = permission.split(':')[0];
      categories.add(category);
    });
    return Array.from(categories);
  };

  const handleViewRole = (role: Role) => {
    setSelectedRole(role);
    setShowRoleDetails(true);
  };

  const handleDeleteRole = (roleId: string) => {
    if (confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
      setRoles(prev => prev.filter(role => role.id !== roleId));
    }
  };

  return (
    <div className="py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Roles & Permissions</h2>
          <p className="text-gray-600 text-base">Manage staff roles and track permission assignments.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>Total Roles: {roles.length}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]"
              />
            </div>
          </div>
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'default' | 'custom')}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]"
            >
              <option value="all">All Roles</option>
              <option value="default">Default Roles</option>
              <option value="custom">Custom Roles</option>
            </select>
          </div>
        </div>
      </div>

      {/* Roles Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Role Management</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Count</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRoles.map(role => (
                <tr key={role.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-[#c7b8ea] text-black rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{role.name}</div>
                        <div className="text-sm text-gray-500">ID: {role.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs">
                      <p className="line-clamp-2">{role.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{role.staffCount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div className="font-medium">{getPermissionCount(role.permissions)} permissions</div>
                      <div className="text-xs text-gray-500">
                        {getPermissionCategories(role.permissions).join(', ')}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      role.isDefault 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {role.isDefault ? 'Default' : 'Custom'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {role.lastModified}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleViewRole(role)}
                      className="text-blue-600 hover:text-blue-900"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      title="Edit Role"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    {!role.isDefault && (
                      <button
                        onClick={() => handleDeleteRole(role.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Role"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Details Modal */}
      {showRoleDetails && selectedRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Role Details: {selectedRole.name}</h3>
              <button
                onClick={() => setShowRoleDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Role Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Role Information</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Name:</span> {selectedRole.name}</div>
                  <div><span className="font-medium">ID:</span> {selectedRole.id}</div>
                  <div><span className="font-medium">Type:</span> 
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      selectedRole.isDefault ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {selectedRole.isDefault ? 'Default' : 'Custom'}
                    </span>
                  </div>
                  <div><span className="font-medium">Created:</span> {selectedRole.createdAt}</div>
                  <div><span className="font-medium">Last Modified:</span> {selectedRole.lastModified}</div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
                <p className="text-sm text-gray-600">{selectedRole.description}</p>
              </div>
            </div>

            {/* Staff Members */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-3">Staff Members ({getRoleStaff(selectedRole.id).length})</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                {getRoleStaff(selectedRole.id).length > 0 ? (
                  <div className="space-y-2">
                    {getRoleStaff(selectedRole.id).map(staff => (
                      <div key={staff.id} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                        <div>
                          <div className="font-medium text-gray-900">{staff.name}</div>
                          <div className="text-sm text-gray-500">{staff.email}</div>
                        </div>
                        <div className="text-sm text-gray-500">
                          Last login: {staff.lastLogin}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No staff members assigned to this role.</p>
                )}
              </div>
            </div>

            {/* Permissions */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Permissions ({selectedRole.permissions.length})</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedRole.permissions.map(permission => (
                    <div key={permission} className="flex items-center gap-2 text-sm">
                      <Shield className="w-3 h-3 text-green-600" />
                      <span className="text-gray-700">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 pt-4 border-t">
              <button
                onClick={() => setShowRoleDetails(false)}
                className="px-4 py-2 bg-[#c7b8ea] text-black rounded text-sm font-semibold hover:bg-[#c7b8ea]/80"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
