'use client';

import { useState } from 'react';
import { MapPin, Clock, Truck } from 'lucide-react';
import { DeliveryZone } from '@/types/shop/delivery';

interface DeliveryZoneSelectorProps {
  zones: DeliveryZone[];
  selectedZoneId?: string;
  onZoneSelect: (zoneId: string) => void;
  error?: string;
}

export function DeliveryZoneSelector({ 
  zones, 
  selectedZoneId, 
  onZoneSelect, 
  error 
}: DeliveryZoneSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredZones = zones.filter(zone =>
    zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    zone.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Delivery Zone
        </label>
        <p className="text-sm text-gray-500 mb-3">
          Choose your area to see delivery options and fees
        </p>
        
        {/* Search Input */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search for your area..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]"
          />
          <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>

        {/* Zone Cards */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filteredZones.map((zone) => (
            <div
              key={zone.id}
              onClick={() => onZoneSelect(zone.id)}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                selectedZoneId === zone.id
                  ? 'border-[#c7b8ea] bg-purple-50 ring-2 ring-[#c7b8ea]'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              } ${!zone.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-gray-900">{zone.name}</h3>
                    {!zone.isAvailable && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                        Unavailable
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{zone.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Truck className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        {zone.deliveryFee === 0 ? 'Free delivery' : `KES ${zone.deliveryFee}`}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{zone.estimatedDeliveryTime}</span>
                    </div>
                  </div>
                </div>
                
                {/* Selection Indicator */}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedZoneId === zone.id
                    ? 'border-[#c7b8ea] bg-[#c7b8ea]'
                    : 'border-gray-300'
                }`}>
                  {selectedZoneId === zone.id && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredZones.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p>No delivery zones found for &quot;{searchTerm}&quot;</p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
