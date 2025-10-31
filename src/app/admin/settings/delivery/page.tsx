"use client";

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Save, Truck, MapPin, Plus, Trash2 } from 'lucide-react';

export default function DeliverySettingsPage() {
  const [deliveryZones, setDeliveryZones] = useState([
    { id: 1, name: 'Nairobi CBD', fee: 500, active: true },
    { id: 2, name: 'Westlands', fee: 600, active: true },
    { id: 3, name: 'Karen', fee: 800, active: false }
  ]);

  const [newZone, setNewZone] = useState({ name: '', fee: '' });
  const [showAddZone, setShowAddZone] = useState(false);


  const [hasChanges, setHasChanges] = useState(false);

  const handleZoneChange = (id: number, field: string, value: string | boolean) => {
    setDeliveryZones(prev => prev.map(zone => 
      zone.id === id ? { ...zone, [field]: value } : zone
    ));
    setHasChanges(true);
  };

  const handleAddZone = () => {
    if (newZone.name && newZone.fee) {
      const zone = {
        id: Date.now(),
        name: newZone.name,
        fee: parseInt(newZone.fee),
        active: true
      };
      setDeliveryZones(prev => [...prev, zone]);
      setNewZone({ name: '', fee: '' });
      setShowAddZone(false);
      setHasChanges(true);
    }
  };

  const handleDeleteZone = (id: number) => {
    setDeliveryZones(prev => prev.filter(zone => zone.id !== id));
    setHasChanges(true);
  };


  const handleSave = () => {
    // console.log('Saving delivery settings:', { deliveryZones });
    setHasChanges(false);
  };

  return (
    <AdminLayout 
      title="Delivery Settings" 
      description="Configure delivery zones and logistics"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-medium text-gray-800 tracking-wide mb-0.5">Delivery Settings</h2>
            <p className="text-sm text-gray-500 leading-relaxed">Manage delivery zones, fees, and logistics for your bakery.</p>
          </div>
          {hasChanges && (
            <button
              onClick={handleSave}
              className="bg-[#c7b8ea] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#c7b8ea]/80 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          )}
        </div>

        {/* Delivery Zones */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#c7b8ea]" />
              <h3 className="text-sm font-medium text-gray-800 tracking-wide">Delivery Zones</h3>
            </div>
            <button
              onClick={() => setShowAddZone(true)}
              className="bg-[#c7b8ea] text-black px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#c7b8ea]/80 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Zone
            </button>
          </div>

          {/* Add Zone Form */}
          {showAddZone && (
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-gray-800 mb-3">Add New Delivery Zone</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zone Name</label>
                  <input
                    type="text"
                    value={newZone.name}
                    onChange={(e) => setNewZone(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Eastleigh"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Fee (KES)</label>
                  <input
                    type="number"
                    value={newZone.fee}
                    onChange={(e) => setNewZone(prev => ({ ...prev, fee: e.target.value }))}
                    placeholder="500"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => setShowAddZone(false)}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddZone}
                  className="px-3 py-1 bg-[#c7b8ea] text-black rounded text-sm font-medium hover:bg-[#c7b8ea]/80"
                >
                  Add Zone
                </button>
              </div>
            </div>
          )}

          {/* Zones List */}
          <div className="space-y-3">
            {deliveryZones.map(zone => (
              <div key={zone.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#c7b8ea] text-black rounded-lg flex items-center justify-center">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{zone.name}</h4>
                    <p className="text-sm text-gray-500">KES {zone.fee}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={zone.active}
                      onChange={(e) => handleZoneChange(zone.id, 'active', e.target.checked)}
                      className="rounded border-gray-300 text-[#c7b8ea] focus:ring-[#c7b8ea]"
                    />
                    <span className="text-sm text-gray-600">Active</span>
                  </label>
                  <button
                    onClick={() => handleDeleteZone(zone.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete Zone"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}