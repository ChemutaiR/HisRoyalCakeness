"use client";

import { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';

export default function Promotions() {
  const [editingPromotion, setEditingPromotion] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const promotions = [
    {
      id: '#PROMO001',
      name: 'Birthday Special',
      description: 'Get 15% off on birthday cakes',
      discountType: 'Percentage',
      discountValue: 15,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'Active',
      usageCount: 45,
      maxUsage: 100,
      applicableProducts: ['All Cakes'],
      minOrderValue: 2000,
      code: 'BIRTHDAY15'
    },
    {
      id: '#PROMO002',
      name: 'First Order Discount',
      description: '20% off for first-time customers',
      discountType: 'Percentage',
      discountValue: 20,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'Active',
      usageCount: 23,
      maxUsage: 50,
      applicableProducts: ['All Cakes'],
      minOrderValue: 1500,
      code: 'FIRST20'
    },
    {
      id: '#PROMO003',
      name: 'Weekend Special',
      description: '10% off on all orders placed on weekends',
      discountType: 'Percentage',
      discountValue: 10,
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      status: 'Active',
      usageCount: 67,
      maxUsage: 200,
      applicableProducts: ['All Cakes'],
      minOrderValue: 1000,
      code: 'WEEKEND10'
    },
    {
      id: '#PROMO004',
      name: 'Chocolate Lovers',
      description: 'Flat KES 500 off on chocolate cakes',
      discountType: 'Fixed Amount',
      discountValue: 500,
      startDate: '2024-02-01',
      endDate: '2024-03-31',
      status: 'Active',
      usageCount: 12,
      maxUsage: 30,
      applicableProducts: ['Chocolate Cake', 'Chocolate Fudge', 'Black Forest'],
      minOrderValue: 3000,
      code: 'CHOCO500'
    },
    {
      id: '#PROMO005',
      name: 'Bulk Order Discount',
      description: '25% off on orders above 5kg',
      discountType: 'Percentage',
      discountValue: 25,
      startDate: '2024-01-15',
      endDate: '2024-12-31',
      status: 'Active',
      usageCount: 8,
      maxUsage: 25,
      applicableProducts: ['All Cakes'],
      minOrderValue: 5000,
      code: 'BULK25'
    },
    {
      id: '#PROMO006',
      name: 'Valentine Special',
      description: 'Red Velvet cakes at 15% off',
      discountType: 'Percentage',
      discountValue: 15,
      startDate: '2024-02-01',
      endDate: '2024-02-29',
      status: 'Expired',
      usageCount: 34,
      maxUsage: 50,
      applicableProducts: ['Red Velvet Cake'],
      minOrderValue: 2500,
      code: 'VALENTINE15'
    },
    {
      id: '#PROMO007',
      name: 'Referral Bonus',
      description: 'KES 1000 off when referred by existing customer',
      discountType: 'Fixed Amount',
      discountValue: 1000,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'Active',
      usageCount: 15,
      maxUsage: 100,
      applicableProducts: ['All Cakes'],
      minOrderValue: 4000,
      code: 'REFER1000'
    },
    {
      id: '#PROMO008',
      name: 'Holiday Special',
      description: '30% off on fruit cakes during holidays',
      discountType: 'Percentage',
      discountValue: 30,
      startDate: '2024-12-01',
      endDate: '2024-12-31',
      status: 'Scheduled',
      usageCount: 0,
      maxUsage: 20,
      applicableProducts: ['Light Fruit Cake', 'Rich Fruit Cake', 'Mild Fruit Cake'],
      minOrderValue: 3500,
      code: 'HOLIDAY30'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUsagePercentage = (usageCount: number, maxUsage: number) => {
    return Math.round((usageCount / maxUsage) * 100);
  };

  const handleEdit = (promotion: any) => {
    setEditingPromotion(promotion);
  };

  const handleDelete = () => {
    // Handle delete logic here
    // console.log('Delete promotion');
  };

  const handleAddPromotion = () => {
    setShowAddModal(true);
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-2">Promotions Management</h2>
      <div className="flex justify-end mb-4">
        <button 
          onClick={handleAddPromotion}
          className="flex items-center gap-2 bg-[#c7b8ea] text-black text-base font-semibold px-4 py-2 rounded-full shadow hover:bg-[#c7b8ea]/80 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Promotion
        </button>
      </div>
      <p className="text-gray-600 text-base mb-8">Manage promotional campaigns and discount codes.</p>
      
      {/* Promotions Management Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Active Promotions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promotion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {promotions.map(promotion => (
                <tr key={promotion.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{promotion.name}</div>
                      <div className="text-sm text-gray-500">{promotion.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {promotion.discountType === 'Percentage' ? `${promotion.discountValue}%` : `KES ${promotion.discountValue.toLocaleString()}`}
                    </div>
                    <div className="text-sm text-gray-500">Min: KES {promotion.minOrderValue.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{promotion.startDate}</div>
                    <div className="text-sm text-gray-500">to {promotion.endDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{promotion.usageCount}/{promotion.maxUsage}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${getUsagePercentage(promotion.usageCount, promotion.maxUsage)}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(promotion.status)}`}>
                      {promotion.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-gray-900">
                      {promotion.code}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      onClick={() => handleEdit(promotion)}
                      className="text-indigo-600 hover:text-indigo-900" 
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={handleDelete}
                      className="text-red-600 hover:text-red-900" 
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Promotion Modal */}
      {editingPromotion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Edit Promotion</h3>
              <button 
                onClick={() => setEditingPromotion(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Trash2 size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Promotion Name</label>
                <input 
                  type="text" 
                  defaultValue={editingPromotion.name}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  defaultValue={editingPromotion.description}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type</label>
                  <select 
                    defaultValue={editingPromotion.discountType}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Percentage">Percentage</option>
                    <option value="Fixed Amount">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Discount Value</label>
                  <input 
                    type="number" 
                    defaultValue={editingPromotion.discountValue}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input 
                    type="date" 
                    defaultValue={editingPromotion.startDate}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input 
                    type="date" 
                    defaultValue={editingPromotion.endDate}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Order Value</label>
                  <input 
                    type="number" 
                    defaultValue={editingPromotion.minOrderValue}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Usage</label>
                  <input 
                    type="number" 
                    defaultValue={editingPromotion.maxUsage}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Promotion Code</label>
                <input 
                  type="text" 
                  defaultValue={editingPromotion.code}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select 
                  defaultValue={editingPromotion.status}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Paused">Paused</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  onClick={() => setEditingPromotion(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Promotion Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add New Promotion</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Trash2 size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Promotion Name</label>
                <input 
                  type="text" 
                  placeholder="Enter promotion name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  placeholder="Enter promotion description"
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type</label>
                  <select 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Percentage">Percentage</option>
                    <option value="Fixed Amount">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Discount Value</label>
                  <input 
                    type="number" 
                    placeholder="0"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input 
                    type="date" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input 
                    type="date" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Order Value</label>
                  <input 
                    type="number" 
                    placeholder="0"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Usage</label>
                  <input 
                    type="number" 
                    placeholder="0"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Promotion Code</label>
                <input 
                  type="text" 
                  placeholder="Enter promotion code"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Paused">Paused</option>
                  <option value="Scheduled">Scheduled</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Promotion
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 