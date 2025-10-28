// Simplified decoration type definitions

export interface Decoration {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  available: boolean;
}

export interface DecorationCategory {
  id: string;
  name: string;
  icon: string;
  decorations: Decoration[];
}
