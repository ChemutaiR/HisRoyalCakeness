"use client";

import { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';

export default function Products() {
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const cakes = [
    { id: 1, name: 'Vanilla', p05: 1500, p1: 2600, p15: 3822, p2: 5096, p3: 7644, p4: 10192, p5: 12740 },
    { id: 2, name: 'Eggless Cake', p05: 1500, p1: 2800, p15: 4116, p2: 5488, p3: 8232, p4: 10976, p5: 13720 },
    { id: 3, name: 'Vanilla Orange', p05: 1600, p1: 2800, p15: 4116, p2: 5488, p3: 8232, p4: 10976, p5: 13720 },
    { id: 4, name: 'Vanilla Blueberry', p05: 1600, p1: 2800, p15: 4116, p2: 5488, p3: 8232, p4: 10976, p5: 13720 },
    { id: 5, name: 'White Forest', p05: 1600, p1: 2800, p15: 4116, p2: 5488, p3: 8232, p4: 10976, p5: 13720 },
    { id: 6, name: 'Marble (Vanilla Chocolate)', p05: 1600, p1: 2800, p15: 4116, p2: 5488, p3: 8232, p4: 10976, p5: 13720 },
    { id: 7, name: 'Black Forest', p05: 1600, p1: 2800, p15: 4116, p2: 5488, p3: 8232, p4: 10976, p5: 13720 },
    { id: 8, name: 'Strawberry forest', p05: 1600, p1: 2800, p15: 4116, p2: 5488, p3: 8232, p4: 10976, p5: 13720 },
    { id: 9, name: 'Chocolate Orange', p05: 1600, p1: 2800, p15: 4116, p2: 5488, p3: 8232, p4: 10976, p5: 13720 },
    { id: 10, name: 'Lemon Cake', p05: 1600, p1: 2800, p15: 4116, p2: 5488, p3: 8232, p4: 10976, p5: 13720 },
    { id: 11, name: 'Red Velvet', p05: 1700, p1: 3000, p15: 4410, p2: 5880, p3: 8820, p4: 11760, p5: 14700 },
    { id: 12, name: 'Light Fruit cake', p05: 1700, p1: 3000, p15: 4410, p2: 5880, p3: 8820, p4: 11760, p5: 14700 },
    { id: 13, name: 'Chocolate fudge', p05: 1700, p1: 3000, p15: 4410, p2: 5880, p3: 8820, p4: 11760, p5: 14700 },
    { id: 14, name: 'Chocolate mint', p05: 1700, p1: 3000, p15: 4410, p2: 5880, p3: 8820, p4: 11760, p5: 14700 },
    { id: 15, name: 'Carrot Cake', p05: 1700, p1: 3000, p15: 4410, p2: 5880, p3: 8820, p4: 11760, p5: 14700 },
    { id: 16, name: 'Zucchini Cake', p05: 1700, p1: 3000, p15: 4410, p2: 5880, p3: 8820, p4: 11760, p5: 14700 },
    { id: 17, name: 'Pinacolada cake', p05: 1700, p1: 3000, p15: 4410, p2: 5880, p3: 8820, p4: 11760, p5: 14700 },
    { id: 18, name: 'Passion cake', p05: 1700, p1: 3000, p15: 4410, p2: 5880, p3: 8820, p4: 11760, p5: 14700 },
    { id: 19, name: 'Banana Cake', p05: 1700, p1: 3000, p15: 4410, p2: 5880, p3: 8820, p4: 11760, p5: 14700 },
    { id: 20, name: 'Mocha Cake', p05: 1700, p1: 3000, p15: 4410, p2: 5880, p3: 8820, p4: 11760, p5: 14700 },
    { id: 21, name: 'Rainbow cake', p05: 1800, p1: 3200, p15: 4704, p2: 6272, p3: 9408, p4: 12544, p5: 15680 },
    { id: 22, name: 'Strawberry Cake', p05: 1800, p1: 3200, p15: 4704, p2: 6272, p3: 9408, p4: 12544, p5: 15680 },
    { id: 23, name: 'Coconut Cake', p05: 1800, p1: 3200, p15: 4704, p2: 6272, p3: 9408, p4: 12544, p5: 15680 },
    { id: 24, name: 'Butterscotch cake', p05: 1800, p1: 3200, p15: 4704, p2: 6272, p3: 9408, p4: 12544, p5: 15680 },
    { id: 25, name: 'Caramel cake', p05: 1800, p1: 3200, p15: 4704, p2: 6272, p3: 9408, p4: 12544, p5: 15680 },
    { id: 26, name: 'Orange Coconut Cake', p05: 1800, p1: 3200, p15: 4704, p2: 6272, p3: 9408, p4: 12544, p5: 15680 },
    { id: 27, name: 'Lemon Coconut Cake', p05: 1800, p1: 3200, p15: 4704, p2: 6272, p3: 9408, p4: 12544, p5: 15680 },
    { id: 28, name: 'Orange poppy', p05: 1800, p1: 3200, p15: 4704, p2: 6272, p3: 9408, p4: 12544, p5: 15680 },
    { id: 29, name: 'Lemon poppy', p05: 1800, p1: 3200, p15: 4704, p2: 6272, p3: 9408, p4: 12544, p5: 15680 },
    { id: 30, name: 'Sprinkes confetti cake', p05: 2000, p1: 3500, p15: 5145, p2: 6860, p3: 10290, p4: 13720, p5: 17150 },
    { id: 31, name: 'Mild Fruit Cake', p05: 2000, p1: 3500, p15: 5145, p2: 6860, p3: 10290, p4: 13720, p5: 17150 },
    { id: 32, name: 'Chocolate Chip Cake', p05: 2000, p1: 3500, p15: 5145, p2: 6860, p3: 10290, p4: 13720, p5: 17150 },
    { id: 33, name: 'Vegan cake', p05: 2000, p1: 3500, p15: 5145, p2: 6860, p3: 10290, p4: 13720, p5: 17150 },
    { id: 34, name: 'Lemon blueberry', p05: 2000, p1: 3500, p15: 5145, p2: 6860, p3: 10290, p4: 13720, p5: 17150 },
    { id: 35, name: 'Rich Fruit Cake', p05: 2300, p1: 4500, p15: 6615, p2: 8820, p3: 13230, p4: 17640, p5: 22050 },
  ];

  const handleEdit = (cake: any) => {
    setEditingProduct(cake);
  };

  const handleDelete = (id: number) => {
    // Handle delete logic here
    console.log('Delete cake with id:', id);
  };

  const handleAddProduct = () => {
    setShowAddModal(true);
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-2">Products</h2>
      <div className="flex justify-end mb-4">
        <button 
          onClick={handleAddProduct}
          className="flex items-center gap-2 bg-[#c7b8ea] text-black text-base font-semibold px-4 py-2 rounded-full shadow hover:bg-[#c7b8ea]/80 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>
      <p className="text-gray-600 text-base mb-8">List of all cakes and their prices.</p>
      
      {/* Products Management Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Cake Products</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cake Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">0.5 kg</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">1 kg</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">1.5 kg</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2 kg</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">3 kg</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">4 kg</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">5 kg</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cakes.map(cake => (
                <tr key={cake.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cake.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cake.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">KES {cake.p05.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">KES {cake.p1.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">KES {cake.p15.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">KES {cake.p2.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">KES {cake.p3.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">KES {cake.p4.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">KES {cake.p5.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      onClick={() => handleEdit(cake)}
                      className="text-indigo-600 hover:text-indigo-900" 
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(cake.id)}
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

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Edit Product - {editingProduct.name}</h3>
              <button 
                onClick={() => setEditingProduct(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Trash2 size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input 
                  type="text" 
                  defaultValue={editingProduct.name}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">0.5 kg Price</label>
                  <input 
                    type="number" 
                    defaultValue={editingProduct.p05}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">1 kg Price</label>
                  <input 
                    type="number" 
                    defaultValue={editingProduct.p1}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">1.5 kg Price</label>
                  <input 
                    type="number" 
                    defaultValue={editingProduct.p15}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">2 kg Price</label>
                  <input 
                    type="number" 
                    defaultValue={editingProduct.p2}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">3 kg Price</label>
                  <input 
                    type="number" 
                    defaultValue={editingProduct.p3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">4 kg Price</label>
                  <input 
                    type="number" 
                    defaultValue={editingProduct.p4}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">5 kg Price</label>
                  <input 
                    type="number" 
                    defaultValue={editingProduct.p5}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  onClick={() => setEditingProduct(null)}
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

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add New Product</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Trash2 size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input 
                  type="text" 
                  placeholder="Enter product name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">0.5 kg Price</label>
                  <input 
                    type="number" 
                    placeholder="0"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">1 kg Price</label>
                  <input 
                    type="number" 
                    placeholder="0"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">1.5 kg Price</label>
                  <input 
                    type="number" 
                    placeholder="0"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">2 kg Price</label>
                  <input 
                    type="number" 
                    placeholder="0"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">3 kg Price</label>
                  <input 
                    type="number" 
                    placeholder="0"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">4 kg Price</label>
                  <input 
                    type="number" 
                    placeholder="0"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">5 kg Price</label>
                  <input 
                    type="number" 
                    placeholder="0"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
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
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 