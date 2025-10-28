export interface DeliveryZone {
  id: string;
  name: string;
  description: string;
  deliveryFee: number;
  estimatedDeliveryTime: string;
  isAvailable: boolean;
}

export interface DeliveryZoneSelection {
  zoneId: string;
  zone: DeliveryZone;
}
