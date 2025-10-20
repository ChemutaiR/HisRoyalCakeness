"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, X, Shield, ShieldOff, Trash2, Search } from 'lucide-react';

export default function Customers() {
  const router = useRouter();
  const [editingCustomer, setEditingCustomer] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'deactivated'>('active');
  const [searchTerm, setSearchTerm] = useState('');

  const [customers, setCustomers] = useState([
    {
      id: '#1001',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+254 700 123 456',
      joinDate: '2024-01-10',
      status: 'Active',
      orders: 5,
      totalSpent: 12500,
      avatar: 'JD',
      isDeactivated: false,
      isBlacklisted: false
    },
    {
      id: '#1002',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+254 700 234 567',
      joinDate: '2024-01-15',
      status: 'Active',
      orders: 3,
      totalSpent: 8900,
      avatar: 'JS',
      isDeactivated: false,
      isBlacklisted: false
    },
    {
      id: '#1003',
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      phone: '+254 700 345 678',
      joinDate: '2024-01-20',
      status: 'Pending',
      orders: 1,
      totalSpent: 3200,
      avatar: 'MJ',
      isDeactivated: false,
      isBlacklisted: false
    },
    {
      id: '#1004',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      phone: '+254 700 456 789',
      joinDate: '2024-01-25',
      status: 'Inactive',
      orders: 0,
      totalSpent: 0,
      avatar: 'SW',
      isDeactivated: false,
      isBlacklisted: false
    },
    {
      id: '#1005',
      name: 'David Brown',
      email: 'david.brown@email.com',
      phone: '+254 700 567 890',
      joinDate: '2024-02-01',
      status: 'Active',
      orders: 8,
      totalSpent: 21500,
      avatar: 'DB',
      isDeactivated: false,
      isBlacklisted: false
    },
    {
      id: '#1006',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+254 700 678 901',
      joinDate: '2024-02-05',
      status: 'Active',
      orders: 2,
      totalSpent: 6400,
      avatar: 'ED',
      isDeactivated: false,
      isBlacklisted: false
    },
    {
      id: '#1007',
      name: 'Robert Miller',
      email: 'robert.miller@email.com',
      phone: '+254 700 789 012',
      joinDate: '2024-02-10',
      status: 'Pending',
      orders: 1,
      totalSpent: 2800,
      avatar: 'RM',
      isDeactivated: false,
      isBlacklisted: false
    },
    {
      id: '#1008',
      name: 'Lisa Garcia',
      email: 'lisa.garcia@email.com',
      phone: '+254 700 890 123',
      joinDate: '2024-02-15',
      status: 'Active',
      orders: 4,
      totalSpent: 11200,
      avatar: 'LG',
      isDeactivated: false,
      isBlacklisted: false
    },
    {
      id: '#1009',
      name: 'Tom Anderson',
      email: 'tom.anderson@email.com',
      phone: '+254 700 901 234',
      joinDate: '2024-01-05',
      status: 'Deactivated',
      orders: 2,
      totalSpent: 4500,
      avatar: 'TA',
      isDeactivated: true,
      isBlacklisted: false
    },
    {
      id: '#1010',
      name: 'Maria Rodriguez',
      email: 'maria.rodriguez@email.com',
      phone: '+254 700 012 345',
      joinDate: '2024-01-08',
      status: 'Blacklisted',
      orders: 0,
      totalSpent: 0,
      avatar: 'MR',
      isDeactivated: true,
      isBlacklisted: true
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      case 'Deactivated':
        return 'bg-gray-100 text-gray-800';
      case 'Blacklisted':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvatarColor = (name: string) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-indigo-500', 'bg-pink-500', 'bg-yellow-500', 'bg-teal-500'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleEdit = (customer: any) => {
    setEditingCustomer(customer);
  };

  const handleCustomerClick = (customer: any) => {
    // Extract the numeric ID from the customer ID (e.g., "#1001" -> "1001")
    const customerId = customer.id.replace('#', '');
    router.push(`/admin/customers/${customerId}`);
  };

  const handleDeactivate = (id: string) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === id 
        ? { ...customer, isDeactivated: true, status: 'Deactivated' }
        : customer
    ));
  };

  const handleBlacklist = (id: string) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === id 
        ? { ...customer, isDeactivated: true, isBlacklisted: true, status: 'Blacklisted' }
        : customer
    ));
  };

  const handleReactivate = (id: string) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === id 
        ? { ...customer, isDeactivated: false, isBlacklisted: false, status: 'Active' }
        : customer
    ));
  };

  // const handleAddCustomer = () => {
  //   setShowAddModal(true);
  // };

  // Filter customers based on active tab and search term
  const filterCustomers = (customerList: any[]) => {
    if (!searchTerm) return customerList;
    
    return customerList.filter(customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const activeCustomers = filterCustomers(customers.filter(customer => !customer.isDeactivated));
  const deactivatedCustomers = filterCustomers(customers.filter(customer => customer.isDeactivated));

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-2">Customer Management</h2>
      <div className="flex justify-end mb-4">
      </div>
      <p className="text-gray-600 text-base mb-8">View and manage your customer accounts here.</p>
      
      {/* Search and Tab Navigation */}
      <div className="mb-6">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search customers by name, email, phone, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border-b border-gray-300 bg-transparent placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-[#c7b8ea] sm:text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('active')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'active'
                  ? 'border-[#c7b8ea] text-[#c7b8ea]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Active Customers ({activeCustomers.length})
            </button>
            <button
              onClick={() => setActiveTab('deactivated')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'deactivated'
                  ? 'border-[#c7b8ea] text-[#c7b8ea]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Deactivated Customers ({deactivatedCustomers.length})
            </button>
          </nav>
        </div>
      </div>
      
      {/* Customer Management Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            {activeTab === 'active' ? 'Active Customer Accounts' : 'Deactivated Customer Accounts'}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(activeTab === 'active' ? activeCustomers : deactivatedCustomers).map(customer => (
                <tr 
                  key={customer.id} 
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleCustomerClick(customer)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className={`h-10 w-10 rounded-full ${getAvatarColor(customer.name)} flex items-center justify-center`}>
                          <span className="text-white font-medium">{customer.avatar}</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.orders} orders</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">KES {customer.totalSpent.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(customer);
                      }}
                      className="text-indigo-600 hover:text-indigo-900" 
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    {activeTab === 'active' ? (
                      <>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeactivate(customer.id);
                          }}
                          className="text-orange-600 hover:text-orange-900" 
                          title="Deactivate"
                        >
                          <ShieldOff className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBlacklist(customer.id);
                          }}
                          className="text-red-600 hover:text-red-900" 
                          title="Blacklist"
                        >
                          <Shield className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReactivate(customer.id);
                        }}
                        className="text-green-600 hover:text-green-900" 
                        title="Reactivate"
                      >
                        <Shield className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Customer Modal */}
      {editingCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Edit Customer</h3>
              <button 
                onClick={() => setEditingCustomer(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Trash2 size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  defaultValue={editingCustomer.name}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  defaultValue={editingCustomer.email}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input 
                  type="tel" 
                  defaultValue={editingCustomer.phone}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select 
                  defaultValue={editingCustomer.status}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  onClick={() => setEditingCustomer(null)}
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

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add New Customer</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Trash2 size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter full name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  placeholder="Enter email address"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input 
                  type="tel" 
                  placeholder="Enter phone number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
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
                  Add Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 