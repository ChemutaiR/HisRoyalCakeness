"use client";

import { useState } from 'react';
import { Calendar, Clock, Package, CheckCircle, XCircle } from 'lucide-react';

export default function OrderHistory() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const orderHistory = [
    {
      id: '#12340',
      customerName: 'Sarah Johnson',
      orderDate: '2024-01-15',
      dueDate: '2024-01-18',
      deliveredDate: '2024-01-18',
      cake: 'Chocolate Cake',
      cream: 'Vanilla',
      topping: 'Chocolate Chips',
      allergies: 'None',
      status: 'Delivered',
      totalAmount: '$45.00',
      specialInstructions: 'Please make it extra chocolatey and add a birthday message "Happy Birthday Sarah!"',
      deliveryAddress: '123 Main St, Anytown, ST 12345',
      deliveryTime: '2:00 PM'
    },
    {
      id: '#12341',
      customerName: 'Michael Chen',
      orderDate: '2024-01-14',
      dueDate: '2024-01-17',
      deliveredDate: '2024-01-17',
      cake: 'Red Velvet Cake',
      cream: 'Cream Cheese',
      topping: 'White Chocolate',
      allergies: 'Dairy',
      status: 'Delivered',
      totalAmount: '$52.00',
      specialInstructions: 'Please use dairy-free cream cheese alternative',
      deliveryAddress: '456 Oak Ave, Somewhere, ST 67890',
      deliveryTime: '1:30 PM'
    },
    {
      id: '#12342',
      customerName: 'Emily Rodriguez',
      orderDate: '2024-01-13',
      dueDate: '2024-01-16',
      deliveredDate: '2024-01-16',
      cake: 'Vanilla Cake',
      cream: 'Strawberry',
      topping: 'Fresh Berries',
      allergies: 'Nuts',
      status: 'Delivered',
      totalAmount: '$48.00',
      specialInstructions: 'No nuts please, and make it pink themed for a baby shower',
      deliveryAddress: '789 Pine Rd, Elsewhere, ST 11111',
      deliveryTime: '3:00 PM'
    },
    {
      id: '#12343',
      customerName: 'David Thompson',
      orderDate: '2024-01-12',
      dueDate: '2024-01-15',
      deliveredDate: '2024-01-15',
      cake: 'Carrot Cake',
      cream: 'Vanilla',
      topping: 'Walnuts',
      allergies: 'Gluten',
      status: 'Delivered',
      totalAmount: '$50.00',
      specialInstructions: 'Use gluten-free flour and make it extra moist',
      deliveryAddress: '321 Elm St, Nowhere, ST 22222',
      deliveryTime: '11:00 AM'
    },
    {
      id: '#12344',
      customerName: 'Lisa Wang',
      orderDate: '2024-01-11',
      dueDate: '2024-01-14',
      deliveredDate: '2024-01-14',
      cake: 'Lemon Cake',
      cream: 'Vanilla',
      topping: 'Lemon Zest',
      allergies: 'None',
      status: 'Delivered',
      totalAmount: '$42.00',
      specialInstructions: '',
      deliveryAddress: '654 Maple Dr, Anywhere, ST 33333',
      deliveryTime: '4:30 PM'
    },
    {
      id: '#12345',
      customerName: 'Robert Davis',
      orderDate: '2024-01-10',
      dueDate: '2024-01-13',
      deliveredDate: '2024-01-13',
      cake: 'Black Forest Cake',
      cream: 'Chocolate',
      topping: 'Cherries',
      allergies: 'None',
      status: 'Delivered',
      totalAmount: '$55.00',
      specialInstructions: '',
      deliveryAddress: '987 Cedar Ln, Someplace, ST 44444',
      deliveryTime: '12:30 PM'
    },
    {
      id: '#12346',
      customerName: 'Jennifer Lee',
      orderDate: '2024-01-09',
      dueDate: '2024-01-12',
      deliveredDate: '2024-01-12',
      cake: 'Strawberry Cake',
      cream: 'Strawberry',
      topping: 'Fresh Strawberries',
      allergies: 'None',
      status: 'Delivered',
      totalAmount: '$47.00',
      specialInstructions: '',
      deliveryAddress: '147 Birch Way, Everywhere, ST 55555',
      deliveryTime: '2:45 PM'
    },
    {
      id: '#12347',
      customerName: 'Thomas Wilson',
      orderDate: '2024-01-08',
      dueDate: '2024-01-11',
      deliveredDate: '2024-01-11',
      cake: 'Coconut Cake',
      cream: 'Vanilla',
      topping: 'Coconut Flakes',
      allergies: 'None',
      status: 'Delivered',
      totalAmount: '$49.00',
      specialInstructions: '',
      deliveryAddress: '258 Spruce Ct, Nowhere, ST 66666',
      deliveryTime: '1:15 PM'
    }
  ];

  const filteredOrders = filterStatus === 'all' 
    ? orderHistory 
    : orderHistory.filter(order => order.status === filterStatus);

  const handleOrderClick = (order: any) => {
    setSelectedOrder(order);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setSelectedOrder(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Package className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-2">Order History</h2>
      <p className="text-gray-600 text-base mb-8">View completed and historical orders for reference and analytics.</p>
      
      {/* Filter Controls */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Orders</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Order History Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Completed Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivered Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cake Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map(order => (
                <tr 
                  key={order.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleOrderClick(order)}
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerName}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderDate}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.dueDate}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.deliveredDate}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.cake}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.totalAmount}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                        'bg-red-100 text-red-800'
                      }`}>{order.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Dialog */}
      {showDialog && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Order Details - {selectedOrder.id}</h3>
              <button 
                onClick={closeDialog}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Customer:</span> {selectedOrder.customerName}
                </div>
                <div>
                  <span className="font-semibold">Order Date:</span> {selectedOrder.orderDate}
                </div>
                <div>
                  <span className="font-semibold">Due Date:</span> {selectedOrder.dueDate}
                </div>
                <div>
                  <span className="font-semibold">Delivered Date:</span> {selectedOrder.deliveredDate}
                </div>
                <div>
                  <span className="font-semibold">Delivery Time:</span> {selectedOrder.deliveryTime}
                </div>
                <div>
                  <span className="font-semibold">Total Amount:</span> {selectedOrder.totalAmount}
                </div>
                <div>
                  <span className="font-semibold">Cake Type:</span> {selectedOrder.cake}
                </div>
                <div>
                  <span className="font-semibold">Whipping Cream:</span> {selectedOrder.cream}
                </div>
                <div>
                  <span className="font-semibold">Topping:</span> {selectedOrder.topping}
                </div>
                <div>
                  <span className="font-semibold">Allergies:</span> {selectedOrder.allergies}
                </div>
                <div>
                  <span className="font-semibold">Status:</span> 
                  <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    selectedOrder.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                    'bg-red-100 text-red-800'
                  }`}>{selectedOrder.status}</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2">Delivery Address:</h4>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedOrder.deliveryAddress}</p>
              </div>

              {selectedOrder.specialInstructions && (
                <div>
                  <h4 className="font-semibold text-lg mb-2">Special Instructions:</h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedOrder.specialInstructions}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 