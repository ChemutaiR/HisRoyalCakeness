import { DeliveryZone } from '@/types/shop/delivery';

export const mockDeliveryZones: DeliveryZone[] = [
  {
    id: 'zone-1',
    name: 'CBD & Surrounding Areas',
    description: 'Nairobi CBD, Westlands, Kilimani, Kileleshwa, Lavington',
    deliveryFee: 0,
    estimatedDeliveryTime: '30-45 minutes',
    isAvailable: true,
  },
  {
    id: 'zone-2',
    name: 'Eastlands',
    description: 'Eastleigh, Buruburu, Donholm, Pipeline, Ruai',
    deliveryFee: 200,
    estimatedDeliveryTime: '45-60 minutes',
    isAvailable: true,
  },
  {
    id: 'zone-3',
    name: 'Westlands & Karen',
    description: 'Westlands, Karen, Runda, Gigiri, Muthaiga',
    deliveryFee: 300,
    estimatedDeliveryTime: '60-90 minutes',
    isAvailable: true,
  },
  {
    id: 'zone-4',
    name: 'Thika Road & Beyond',
    description: 'Thika Road, Kiambu, Ruiru, Juja',
    deliveryFee: 500,
    estimatedDeliveryTime: '90-120 minutes',
    isAvailable: true,
  },
  {
    id: 'zone-5',
    name: 'Mombasa Road',
    description: 'Mombasa Road, Athi River, Kitengela, Mlolongo',
    deliveryFee: 400,
    estimatedDeliveryTime: '60-90 minutes',
    isAvailable: true,
  },
  {
    id: 'zone-6',
    name: 'Out of Coverage',
    description: 'Areas outside our delivery coverage',
    deliveryFee: 0,
    estimatedDeliveryTime: 'Not available',
    isAvailable: false,
  },
];

export const getDeliveryZones = (): DeliveryZone[] => {
  return mockDeliveryZones.filter(zone => zone.isAvailable);
};

export const getDeliveryZoneById = (id: string): DeliveryZone | undefined => {
  return mockDeliveryZones.find(zone => zone.id === id);
};
