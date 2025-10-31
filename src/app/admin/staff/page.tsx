"use client";

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { StaffRole, AdminStaff } from '@/types/admin/staff';
import StaffTable from '@/components/admin/staff/StaffTable';
import { getDefaultPermissions } from '@/utils/admin/permissions';

export default function StaffPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [staff, setStaff] = useState<AdminStaff[]>([]);
  const [editingStaff, setEditingStaff] = useState<AdminStaff | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '' as StaffRole | '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.phone && formData.role) {
      const role = formData.role as StaffRole;
      const permissions = getDefaultPermissions(role);

      if (editingStaff) {
        // Update existing staff
        setStaff(prev => prev.map(member => 
          member.id === editingStaff.id 
            ? {
                ...member,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                role: role,
                permissions: permissions,
                updatedAt: new Date().toISOString(),
              }
            : member
        ));
        setEditingStaff(null);
      } else {
        // Add new staff
        const newStaff: AdminStaff = {
          id: `staff_${Date.now()}`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: role,
          permissions: permissions,
          isActive: true,
          hireDate: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setStaff(prev => [...prev, newStaff]);
      }
      
      // Reset form and close modal
      setFormData({ name: '', email: '', phone: '', role: '' });
      setShowAddModal(false);
    }
  };

  const handleEdit = (staffMember: AdminStaff) => {
    setEditingStaff(staffMember);
    setFormData({
      name: staffMember.name,
      email: staffMember.email,
      phone: staffMember.phone || '',
      role: staffMember.role,
    });
    setShowAddModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this staff member?')) {
      setStaff(prev => prev.filter(member => member.id !== id));
    }
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', phone: '', role: '' });
    setEditingStaff(null);
    setShowAddModal(false);
  };

  const isValid = formData.name && formData.email && formData.phone && formData.role;

  return (
    <AdminLayout 
      title="Staff Management" 
      description="Manage staff accounts and permissions"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Staff Management</h2>
            <p className="text-gray-600">Manage staff accounts and permissions</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#c7b8ea] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#c7b8ea]/80 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Staff
          </button>
        </div>

        {/* Staff Table */}
        <div className="mb-6">
          <StaffTable
            staff={staff}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {/* Add Staff Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">
                  {editingStaff ? 'Edit Staff Member' : 'Add New Staff'}
                </h3>
                <button 
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter staff name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role *
                  </label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => handleInputChange('role', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="supervisor">Supervisor</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="intern">Intern</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!isValid}
                  className="px-4 py-2 bg-[#c7b8ea] text-black rounded-lg text-sm font-semibold hover:bg-[#c7b8ea]/80 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingStaff ? 'Update Staff' : 'Add Staff'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
