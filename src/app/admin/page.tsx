"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { Pencil, Trash2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ManageOrdersContent from '@/components/admin/ManageOrdersContent';
import Analytics from '@/components/admin/Analytics';
import Products from '@/components/admin/Products';
import Customers from '@/components/admin/Customers';
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

function TabContent({ activeTab }: { activeTab: string }) {
  const router = useRouter();

  switch (activeTab) {
    case 'manageorders':
      return <ManageOrdersContent />;
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
                  {[
                    { id: 101, orderDate: '2025-05-01', deliveryDate: '2025-05-05', customer: 'Alice Smith', cake: 'Red Velvet', size: '1 kg', status: 'Delivered' },
                    { id: 102, orderDate: '2025-04-15', deliveryDate: '2025-04-20', customer: 'Bob Lee', cake: 'Chocolate Fudge', size: '2 kg', status: 'Delivered' },
                    { id: 103, orderDate: '2025-03-10', deliveryDate: '2025-03-15', customer: 'Cathy Brown', cake: 'Lemon Cake', size: '0.5 kg', status: 'Cancelled' },
                    { id: 104, orderDate: '2025-02-20', deliveryDate: '2025-02-25', customer: 'David Green', cake: 'Rainbow Cake', size: '3 kg', status: 'Delivered' },
                    { id: 105, orderDate: '2025-01-05', deliveryDate: '2025-01-10', customer: 'Eva White', cake: 'Vegan Cake', size: '1.5 kg', status: 'Delivered' },
                  ].map(order => (
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
      return (
        <div className="py-8">
          <h2 className="text-2xl font-bold mb-2">Recipe Management</h2>
          <p className="text-gray-600 text-base mb-8">View and manage your cake recipes here.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Red Velvet Cake Recipe Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-red-600 p-4">
                <h3 className="text-xl font-bold text-white">Red Velvet Cake</h3>
                <p className="text-red-100 text-sm">Classic Southern favorite</p>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Ingredients:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 2 1/2 cups all-purpose flour</li>
                    <li>• 1 1/2 cups granulated sugar</li>
                    <li>• 1 tsp baking soda</li>
                    <li>• 1 tsp salt</li>
                    <li>• 2 tbsp cocoa powder</li>
                    <li>• 1 1/2 cups vegetable oil</li>
                    <li>• 1 cup buttermilk</li>
                    <li>• 2 large eggs</li>
                    <li>• 2 tbsp red food coloring</li>
                    <li>• 1 tsp vanilla extract</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Instructions:</h4>
                  <ol className="text-sm text-gray-600 space-y-1">
                    <li>1. Preheat oven to 350°F (175°C)</li>
                    <li>2. Mix dry ingredients in a bowl</li>
                    <li>3. Beat oil, sugar, and eggs until fluffy</li>
                    <li>4. Add food coloring and vanilla</li>
                    <li>5. Alternate adding flour and buttermilk</li>
                    <li>6. Bake for 25-30 minutes</li>
                  </ol>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Prep: 20 min | Cook: 30 min</span>
                  <button className="bg-[#c7b8ea] text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#c7b8ea]/80 transition-colors">
                    Edit Recipe
                  </button>
                </div>
              </div>
            </div>

            {/* Chocolate Fudge Cake Recipe Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4" style={{backgroundColor: '#8B4513'}}>
                <h3 className="text-xl font-bold text-white">Chocolate Fudge Cake</h3>
                <p className="text-white text-sm opacity-80">Rich and decadent</p>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Ingredients:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 2 cups all-purpose flour</li>
                    <li>• 2 cups granulated sugar</li>
                    <li>• 3/4 cup unsweetened cocoa powder</li>
                    <li>• 2 tsp baking soda</li>
                    <li>• 1 tsp baking powder</li>
                    <li>• 1 tsp salt</li>
                    <li>• 2 large eggs</li>
                    <li>• 1 cup milk</li>
                    <li>• 1 cup hot water</li>
                    <li>• 1/2 cup vegetable oil</li>
                    <li>• 2 tsp vanilla extract</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Instructions:</h4>
                  <ol className="text-sm text-gray-600 space-y-1">
                    <li>1. Preheat oven to 350°F (175°C)</li>
                    <li>2. Sift together dry ingredients</li>
                    <li>3. Beat eggs, milk, oil, and vanilla</li>
                    <li>4. Gradually add dry ingredients</li>
                    <li>5. Stir in hot water (batter will be thin)</li>
                    <li>6. Bake for 30-35 minutes</li>
                  </ol>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Prep: 15 min | Cook: 35 min</span>
                  <button className="bg-[#c7b8ea] text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#c7b8ea]/80 transition-colors">
                    Edit Recipe
                  </button>
                </div>
              </div>
            </div>

            {/* Vanilla Cake Recipe Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4" style={{backgroundColor: '#DAA520'}}>
                <h3 className="text-xl font-bold text-white">Vanilla Cake</h3>
                <p className="text-white text-sm opacity-80">Classic and versatile</p>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Ingredients:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 2 1/4 cups all-purpose flour</li>
                    <li>• 1 1/2 cups granulated sugar</li>
                    <li>• 3 1/2 tsp baking powder</li>
                    <li>• 1 tsp salt</li>
                    <li>• 1/2 cup unsalted butter, softened</li>
                    <li>• 3 large eggs</li>
                    <li>• 1 1/4 cups whole milk</li>
                    <li>• 2 tsp vanilla extract</li>
                    <li>• 1/4 cup vegetable oil</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Instructions:</h4>
                  <ol className="text-sm text-gray-600 space-y-1">
                    <li>1. Preheat oven to 350°F (175°C)</li>
                    <li>2. Cream butter and sugar until light</li>
                    <li>3. Add eggs one at a time</li>
                    <li>4. Mix in vanilla and oil</li>
                    <li>5. Alternate flour and milk</li>
                    <li>6. Bake for 25-30 minutes</li>
                  </ol>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Prep: 20 min | Cook: 30 min</span>
                  <button className="bg-[#c7b8ea] text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#c7b8ea]/80 transition-colors">
                    Edit Recipe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
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

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('manageorders');
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