"use client";

import { useState } from 'react';
import { X } from 'lucide-react';

export default function ManageOrdersContent() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showDialog, setShowDialog] = useState(false);

  const orders = [
    { 
      id: '#12345', 
      dueDate: '2024-01-20', 
      cake: 'Chocolate Cake', 
      cream: 'Vanilla', 
      topping: 'Chocolate Chips', 
      allergies: 'None', 
      status: 'Ready',
      specialInstructions: 'Please make it extra chocolatey and add a birthday message "Happy Birthday Sarah!"',
      images: ['/product-images/chocolate fudge.jpg']
    },
    { 
      id: '#12346', 
      dueDate: '2024-01-21', 
      cake: 'Vanilla Cake', 
      cream: 'Strawberry', 
      topping: 'Fresh Berries', 
      allergies: 'Nuts', 
      status: 'Received',
      specialInstructions: 'No nuts please, and make it pink themed for a baby shower',
      images: []
    },
    { 
      id: '#12347', 
      dueDate: '2024-01-22', 
      cake: 'Red Velvet Cake', 
      cream: 'Cream Cheese', 
      topping: 'White Chocolate', 
      allergies: 'Dairy', 
      status: 'In Progress',
      specialInstructions: 'Please use dairy-free cream cheese alternative',
      images: ['/product-images/red velvet.jpg', '/product-images/white forest.jpg']
    },
    { 
      id: '#12348', 
      dueDate: '2024-01-23', 
      cake: 'Carrot Cake', 
      cream: 'Vanilla', 
      topping: 'Walnuts', 
      allergies: 'Gluten', 
      status: 'Dispatched',
      specialInstructions: 'Use gluten-free flour and make it extra moist',
      images: ['/product-images/carrot cake.jpg']
    },
    { 
      id: '#12349', 
      dueDate: '2024-01-24', 
      cake: 'Lemon Cake', 
      cream: 'Vanilla', 
      topping: 'Lemon Zest', 
      allergies: 'None', 
      status: 'Received',
      specialInstructions: '',
      images: []
    },
    { 
      id: '#12350', 
      dueDate: '2024-01-25', 
      cake: 'Black Forest Cake', 
      cream: 'Chocolate', 
      topping: 'Cherries', 
      allergies: 'None', 
      status: 'In Progress',
      specialInstructions: '',
      images: []
    },
    { 
      id: '#12351', 
      dueDate: '2024-01-26', 
      cake: 'Strawberry Cake', 
      cream: 'Strawberry', 
      topping: 'Fresh Strawberries', 
      allergies: 'None', 
      status: 'Ready',
      specialInstructions: '',
      images: []
    },
    { 
      id: '#12352', 
      dueDate: '2024-01-27', 
      cake: 'Coconut Cake', 
      cream: 'Vanilla', 
      topping: 'Coconut Flakes', 
      allergies: 'None', 
      status: 'Received',
      specialInstructions: '',
      images: []
    },
    { 
      id: '#12353', 
      dueDate: '2024-01-28', 
      cake: 'Banana Cake', 
      cream: 'Vanilla', 
      topping: 'Banana Slices', 
      allergies: 'None', 
      status: 'In Progress',
      specialInstructions: '',
      images: []
    },
    { 
      id: '#12354', 
      dueDate: '2024-01-29', 
      cake: 'Mocha Cake', 
      cream: 'Coffee', 
      topping: 'Coffee Beans', 
      allergies: 'None', 
      status: 'Ready',
      specialInstructions: '',
      images: []
    },
  ];

  const handleOrderClick = (order: any) => {
    if (order.specialInstructions || order.images.length > 0) {
      setSelectedOrder(order);
      setShowDialog(true);
    }
  };

  const closeDialog = () => {
    setShowDialog(false);
    setSelectedOrder(null);
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-2">Manage Orders</h2>
      <p className="text-gray-600 text-base mb-8">Here you can view and manage all customer orders for baking.</p>
      
      {/* Orders Management Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Customer Orders</h3>
        </div>
      <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cake Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Whipping Cream</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topping</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allergies</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {orders.map(order => (
                <tr 
                  key={order.id} 
                  className={`hover:bg-gray-50 ${(order.specialInstructions || order.images.length > 0) ? 'cursor-pointer bg-blue-50 border-l-4 border-blue-400' : ''}`}
                  onClick={() => handleOrderClick(order)}
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.dueDate}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.cake}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.cream}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.topping}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.allergies}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Ready' ? 'bg-green-100 text-green-800' : 
                      order.status === 'Received' ? 'bg-yellow-100 text-yellow-800' : 
                      order.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                      'bg-purple-100 text-purple-800'
                    }`}>{order.status}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs">Received</button>
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs">Ready</button>
                      <button className="bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 rounded text-xs">Dispatched</button>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs">Delivered</button>
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
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Due Date:</span> {selectedOrder.dueDate}
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
                    selectedOrder.status === 'Ready' ? 'bg-green-100 text-green-800' : 
                    selectedOrder.status === 'Received' ? 'bg-yellow-100 text-yellow-800' : 
                    selectedOrder.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                    'bg-purple-100 text-purple-800'
                  }`}>{selectedOrder.status}</span>
                </div>
              </div>

              {selectedOrder.specialInstructions && (
                <div>
                  <h4 className="font-semibold text-lg mb-2">Special Instructions:</h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedOrder.specialInstructions}</p>
                </div>
              )}

              {selectedOrder.images.length > 0 && (
                <div>
                  <h4 className="font-semibold text-lg mb-2">Reference Images:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedOrder.images.map((image: string, index: number) => (
                      <div key={index} className="relative">
                        <img 
                          src={image} 
                          alt={`Reference ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 