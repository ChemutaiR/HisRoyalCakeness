"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState, useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
import ManageOrdersContent from '@/components/admin/ManageOrdersContent';
import Analytics from '@/components/admin/Analytics';
import Products from '@/components/admin/Products';
import Customers from '@/components/admin/Customers';
import Recipes from '@/components/admin/Recipes';
import Promotions from '@/components/admin/Promotions';
import Reviews from '@/components/admin/Reviews';
import Settings from '@/components/admin/Settings';

const tabs = [
  { name: 'Manage Orders', key: 'manageorders' },
  { name: 'Order History', key: 'orderhistory' },
  { name: 'Analytics', key: 'analytics' },
  { name: 'Products', key: 'products' },
  { name: 'Customers', key: 'customers' },
  { name: 'Recipes', key: 'recipes' },
  { name: 'Promotions', key: 'promotions' },
  { name: 'Reviews', key: 'reviews' },
  { name: 'Settings', key: 'settings' },
  { name: 'Staff', key: 'staff' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('manageorders');
  
  // Shared order state
  const [orders, setOrders] = useState([
    { 
      id: '#12345', 
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
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
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
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
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days from now
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
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days from now
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
      dueDate: new Date().toISOString().split('T')[0], // Today
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
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days from now
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
      dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 4 days from now
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
      dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 6 days from now
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
      dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 8 days from now
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
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 10 days from now
      cake: 'Mocha Cake', 
      cream: 'Coffee', 
      topping: 'Coffee Beans', 
      allergies: 'None', 
      status: 'Ready',
      specialInstructions: '',
      images: []
    },
  ]);

  const [orderHistory, setOrderHistory] = useState([
    { id: 101, orderDate: '2025-05-01', deliveryDate: '2025-05-05', customer: 'Alice Smith', cake: 'Red Velvet', size: '1 kg', status: 'Delivered' },
    { id: 102, orderDate: '2025-04-15', deliveryDate: '2025-04-20', customer: 'Bob Lee', cake: 'Chocolate Fudge', size: '2 kg', status: 'Delivered' },
    { id: 103, orderDate: '2025-03-10', deliveryDate: '2025-03-15', customer: 'Cathy Brown', cake: 'Lemon Cake', size: '0.5 kg', status: 'Cancelled' },
    { id: 104, orderDate: '2025-02-20', deliveryDate: '2025-02-25', customer: 'David Green', cake: 'Rainbow Cake', size: '3 kg', status: 'Delivered' },
    { id: 105, orderDate: '2025-01-05', deliveryDate: '2025-01-10', customer: 'Eva White', cake: 'Vegan Cake', size: '1.5 kg', status: 'Delivered' },
  ]);

  // Function to move delivered orders to history
  const moveDeliveredToHistory = useCallback(() => {
    const deliveredOrders = orders.filter(order => order.status === 'Delivered');
    if (deliveredOrders.length > 0) {
      const historyEntries = deliveredOrders.map(order => ({
        id: parseInt(order.id.replace('#', '')),
        orderDate: order.dueDate,
        deliveryDate: new Date().toISOString().split('T')[0], // Today's date
        customer: 'Customer', // You can add customer field to orders if needed
        cake: order.cake,
        size: '1 kg', // Default size, you can add size field to orders
        status: 'Delivered'
      }));
      
      setOrderHistory(prev => [...historyEntries, ...prev]);
      setOrders(prev => prev.filter(order => order.status !== 'Delivered'));
    }
  }, [orders]);

  // Check for delivered orders every day at midnight
  useEffect(() => {
    const checkDeliveredOrders = () => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        moveDeliveredToHistory();
      }
    };

    const interval = setInterval(checkDeliveredOrders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [moveDeliveredToHistory]); // Add moveDeliveredToHistory as dependency

  function TabContent({ activeTab }: { activeTab: string }) {
    switch (activeTab) {
      case 'manageorders':
        return <ManageOrdersContent orders={orders} setOrders={setOrders} moveDeliveredToHistory={moveDeliveredToHistory} />;
      case 'orderhistory':
        return (
          <div className="py-8">
            <h2 className="text-2xl font-bold mb-2">Order History</h2>
            <p className="text-gray-600 text-base mb-8">View all completed and past orders here.</p>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-800">Past Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cake Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orderHistory.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.deliveryDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.cake}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.size}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{order.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return <Analytics />;
      case 'products':
        return <Products />;
      case 'customers':
        return <Customers />;
      case 'recipes':
        return <Recipes />;
      case 'promotions':
        return <Promotions />;
      case 'reviews':
        return <Reviews />;
      case 'settings':
        return <Settings />;
      case 'staff':
        return <div className="py-8"><h2 className="text-xl font-bold mb-2">Staff</h2><p className="text-gray-600 text-sm mb-8">Manage admin and staff accounts here.</p></div>;
      default:
        return null;
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 font-work-sans flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-left w-full max-w-7xl">Admin Dashboard</h1>
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto w-full max-w-7xl">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-base font-semibold border-b-2 transition-colors whitespace-nowrap bg-transparent outline-none ${activeTab === tab.key ? 'border-[#c7b8ea] text-[#c7b8ea]' : 'border-transparent text-gray-500 hover:text-black hover:border-[#c7b8ea]'}`}
              type="button"
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="w-full max-w-7xl">
          <TabContent activeTab={activeTab} />
        </div>
      </div>
      <Footer />
    </main>
  );
} 