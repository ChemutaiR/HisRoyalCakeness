'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import SizeSelector from '@/components/CakeCustomizer/SizeSelector';
import CreamSelector from '@/components/CakeCustomizer/CreamSelector';
import NotesSection from '@/components/CakeCustomizer/NotesSection';
import ImageUploader from '@/components/CakeCustomizer/ImageUploader';
import CustomizationSummary from '@/components/CakeCustomizer/CustomizationSummary';
import AddToCartButton from '@/components/CakeCustomizer/AddToCartButton';
import ContainerTypeSelector from '@/components/CakeCustomizer/ContainerTypeSelector';
import Reviews from '@/components/CakeCustomizer/Reviews';
import { ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Size {
  size: string;
  price: number;
  servings: number;
}

interface CreamOption {
  name: string;
  price: number;
  available: boolean;
}

interface ContainerType {
  name: string;
  value: string;
}

interface Cake {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  images: string[];
  basePrice: number;
  rating: number;
  reviews: number;
  category: string;
  availableSizes: Size[];
  creamOptions: CreamOption[];
}

// Sample cake data - in real app this would come from API
const cakes: Cake[] = [
  { 
    id: 1, 
    name: 'Vanilla', 
    description: 'Classic vanilla cake with smooth buttercream frosting. Perfect for any celebration with its light, fluffy texture and delicate vanilla flavor.',
    longDescription: 'Our signature vanilla cake is made with the finest ingredients including Madagascar vanilla beans, organic eggs, and premium flour. Each layer is carefully baked to perfection and filled with our house-made vanilla buttercream frosting. The cake is then finished with a smooth outer layer of frosting and can be decorated according to your preferences.',
    imageUrl: '/product-images/vanilla cake.jpg',
    images: ['/product-images/vanilla cake.jpg', '/product-images/vanilla cake.jpg', '/product-images/vanilla cake.jpg'],
    basePrice: 1500,
    rating: 4.8,
    reviews: 127,
    category: 'Basic',
    availableSizes: [
      { size: '0.5 kg', price: 1500, servings: 4 },
      { size: '1 kg', price: 2600, servings: 8 },
      { size: '1.5 kg', price: 3822, servings: 12 },
      { size: '2 kg', price: 5096, servings: 16 },
      { size: '3 kg', price: 7644, servings: 24 },
      { size: '4 kg', price: 10192, servings: 32 },
      { size: '5 kg', price: 12740, servings: 40 }
    ],
    creamOptions: [
      { name: 'Vanilla Buttercream', price: 0, available: true },
      { name: 'Chocolate Buttercream', price: 200, available: true },
      { name: 'Strawberry Buttercream', price: 300, available: true },
      { name: 'Coffee Buttercream', price: 250, available: true },
      { name: 'Lemon Buttercream', price: 200, available: true }
    ]
  },
  { 
    id: 2, 
    name: 'Black Forest', 
    description: 'Classic chocolate cake with cherries and cream',
    longDescription: 'Our Black Forest cake features layers of rich chocolate sponge cake, generously filled with fresh cherries and whipped cream. Each layer is carefully assembled and finished with chocolate shavings and cherry decorations. The perfect balance of chocolate, cream, and fruit makes this cake a crowd-pleaser for any occasion.',
    imageUrl: '/product-images/black forest.jpg',
    images: ['/product-images/black forest.jpg', '/product-images/black forest.jpg', '/product-images/black forest.jpg'],
    basePrice: 1600,
    rating: 4.9,
    reviews: 89,
    category: 'Premium',
    availableSizes: [
      { size: '0.5 kg', price: 1600, servings: 4 },
      { size: '1 kg', price: 2800, servings: 8 },
      { size: '1.5 kg', price: 4200, servings: 12 },
      { size: '2 kg', price: 5600, servings: 16 },
      { size: '3 kg', price: 8400, servings: 24 },
      { size: '4 kg', price: 11200, servings: 32 },
      { size: '5 kg', price: 14000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Chocolate Buttercream', price: 0, available: true },
      { name: 'Vanilla Buttercream', price: 200, available: true },
      { name: 'Coffee Buttercream', price: 250, available: true },
      { name: 'Cherry Buttercream', price: 300, available: true },
      { name: 'Dark Chocolate Ganache', price: 400, available: true }
    ]
  },
  { 
    id: 3, 
    name: 'Red Velvet', 
    description: 'Classic red velvet with cream cheese frosting. A stunning cake with its signature red color and tangy cream cheese frosting.',
    longDescription: 'Our Red Velvet cake is a true classic, featuring a moist, velvety texture with a subtle cocoa flavor and that signature red color. Each layer is filled and frosted with our house-made cream cheese frosting, creating the perfect balance of sweetness and tang. Finished with elegant decorations, this cake is perfect for special occasions.',
    imageUrl: '/product-images/red velvet.jpg',
    images: ['/product-images/red velvet.jpg', '/product-images/red velvet.jpg', '/product-images/red velvet.jpg'],
    basePrice: 1700,
    rating: 4.7,
    reviews: 156,
    category: 'Specialty',
    availableSizes: [
      { size: '0.5 kg', price: 1700, servings: 4 },
      { size: '1 kg', price: 3000, servings: 8 },
      { size: '1.5 kg', price: 4500, servings: 12 },
      { size: '2 kg', price: 6000, servings: 16 },
      { size: '3 kg', price: 9000, servings: 24 },
      { size: '4 kg', price: 12000, servings: 32 },
      { size: '5 kg', price: 15000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Cream Cheese Frosting', price: 0, available: true },
      { name: 'Vanilla Buttercream', price: 200, available: true },
      { name: 'Chocolate Buttercream', price: 200, available: true },
      { name: 'White Chocolate Ganache', price: 400, available: true },
      { name: 'Strawberry Cream Cheese', price: 300, available: true }
    ]
  },
  { 
    id: 4, 
    name: 'Chocolate Fudge', 
    description: 'Rich chocolate fudge cake with intense chocolate flavor. Perfect for chocolate lovers who want the ultimate chocolate experience.',
    longDescription: 'Our Chocolate Fudge cake is the ultimate indulgence for chocolate lovers. Made with premium dark chocolate and cocoa powder, this cake has an intense, rich chocolate flavor with a dense, fudgy texture. Each layer is filled with chocolate ganache and finished with a smooth chocolate frosting. Decadent and delicious!',
    imageUrl: '/product-images/chcocolate fudge.jpg',
    images: ['/product-images/chcocolate fudge.jpg', '/product-images/chcocolate fudge.jpg', '/product-images/chcocolate fudge.jpg'],
    basePrice: 1700,
    rating: 4.9,
    reviews: 203,
    category: 'Specialty',
    availableSizes: [
      { size: '0.5 kg', price: 1700, servings: 4 },
      { size: '1 kg', price: 3000, servings: 8 },
      { size: '1.5 kg', price: 4500, servings: 12 },
      { size: '2 kg', price: 6000, servings: 16 },
      { size: '3 kg', price: 9000, servings: 24 },
      { size: '4 kg', price: 12000, servings: 32 },
      { size: '5 kg', price: 15000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Chocolate Ganache', price: 0, available: true },
      { name: 'Chocolate Buttercream', price: 200, available: true },
      { name: 'Coffee Buttercream', price: 250, available: true },
      { name: 'Mint Chocolate Buttercream', price: 300, available: true },
      { name: 'Dark Chocolate Ganache', price: 400, available: true }
    ]
  },
  { 
    id: 5, 
    name: 'Rainbow Cake', 
    description: 'Colorful rainbow layers with vanilla frosting. A fun and vibrant cake that brings joy to any celebration.',
    longDescription: 'Our Rainbow cake is a celebration of colors and joy! Each layer is carefully colored and baked to create a beautiful rainbow effect. The layers are filled and frosted with smooth vanilla buttercream, creating a stunning visual impact when sliced. Perfect for birthdays, pride celebrations, or any occasion that calls for a little extra color and fun.',
    imageUrl: '/product-images/rainbow cake.jpg',
    images: ['/product-images/rainbow cake.jpg', '/product-images/rainbow cake.jpg', '/product-images/rainbow cake.jpg'],
    basePrice: 1800,
    rating: 4.6,
    reviews: 94,
    category: 'Luxury',
    availableSizes: [
      { size: '0.5 kg', price: 1800, servings: 4 },
      { size: '1 kg', price: 3200, servings: 8 },
      { size: '1.5 kg', price: 4800, servings: 12 },
      { size: '2 kg', price: 6400, servings: 16 },
      { size: '3 kg', price: 9600, servings: 24 },
      { size: '4 kg', price: 12800, servings: 32 },
      { size: '5 kg', price: 16000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Vanilla Buttercream', price: 0, available: true },
      { name: 'Chocolate Buttercream', price: 200, available: true },
      { name: 'Strawberry Buttercream', price: 300, available: true },
      { name: 'Lemon Buttercream', price: 200, available: true },
      { name: 'Cream Cheese Frosting', price: 250, available: true }
    ]
  },
  { 
    id: 19, 
    name: 'Banana Cake', 
    description: 'Moist banana cake with walnuts',
    longDescription: 'Our Banana Cake is made with ripe bananas and crunchy walnuts for a moist, flavorful treat. Perfect for breakfast, tea time, or dessert, this cake is a customer favorite for its natural sweetness and soft crumb. Finished with a light banana glaze or classic buttercream, it can be customized to your liking.',
    imageUrl: '/product-images/banana cake.jpg',
    images: ['/product-images/banana cake.jpg', '/product-images/banana cake.jpg', '/product-images/banana cake.jpg'],
    basePrice: 1700,
    rating: 4.7,
    reviews: 61,
    category: 'Specialty',
    availableSizes: [
      { size: '0.5 kg', price: 1700, servings: 4 },
      { size: '1 kg', price: 3000, servings: 8 },
      { size: '1.5 kg', price: 4500, servings: 12 },
      { size: '2 kg', price: 6000, servings: 16 },
      { size: '3 kg', price: 9000, servings: 24 },
      { size: '4 kg', price: 12000, servings: 32 },
      { size: '5 kg', price: 15000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Vanilla Buttercream', price: 0, available: true },
      { name: 'Banana Buttercream', price: 200, available: true },
      { name: 'Chocolate Buttercream', price: 200, available: true },
      { name: 'Cream Cheese Frosting', price: 250, available: true },
      { name: 'Coffee Buttercream', price: 250, available: true }
    ]
  },
  { 
    id: 7, 
    name: 'Black Forest', 
    description: 'Classic chocolate cake with cherries and cream',
    longDescription: 'Our Black Forest cake features layers of rich chocolate sponge cake, generously filled with fresh cherries and whipped cream. Each layer is carefully assembled and finished with chocolate shavings and cherry decorations. The perfect balance of chocolate, cream, and fruit makes this cake a crowd-pleaser for any occasion.',
    imageUrl: '/product-images/black forest.jpg',
    images: ['/product-images/black forest.jpg', '/product-images/black forest.jpg', '/product-images/black forest.jpg'],
    basePrice: 1600,
    rating: 4.9,
    reviews: 89,
    category: 'Premium',
    availableSizes: [
      { size: '0.5 kg', price: 1600, servings: 4 },
      { size: '1 kg', price: 2800, servings: 8 },
      { size: '1.5 kg', price: 4200, servings: 12 },
      { size: '2 kg', price: 5600, servings: 16 },
      { size: '3 kg', price: 8400, servings: 24 },
      { size: '4 kg', price: 11200, servings: 32 },
      { size: '5 kg', price: 14000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Chocolate Buttercream', price: 0, available: true },
      { name: 'Vanilla Buttercream', price: 200, available: true },
      { name: 'Coffee Buttercream', price: 250, available: true },
      { name: 'Cherry Buttercream', price: 300, available: true },
      { name: 'Dark Chocolate Ganache', price: 400, available: true }
    ]
  },
  { 
    id: 24, 
    name: 'Butterscotch Cake', 
    description: 'Butterscotch flavored cake with caramel',
    longDescription: 'Our Butterscotch Cake is a rich, indulgent treat featuring the warm, buttery flavor of butterscotch combined with smooth caramel. Each layer is infused with butterscotch flavor and filled with caramel sauce, creating a decadent dessert that\'s perfect for special occasions. Finished with butterscotch buttercream and caramel drizzle for an extra touch of sweetness.',
    imageUrl: '/product-images/butterscotch cake.jpg',
    images: ['/product-images/butterscotch cake.jpg', '/product-images/butterscotch cake.jpg', '/product-images/butterscotch cake.jpg'],
    basePrice: 1800,
    rating: 4.8,
    reviews: 73,
    category: 'Luxury',
    availableSizes: [
      { size: '0.5 kg', price: 1800, servings: 4 },
      { size: '1 kg', price: 3200, servings: 8 },
      { size: '1.5 kg', price: 4800, servings: 12 },
      { size: '2 kg', price: 6400, servings: 16 },
      { size: '3 kg', price: 9600, servings: 24 },
      { size: '4 kg', price: 12800, servings: 32 },
      { size: '5 kg', price: 16000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Butterscotch Buttercream', price: 0, available: true },
      { name: 'Vanilla Buttercream', price: 200, available: true },
      { name: 'Caramel Buttercream', price: 300, available: true },
      { name: 'Chocolate Buttercream', price: 200, available: true },
      { name: 'Cream Cheese Frosting', price: 250, available: true }
    ]
  },
  { 
    id: 25, 
    name: 'Caramel Cake', 
    description: 'Caramel cake with caramel frosting',
    longDescription: 'Our Caramel Cake is a luxurious dessert featuring rich caramel flavor throughout. Each layer is infused with homemade caramel and filled with smooth caramel sauce, creating a decadent treat that caramel lovers will adore. The cake is finished with caramel buttercream frosting and topped with caramel drizzle for an extra indulgent experience.',
    imageUrl: '/product-images/caramel cake.jpg',
    images: ['/product-images/caramel cake.jpg', '/product-images/caramel cake.jpg', '/product-images/caramel cake.jpg'],
    basePrice: 1800,
    rating: 4.7,
    reviews: 89,
    category: 'Luxury',
    availableSizes: [
      { size: '0.5 kg', price: 1800, servings: 4 },
      { size: '1 kg', price: 3200, servings: 8 },
      { size: '1.5 kg', price: 4800, servings: 12 },
      { size: '2 kg', price: 6400, servings: 16 },
      { size: '3 kg', price: 9600, servings: 24 },
      { size: '4 kg', price: 12800, servings: 32 },
      { size: '5 kg', price: 16000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Caramel Buttercream', price: 0, available: true },
      { name: 'Vanilla Buttercream', price: 200, available: true },
      { name: 'Butterscotch Buttercream', price: 300, available: true },
      { name: 'Chocolate Buttercream', price: 200, available: true },
      { name: 'Cream Cheese Frosting', price: 250, available: true }
    ]
  },
  { 
    id: 15, 
    name: 'Carrot Cake', 
    description: 'Moist carrot cake with cream cheese frosting',
    longDescription: 'Our Carrot Cake is a classic favorite featuring freshly grated carrots, warm spices, and crunchy walnuts. Each layer is moist and flavorful, filled with our signature cream cheese frosting that perfectly balances the sweetness. This wholesome cake is finished with cream cheese frosting and can be decorated with carrot decorations for a charming presentation.',
    imageUrl: '/product-images/carrot cake.jpg',
    images: ['/product-images/carrot cake.jpg', '/product-images/carrot cake.jpg', '/product-images/carrot cake.jpg'],
    basePrice: 1700,
    rating: 4.6,
    reviews: 112,
    category: 'Specialty',
    availableSizes: [
      { size: '0.5 kg', price: 1700, servings: 4 },
      { size: '1 kg', price: 3000, servings: 8 },
      { size: '1.5 kg', price: 4500, servings: 12 },
      { size: '2 kg', price: 6000, servings: 16 },
      { size: '3 kg', price: 9000, servings: 24 },
      { size: '4 kg', price: 12000, servings: 32 },
      { size: '5 kg', price: 15000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Cream Cheese Frosting', price: 0, available: true },
      { name: 'Vanilla Buttercream', price: 200, available: true },
      { name: 'Maple Buttercream', price: 300, available: true },
      { name: 'Cinnamon Buttercream', price: 250, available: true },
      { name: 'Orange Buttercream', price: 200, available: true }
    ]
  },
  { 
    id: 6, 
    name: 'Marble (Vanilla Chocolate)', 
    description: 'Beautiful marble pattern with chocolate and vanilla',
    longDescription: 'Our Marble Cake features a stunning swirl pattern of vanilla and chocolate batter, creating a beautiful marbled effect when sliced. Each layer is perfectly balanced with both flavors, making it a favorite for those who can\'t decide between vanilla and chocolate. Finished with smooth buttercream frosting.',
    imageUrl: '/product-images/marble vanilla chocolate.jpg',
    images: ['/product-images/marble vanilla chocolate.jpg', '/product-images/marble vanilla chocolate.jpg', '/product-images/marble vanilla chocolate.jpg'],
    basePrice: 1600,
    rating: 4.5,
    reviews: 78,
    category: 'Premium',
    availableSizes: [
      { size: '0.5 kg', price: 1600, servings: 4 },
      { size: '1 kg', price: 2800, servings: 8 },
      { size: '1.5 kg', price: 4200, servings: 12 },
      { size: '2 kg', price: 5600, servings: 16 },
      { size: '3 kg', price: 8400, servings: 24 },
      { size: '4 kg', price: 11200, servings: 32 },
      { size: '5 kg', price: 14000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Vanilla Buttercream', price: 0, available: true },
      { name: 'Chocolate Buttercream', price: 200, available: true },
      { name: 'Coffee Buttercream', price: 250, available: true },
      { name: 'Strawberry Buttercream', price: 300, available: true },
      { name: 'Cream Cheese Frosting', price: 250, available: true }
    ]
  },
  { 
    id: 8, 
    name: 'Strawberry Forest', 
    description: 'Strawberry cake with fresh strawberries',
    longDescription: 'Our Strawberry Forest cake is a delightful combination of light strawberry sponge cake and fresh strawberries. Each layer is filled with fresh strawberry cream and topped with whole strawberries. The cake is finished with strawberry buttercream and decorated with fresh strawberry slices for a beautiful presentation.',
    imageUrl: '/product-images/strawberry forest.jpg',
    images: ['/product-images/strawberry forest.jpg', '/product-images/strawberry forest.jpg', '/product-images/strawberry forest.jpg'],
    basePrice: 1600,
    rating: 4.7,
    reviews: 95,
    category: 'Premium',
    availableSizes: [
      { size: '0.5 kg', price: 1600, servings: 4 },
      { size: '1 kg', price: 2800, servings: 8 },
      { size: '1.5 kg', price: 4200, servings: 12 },
      { size: '2 kg', price: 5600, servings: 16 },
      { size: '3 kg', price: 8400, servings: 24 },
      { size: '4 kg', price: 11200, servings: 32 },
      { size: '5 kg', price: 14000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Strawberry Buttercream', price: 0, available: true },
      { name: 'Vanilla Buttercream', price: 200, available: true },
      { name: 'Chocolate Buttercream', price: 200, available: true },
      { name: 'Cream Cheese Frosting', price: 250, available: true },
      { name: 'Lemon Buttercream', price: 200, available: true }
    ]
  },
  { 
    id: 9, 
    name: 'Chocolate Orange', 
    description: 'Rich chocolate with orange zest',
    longDescription: 'Our Chocolate Orange cake combines the rich, deep flavor of chocolate with the bright, citrusy notes of orange zest. Each layer is infused with orange essence and filled with chocolate-orange ganache. The perfect balance of sweet and tangy makes this cake a sophisticated choice for any celebration.',
    imageUrl: '/product-images/chocolate orange.jpg',
    images: ['/product-images/chocolate orange.jpg', '/product-images/chocolate orange.jpg', '/product-images/chocolate orange.jpg'],
    basePrice: 1600,
    rating: 4.6,
    reviews: 82,
    category: 'Premium',
    availableSizes: [
      { size: '0.5 kg', price: 1600, servings: 4 },
      { size: '1 kg', price: 2800, servings: 8 },
      { size: '1.5 kg', price: 4200, servings: 12 },
      { size: '2 kg', price: 5600, servings: 16 },
      { size: '3 kg', price: 8400, servings: 24 },
      { size: '4 kg', price: 11200, servings: 32 },
      { size: '5 kg', price: 14000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Chocolate Buttercream', price: 0, available: true },
      { name: 'Orange Buttercream', price: 200, available: true },
      { name: 'Vanilla Buttercream', price: 200, available: true },
      { name: 'Coffee Buttercream', price: 250, available: true },
      { name: 'Dark Chocolate Ganache', price: 400, available: true }
    ]
  },
  { 
    id: 10, 
    name: 'Lemon Cake', 
    description: 'Tangy lemon cake with lemon glaze',
    longDescription: 'Our Lemon Cake is a refreshing treat featuring bright lemon flavor throughout. Each layer is infused with fresh lemon zest and juice, creating a tangy, citrusy delight. The cake is filled with lemon curd and finished with lemon buttercream frosting, making it perfect for spring and summer celebrations.',
    imageUrl: '/product-images/lemon cake.jpg',
    images: ['/product-images/lemon cake.jpg', '/product-images/lemon cake.jpg', '/product-images/lemon cake.jpg'],
    basePrice: 1600,
    rating: 4.5,
    reviews: 67,
    category: 'Premium',
    availableSizes: [
      { size: '0.5 kg', price: 1600, servings: 4 },
      { size: '1 kg', price: 2800, servings: 8 },
      { size: '1.5 kg', price: 4200, servings: 12 },
      { size: '2 kg', price: 5600, servings: 16 },
      { size: '3 kg', price: 8400, servings: 24 },
      { size: '4 kg', price: 11200, servings: 32 },
      { size: '5 kg', price: 14000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Lemon Buttercream', price: 0, available: true },
      { name: 'Vanilla Buttercream', price: 200, available: true },
      { name: 'Cream Cheese Frosting', price: 250, available: true },
      { name: 'Strawberry Buttercream', price: 300, available: true },
      { name: 'Orange Buttercream', price: 200, available: true }
    ]
  },
  { 
    id: 11, 
    name: 'Red Velvet', 
    description: 'Classic red velvet with cream cheese frosting',
    longDescription: 'Our Red Velvet cake is a true classic, featuring a moist, velvety texture with a subtle cocoa flavor and that signature red color. Each layer is filled and frosted with our house-made cream cheese frosting, creating the perfect balance of sweetness and tang. Finished with elegant decorations, this cake is perfect for special occasions.',
    imageUrl: '/product-images/red velvet.jpg',
    images: ['/product-images/red velvet.jpg', '/product-images/red velvet.jpg', '/product-images/red velvet.jpg'],
    basePrice: 1700,
    rating: 4.7,
    reviews: 156,
    category: 'Specialty',
    availableSizes: [
      { size: '0.5 kg', price: 1700, servings: 4 },
      { size: '1 kg', price: 3000, servings: 8 },
      { size: '1.5 kg', price: 4500, servings: 12 },
      { size: '2 kg', price: 6000, servings: 16 },
      { size: '3 kg', price: 9000, servings: 24 },
      { size: '4 kg', price: 12000, servings: 32 },
      { size: '5 kg', price: 15000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Cream Cheese Frosting', price: 0, available: true },
      { name: 'Vanilla Buttercream', price: 200, available: true },
      { name: 'Chocolate Buttercream', price: 200, available: true },
      { name: 'White Chocolate Ganache', price: 400, available: true },
      { name: 'Strawberry Cream Cheese', price: 300, available: true }
    ]
  },
  { 
    id: 12, 
    name: 'Light Fruit Cake', 
    description: 'Light fruit cake with mixed dried fruits',
    longDescription: 'Our Light Fruit Cake is a traditional favorite featuring a light, moist sponge cake filled with a variety of dried fruits including raisins, currants, and candied orange peel. Each slice reveals beautiful fruit pieces throughout, making it perfect for afternoon tea or as a dessert option.',
    imageUrl: '/product-images/light fruit cake.jpg',
    images: ['/product-images/light fruit cake.jpg', '/product-images/light fruit cake.jpg', '/product-images/light fruit cake.jpg'],
    basePrice: 1700,
    rating: 4.4,
    reviews: 89,
    category: 'Specialty',
    availableSizes: [
      { size: '0.5 kg', price: 1700, servings: 4 },
      { size: '1 kg', price: 3000, servings: 8 },
      { size: '1.5 kg', price: 4500, servings: 12 },
      { size: '2 kg', price: 6000, servings: 16 },
      { size: '3 kg', price: 9000, servings: 24 },
      { size: '4 kg', price: 12000, servings: 32 },
      { size: '5 kg', price: 15000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Vanilla Buttercream', price: 0, available: true },
      { name: 'Cream Cheese Frosting', price: 250, available: true },
      { name: 'Orange Buttercream', price: 200, available: true },
      { name: 'Lemon Buttercream', price: 200, available: true },
      { name: 'Almond Buttercream', price: 300, available: true }
    ]
  },
  { 
    id: 13, 
    name: 'Chocolate Fudge', 
    description: 'Rich chocolate fudge cake',
    longDescription: 'Our Chocolate Fudge cake is the ultimate indulgence for chocolate lovers. Made with premium dark chocolate and cocoa powder, this cake has an intense, rich chocolate flavor with a dense, fudgy texture. Each layer is filled with chocolate ganache and finished with a smooth chocolate frosting. Decadent and delicious!',
    imageUrl: '/product-images/chcocolate fudge.jpg',
    images: ['/product-images/chcocolate fudge.jpg', '/product-images/chcocolate fudge.jpg', '/product-images/chcocolate fudge.jpg'],
    basePrice: 1700,
    rating: 4.9,
    reviews: 203,
    category: 'Specialty',
    availableSizes: [
      { size: '0.5 kg', price: 1700, servings: 4 },
      { size: '1 kg', price: 3000, servings: 8 },
      { size: '1.5 kg', price: 4500, servings: 12 },
      { size: '2 kg', price: 6000, servings: 16 },
      { size: '3 kg', price: 9000, servings: 24 },
      { size: '4 kg', price: 12000, servings: 32 },
      { size: '5 kg', price: 15000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Chocolate Ganache', price: 0, available: true },
      { name: 'Chocolate Buttercream', price: 200, available: true },
      { name: 'Coffee Buttercream', price: 250, available: true },
      { name: 'Mint Chocolate Buttercream', price: 300, available: true },
      { name: 'Dark Chocolate Ganache', price: 400, available: true }
    ]
  },
  { 
    id: 14, 
    name: 'Chocolate Mint', 
    description: 'Chocolate cake with mint frosting',
    longDescription: 'Our Chocolate Mint cake combines the rich flavor of chocolate with the refreshing taste of mint. Each layer features chocolate cake filled with mint buttercream, creating a perfect balance of sweet and refreshing. The cake is finished with mint chocolate ganache and can be decorated with mint leaves for an elegant presentation.',
    imageUrl: '/product-images/chocolate mint.jpg',
    images: ['/product-images/chocolate mint.jpg', '/product-images/chocolate mint.jpg', '/product-images/chocolate mint.jpg'],
    basePrice: 1700,
    rating: 4.6,
    reviews: 74,
    category: 'Specialty',
    availableSizes: [
      { size: '0.5 kg', price: 1700, servings: 4 },
      { size: '1 kg', price: 3000, servings: 8 },
      { size: '1.5 kg', price: 4500, servings: 12 },
      { size: '2 kg', price: 6000, servings: 16 },
      { size: '3 kg', price: 9000, servings: 24 },
      { size: '4 kg', price: 12000, servings: 32 },
      { size: '5 kg', price: 15000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Mint Buttercream', price: 0, available: true },
      { name: 'Chocolate Buttercream', price: 200, available: true },
      { name: 'Vanilla Buttercream', price: 200, available: true },
      { name: 'Mint Chocolate Ganache', price: 400, available: true },
      { name: 'Cream Cheese Frosting', price: 250, available: true }
    ]
  },
  { 
    id: 16, 
    name: 'Zucchini Cake', 
    description: 'Healthy zucchini cake with nuts',
    longDescription: 'Our Zucchini Cake is a wholesome and delicious option featuring fresh zucchini and crunchy walnuts. The zucchini adds natural moisture and a subtle vegetable sweetness, while the walnuts provide a satisfying crunch. This cake is perfect for those looking for a healthier dessert option without compromising on taste.',
    imageUrl: '/product-images/zucchini cake.jpg',
    images: ['/product-images/zucchini cake.jpg', '/product-images/zucchini cake.jpg', '/product-images/zucchini cake.jpg'],
    basePrice: 1700,
    rating: 4.3,
    reviews: 56,
    category: 'Specialty',
    availableSizes: [
      { size: '0.5 kg', price: 1700, servings: 4 },
      { size: '1 kg', price: 3000, servings: 8 },
      { size: '1.5 kg', price: 4500, servings: 12 },
      { size: '2 kg', price: 6000, servings: 16 },
      { size: '3 kg', price: 9000, servings: 24 },
      { size: '4 kg', price: 12000, servings: 32 },
      { size: '5 kg', price: 15000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Cream Cheese Frosting', price: 0, available: true },
      { name: 'Vanilla Buttercream', price: 200, available: true },
      { name: 'Maple Buttercream', price: 300, available: true },
      { name: 'Cinnamon Buttercream', price: 250, available: true },
      { name: 'Orange Buttercream', price: 200, available: true }
    ]
  },
  { 
    id: 17, 
    name: 'Pinacolada Cake', 
    description: 'Tropical pineapple and coconut cake',
    longDescription: 'Our Pinacolada Cake brings the tropical flavors of pineapple and coconut to your celebration. Each layer features pineapple-infused cake with coconut cream filling, creating a refreshing tropical taste. The cake is finished with coconut buttercream and can be decorated with pineapple slices and coconut flakes for a beachy presentation.',
    imageUrl: '/product-images/pinacolada cake.jpg',
    images: ['/product-images/pinacolada cake.jpg', '/product-images/pinacolada cake.jpg', '/product-images/pinacolada cake.jpg'],
    basePrice: 1700,
    rating: 4.5,
    reviews: 68,
    category: 'Specialty',
    availableSizes: [
      { size: '0.5 kg', price: 1700, servings: 4 },
      { size: '1 kg', price: 3000, servings: 8 },
      { size: '1.5 kg', price: 4500, servings: 12 },
      { size: '2 kg', price: 6000, servings: 16 },
      { size: '3 kg', price: 9000, servings: 24 },
      { size: '4 kg', price: 12000, servings: 32 },
      { size: '5 kg', price: 15000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Coconut Buttercream', price: 0, available: true },
      { name: 'Vanilla Buttercream', price: 200, available: true },
      { name: 'Pineapple Buttercream', price: 300, available: true },
      { name: 'Cream Cheese Frosting', price: 250, available: true },
      { name: 'Lemon Buttercream', price: 200, available: true }
    ]
  },
  { 
    id: 18, 
    name: 'Passion Cake', 
    description: 'Passion fruit flavored cake',
    longDescription: 'Our Passion Cake features the exotic and tangy flavor of passion fruit. Each layer is infused with passion fruit puree and filled with passion fruit curd, creating a unique and refreshing taste experience. The cake is finished with passion fruit buttercream and can be decorated with fresh passion fruit seeds for an elegant presentation.',
    imageUrl: '/product-images/passion cake.jpg',
    images: ['/product-images/passion cake.jpg', '/product-images/passion cake.jpg', '/product-images/passion cake.jpg'],
    basePrice: 1700,
    rating: 4.4,
    reviews: 72,
    category: 'Specialty',
    availableSizes: [
      { size: '0.5 kg', price: 1700, servings: 4 },
      { size: '1 kg', price: 3000, servings: 8 },
      { size: '1.5 kg', price: 4500, servings: 12 },
      { size: '2 kg', price: 6000, servings: 16 },
      { size: '3 kg', price: 9000, servings: 24 },
      { size: '4 kg', price: 12000, servings: 32 },
      { size: '5 kg', price: 15000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Passion Fruit Buttercream', price: 0, available: true },
      { name: 'Vanilla Buttercream', price: 200, available: true },
      { name: 'Lemon Buttercream', price: 200, available: true },
      { name: 'Cream Cheese Frosting', price: 250, available: true },
      { name: 'Orange Buttercream', price: 200, available: true }
    ]
  },
  { 
    id: 20, 
    name: 'Mocha Cake', 
    description: 'Coffee and chocolate combination',
    longDescription: 'Our Mocha Cake combines the rich flavors of coffee and chocolate in perfect harmony. Each layer features coffee-infused chocolate cake with mocha ganache filling, creating a sophisticated taste that coffee lovers will adore. The cake is finished with mocha buttercream and can be decorated with coffee beans for an elegant presentation.',
    imageUrl: '/product-images/mocha cake.jpg',
    images: ['/product-images/mocha cake.jpg', '/product-images/mocha cake.jpg', '/product-images/mocha cake.jpg'],
    basePrice: 1700,
    rating: 4.7,
    reviews: 91,
    category: 'Specialty',
    availableSizes: [
      { size: '0.5 kg', price: 1700, servings: 4 },
      { size: '1 kg', price: 3000, servings: 8 },
      { size: '1.5 kg', price: 4500, servings: 12 },
      { size: '2 kg', price: 6000, servings: 16 },
      { size: '3 kg', price: 9000, servings: 24 },
      { size: '4 kg', price: 12000, servings: 32 },
      { size: '5 kg', price: 15000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Mocha Buttercream', price: 0, available: true },
      { name: 'Chocolate Buttercream', price: 200, available: true },
      { name: 'Coffee Buttercream', price: 250, available: true },
      { name: 'Vanilla Buttercream', price: 200, available: true },
      { name: 'Dark Chocolate Ganache', price: 400, available: true }
    ]
  },
  { 
    id: 21, 
    name: 'Rainbow Cake', 
    description: 'Colorful rainbow layers with vanilla frosting',
    longDescription: 'Our Rainbow cake is a celebration of colors and joy! Each layer is carefully colored and baked to create a beautiful rainbow effect. The layers are filled and frosted with smooth vanilla buttercream, creating a stunning visual impact when sliced. Perfect for birthdays, pride celebrations, or any occasion that calls for a little extra color and fun.',
    imageUrl: '/product-images/rainbow cake.jpg',
    images: ['/product-images/rainbow cake.jpg', '/product-images/rainbow cake.jpg', '/product-images/rainbow cake.jpg'],
    basePrice: 1800,
    rating: 4.6,
    reviews: 94,
    category: 'Luxury',
    availableSizes: [
      { size: '0.5 kg', price: 1800, servings: 4 },
      { size: '1 kg', price: 3200, servings: 8 },
      { size: '1.5 kg', price: 4800, servings: 12 },
      { size: '2 kg', price: 6400, servings: 16 },
      { size: '3 kg', price: 9600, servings: 24 },
      { size: '4 kg', price: 12800, servings: 32 },
      { size: '5 kg', price: 16000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Vanilla Buttercream', price: 0, available: true },
      { name: 'Chocolate Buttercream', price: 200, available: true },
      { name: 'Strawberry Buttercream', price: 300, available: true },
      { name: 'Lemon Buttercream', price: 200, available: true },
      { name: 'Cream Cheese Frosting', price: 250, available: true }
    ]
  },
  { 
    id: 22, 
    name: 'Strawberry Cake', 
    description: 'Fresh strawberry cake with strawberry frosting',
    longDescription: 'Our Strawberry Cake is a delightful treat featuring fresh strawberries throughout. Each layer is made with real strawberry puree and filled with fresh strawberry cream. The cake is finished with strawberry buttercream and decorated with fresh strawberry slices, creating a beautiful and delicious dessert perfect for spring and summer celebrations.',
    imageUrl: '/product-images/strawberry cake.jpg',
    images: ['/product-images/strawberry cake.jpg', '/product-images/strawberry cake.jpg', '/product-images/strawberry cake.jpg'],
    basePrice: 1800,
    rating: 4.8,
    reviews: 103,
    category: 'Luxury',
    availableSizes: [
      { size: '0.5 kg', price: 1800, servings: 4 },
      { size: '1 kg', price: 3200, servings: 8 },
      { size: '1.5 kg', price: 4800, servings: 12 },
      { size: '2 kg', price: 6400, servings: 16 },
      { size: '3 kg', price: 9600, servings: 24 },
      { size: '4 kg', price: 12800, servings: 32 },
      { size: '5 kg', price: 16000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Strawberry Buttercream', price: 0, available: true },
      { name: 'Vanilla Buttercream', price: 200, available: true },
      { name: 'Cream Cheese Frosting', price: 250, available: true },
      { name: 'Chocolate Buttercream', price: 200, available: true },
      { name: 'Lemon Buttercream', price: 200, available: true }
    ]
  },
  { 
    id: 23, 
    name: 'Coconut Cake', 
    description: 'Coconut cake with coconut frosting',
    longDescription: 'Our Coconut Cake is a tropical delight featuring rich coconut flavor throughout. Each layer is made with coconut milk and shredded coconut, creating a moist and flavorful cake. The layers are filled with coconut cream and finished with coconut buttercream frosting, topped with toasted coconut flakes for an authentic tropical taste.',
    imageUrl: '/product-images/coconut cake.jpg',
    images: ['/product-images/coconut cake.jpg', '/product-images/coconut cake.jpg', '/product-images/coconut cake.jpg'],
    basePrice: 1800,
    rating: 4.5,
    reviews: 87,
    category: 'Luxury',
    availableSizes: [
      { size: '0.5 kg', price: 1800, servings: 4 },
      { size: '1 kg', price: 3200, servings: 8 },
      { size: '1.5 kg', price: 4800, servings: 12 },
      { size: '2 kg', price: 6400, servings: 16 },
      { size: '3 kg', price: 9600, servings: 24 },
      { size: '4 kg', price: 12800, servings: 32 },
      { size: '5 kg', price: 16000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Coconut Buttercream', price: 0, available: true },
      { name: 'Vanilla Buttercream', price: 200, available: true },
      { name: 'Cream Cheese Frosting', price: 250, available: true },
      { name: 'Chocolate Buttercream', price: 200, available: true },
      { name: 'Pineapple Buttercream', price: 300, available: true }
    ]
  },
  { 
    id: 26, 
    name: 'Orange Coconut Cake', 
    description: 'Orange and coconut combination',
    longDescription: 'Our Orange Coconut Cake combines the bright citrus flavor of orange with the tropical taste of coconut. Each layer features orange-infused cake with coconut cream filling, creating a perfect balance of tangy and sweet. The cake is finished with orange-coconut buttercream and decorated with orange zest and coconut flakes.',
    imageUrl: '/product-images/orange coconut cake.jpg',
    images: ['/product-images/orange coconut cake.jpg', '/product-images/orange coconut cake.jpg', '/product-images/orange coconut cake.jpg'],
    basePrice: 1800,
    rating: 4.4,
    reviews: 73,
    category: 'Luxury',
    availableSizes: [
      { size: '0.5 kg', price: 1800, servings: 4 },
      { size: '1 kg', price: 3200, servings: 8 },
      { size: '1.5 kg', price: 4800, servings: 12 },
      { size: '2 kg', price: 6400, servings: 16 },
      { size: '3 kg', price: 9600, servings: 24 },
      { size: '4 kg', price: 12800, servings: 32 },
      { size: '5 kg', price: 16000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Orange Coconut Buttercream', price: 0, available: true },
      { name: 'Vanilla Buttercream', price: 200, available: true },
      { name: 'Coconut Buttercream', price: 200, available: true },
      { name: 'Orange Buttercream', price: 200, available: true },
      { name: 'Cream Cheese Frosting', price: 250, available: true }
    ]
  },
  { 
    id: 27, 
    name: 'Lemon Coconut Cake', 
    description: 'Lemon and coconut combination',
    longDescription: 'Our Lemon Coconut Cake features the refreshing combination of tangy lemon and tropical coconut. Each layer is infused with fresh lemon zest and coconut milk, creating a unique and delightful flavor profile. The cake is filled with lemon-coconut cream and finished with lemon-coconut buttercream, perfect for summer celebrations.',
    imageUrl: '/product-images/lemon coconut cake.jpg',
    images: ['/product-images/lemon coconut cake.jpg', '/product-images/lemon coconut cake.jpg', '/product-images/lemon coconut cake.jpg'],
    basePrice: 1800,
    rating: 4.3,
    reviews: 65,
    category: 'Luxury',
    availableSizes: [
      { size: '0.5 kg', price: 1800, servings: 4 },
      { size: '1 kg', price: 3200, servings: 8 },
      { size: '1.5 kg', price: 4800, servings: 12 },
      { size: '2 kg', price: 6400, servings: 16 },
      { size: '3 kg', price: 9600, servings: 24 },
      { size: '4 kg', price: 12800, servings: 32 },
      { size: '5 kg', price: 16000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Lemon Coconut Buttercream', price: 0, available: true },
      { name: 'Lemon Buttercream', price: 200, available: true },
      { name: 'Coconut Buttercream', price: 200, available: true },
      { name: 'Vanilla Buttercream', price: 200, available: true },
      { name: 'Cream Cheese Frosting', price: 250, available: true }
    ]
  },
  { 
    id: 28, 
    name: 'Orange Poppy', 
    description: 'Orange cake with poppy seeds',
    longDescription: 'Our Orange Poppy Cake combines the bright flavor of orange with the subtle crunch of poppy seeds. Each layer features orange-infused cake with poppy seeds throughout, creating a unique texture and flavor. The cake is filled with orange cream and finished with orange buttercream, making it perfect for afternoon tea or brunch.',
    imageUrl: '/product-images/orange poppy cake.jpg',
    images: ['/product-images/orange poppy cake.jpg', '/product-images/orange poppy cake.jpg', '/product-images/orange poppy cake.jpg'],
    basePrice: 1800,
    rating: 4.2,
    reviews: 58,
    category: 'Luxury',
    availableSizes: [
      { size: '0.5 kg', price: 1800, servings: 4 },
      { size: '1 kg', price: 3200, servings: 8 },
      { size: '1.5 kg', price: 4800, servings: 12 },
      { size: '2 kg', price: 6400, servings: 16 },
      { size: '3 kg', price: 9600, servings: 24 },
      { size: '4 kg', price: 12800, servings: 32 },
      { size: '5 kg', price: 16000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Orange Buttercream', price: 0, available: true },
      { name: 'Vanilla Buttercream', price: 200, available: true },
      { name: 'Cream Cheese Frosting', price: 250, available: true },
      { name: 'Lemon Buttercream', price: 200, available: true },
      { name: 'Almond Buttercream', price: 300, available: true }
    ]
  },
  { 
    id: 29, 
    name: 'Lemon Poppy', 
    description: 'Lemon cake with poppy seeds',
    longDescription: 'Our Lemon Poppy Cake features the tangy flavor of lemon combined with the delicate crunch of poppy seeds. Each layer is infused with fresh lemon zest and juice, with poppy seeds adding texture and visual appeal. The cake is filled with lemon cream and finished with lemon buttercream, creating a refreshing and sophisticated dessert.',
    imageUrl: '/product-images/lemon poppy cake.jpg',
    images: ['/product-images/lemon poppy cake.jpg', '/product-images/lemon poppy cake.jpg', '/product-images/lemon poppy cake.jpg'],
    basePrice: 1800,
    rating: 4.4,
    reviews: 71,
    category: 'Luxury',
    availableSizes: [
      { size: '0.5 kg', price: 1800, servings: 4 },
      { size: '1 kg', price: 3200, servings: 8 },
      { size: '1.5 kg', price: 4800, servings: 12 },
      { size: '2 kg', price: 6400, servings: 16 },
      { size: '3 kg', price: 9600, servings: 24 },
      { size: '4 kg', price: 12800, servings: 32 },
      { size: '5 kg', price: 16000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Lemon Buttercream', price: 0, available: true },
      { name: 'Vanilla Buttercream', price: 200, available: true },
      { name: 'Cream Cheese Frosting', price: 250, available: true },
      { name: 'Orange Buttercream', price: 200, available: true },
      { name: 'Almond Buttercream', price: 300, available: true }
    ]
  },
  { 
    id: 30, 
    name: 'Sprinkles Confetti Cake', 
    description: 'Fun confetti cake with sprinkles',
    longDescription: 'Our Sprinkles Confetti Cake is a celebration in every bite! Each layer is filled with colorful sprinkles that create a fun, festive appearance when sliced. The cake is filled and frosted with vanilla buttercream, making it perfect for birthdays, celebrations, or any occasion that calls for a little extra joy and color.',
    imageUrl: '/product-images/sprinkle confetti cake.jpg',
    images: ['/product-images/sprinkle confetti cake.jpg', '/product-images/sprinkle confetti cake.jpg', '/product-images/sprinkle confetti cake.jpg'],
    basePrice: 2000,
    rating: 4.8,
    reviews: 112,
    category: 'Luxury',
    availableSizes: [
      { size: '0.5 kg', price: 2000, servings: 4 },
      { size: '1 kg', price: 3600, servings: 8 },
      { size: '1.5 kg', price: 5400, servings: 12 },
      { size: '2 kg', price: 7200, servings: 16 },
      { size: '3 kg', price: 10800, servings: 24 },
      { size: '4 kg', price: 14400, servings: 32 },
      { size: '5 kg', price: 18000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Vanilla Buttercream', price: 0, available: true },
      { name: 'Chocolate Buttercream', price: 200, available: true },
      { name: 'Strawberry Buttercream', price: 300, available: true },
      { name: 'Lemon Buttercream', price: 200, available: true },
      { name: 'Cream Cheese Frosting', price: 250, available: true }
    ]
  },
  { 
    id: 31, 
    name: 'Mild Fruit Cake', 
    description: 'Mild fruit cake with dried fruits',
    longDescription: 'Our Mild Fruit Cake is a traditional favorite featuring a light, moist sponge cake filled with a variety of dried fruits including raisins, currants, and candied orange peel. Each slice reveals beautiful fruit pieces throughout, making it perfect for afternoon tea or as a dessert option. The mild flavor makes it appealing to a wide range of tastes.',
    imageUrl: '/product-images/mild fruit cake.jpg',
    images: ['/product-images/mild fruit cake.jpg', '/product-images/mild fruit cake.jpg', '/product-images/mild fruit cake.jpg'],
    basePrice: 2000,
    rating: 4.3,
    reviews: 84,
    category: 'Luxury',
    availableSizes: [
      { size: '0.5 kg', price: 2000, servings: 4 },
      { size: '1 kg', price: 3600, servings: 8 },
      { size: '1.5 kg', price: 5400, servings: 12 },
      { size: '2 kg', price: 7200, servings: 16 },
      { size: '3 kg', price: 10800, servings: 24 },
      { size: '4 kg', price: 14400, servings: 32 },
      { size: '5 kg', price: 18000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Vanilla Buttercream', price: 0, available: true },
      { name: 'Cream Cheese Frosting', price: 250, available: true },
      { name: 'Orange Buttercream', price: 200, available: true },
      { name: 'Lemon Buttercream', price: 200, available: true },
      { name: 'Almond Buttercream', price: 300, available: true }
    ]
  },
  { 
    id: 32, 
    name: 'Chocolate Chip Cake', 
    description: 'Vanilla cake with chocolate chips',
    longDescription: 'Our Chocolate Chip Cake is a classic favorite featuring moist vanilla cake with generous amounts of chocolate chips throughout. Each bite offers the perfect balance of vanilla sweetness and chocolate richness. The cake is filled and frosted with vanilla buttercream, making it a crowd-pleaser for any occasion.',
    imageUrl: '/product-images/chocolate chip cake.jpg',
    images: ['/product-images/chocolate chip cake.jpg', '/product-images/chocolate chip cake.jpg', '/product-images/chocolate chip cake.jpg'],
    basePrice: 2000,
    rating: 4.7,
    reviews: 96,
    category: 'Luxury',
    availableSizes: [
      { size: '0.5 kg', price: 2000, servings: 4 },
      { size: '1 kg', price: 3600, servings: 8 },
      { size: '1.5 kg', price: 5400, servings: 12 },
      { size: '2 kg', price: 7200, servings: 16 },
      { size: '3 kg', price: 10800, servings: 24 },
      { size: '4 kg', price: 14400, servings: 32 },
      { size: '5 kg', price: 18000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Vanilla Buttercream', price: 0, available: true },
      { name: 'Chocolate Buttercream', price: 200, available: true },
      { name: 'Cream Cheese Frosting', price: 250, available: true },
      { name: 'Coffee Buttercream', price: 250, available: true },
      { name: 'Mint Buttercream', price: 300, available: true }
    ]
  },
  { 
    id: 33, 
    name: 'Vegan Cake', 
    description: 'Plant-based cake for everyone',
    longDescription: 'Our Vegan Cake is a delicious plant-based option that everyone can enjoy! Made without any animal products, this cake features the same great taste and texture as our traditional cakes. Each layer is filled and frosted with vegan buttercream, making it perfect for those with dietary restrictions or anyone looking for a plant-based dessert option.',
    imageUrl: '/product-images/vegan cake.webp',
    images: ['/product-images/vegan cake.webp', '/product-images/vegan cake.webp', '/product-images/vegan cake.webp'],
    basePrice: 2000,
    rating: 4.5,
    reviews: 78,
    category: 'Luxury',
    availableSizes: [
      { size: '0.5 kg', price: 2000, servings: 4 },
      { size: '1 kg', price: 3600, servings: 8 },
      { size: '1.5 kg', price: 5400, servings: 12 },
      { size: '2 kg', price: 7200, servings: 16 },
      { size: '3 kg', price: 10800, servings: 24 },
      { size: '4 kg', price: 14400, servings: 32 },
      { size: '5 kg', price: 18000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Vegan Vanilla Buttercream', price: 0, available: true },
      { name: 'Vegan Chocolate Buttercream', price: 200, available: true },
      { name: 'Vegan Strawberry Buttercream', price: 300, available: true },
      { name: 'Vegan Lemon Buttercream', price: 200, available: true },
      { name: 'Vegan Cream Cheese Frosting', price: 250, available: true }
    ]
  },
  { 
    id: 34, 
    name: 'Lemon Blueberry', 
    description: 'Lemon cake with fresh blueberries',
    longDescription: 'Our Lemon Blueberry Cake combines the bright, tangy flavor of lemon with the sweet, juicy taste of fresh blueberries. Each layer features lemon-infused cake with fresh blueberries throughout, creating a perfect balance of citrus and fruit. The cake is filled with lemon cream and finished with lemon buttercream, making it perfect for spring and summer celebrations.',
    imageUrl: '/product-images/lemon blueberry cake.jpg',
    images: ['/product-images/lemon blueberry cake.jpg', '/product-images/lemon blueberry cake.jpg', '/product-images/lemon blueberry cake.jpg'],
    basePrice: 2000,
    rating: 4.8,
    reviews: 89,
    category: 'Luxury',
    availableSizes: [
      { size: '0.5 kg', price: 2000, servings: 4 },
      { size: '1 kg', price: 3600, servings: 8 },
      { size: '1.5 kg', price: 5400, servings: 12 },
      { size: '2 kg', price: 7200, servings: 16 },
      { size: '3 kg', price: 10800, servings: 24 },
      { size: '4 kg', price: 14400, servings: 32 },
      { size: '5 kg', price: 18000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Lemon Buttercream', price: 0, available: true },
      { name: 'Vanilla Buttercream', price: 200, available: true },
      { name: 'Cream Cheese Frosting', price: 250, available: true },
      { name: 'Blueberry Buttercream', price: 300, available: true },
      { name: 'Orange Buttercream', price: 200, available: true }
    ]
  },
  { 
    id: 35, 
    name: 'Rich Fruit Cake', 
    description: 'Traditional rich fruit cake',
    longDescription: 'Our Rich Fruit Cake is a traditional favorite featuring a dense, moist cake filled with a variety of dried fruits including raisins, currants, candied orange peel, and mixed peel. Each slice reveals beautiful fruit pieces throughout, making it perfect for special occasions and holiday celebrations. The rich flavor and texture make it a sophisticated dessert option.',
    imageUrl: '/product-images/rich fruit cake.jpg',
    images: ['/product-images/rich fruit cake.jpg', '/product-images/rich fruit cake.jpg', '/product-images/rich fruit cake.jpg'],
    basePrice: 2300,
    rating: 4.6,
    reviews: 67,
    category: 'Premium',
    availableSizes: [
      { size: '0.5 kg', price: 2300, servings: 4 },
      { size: '1 kg', price: 4200, servings: 8 },
      { size: '1.5 kg', price: 6300, servings: 12 },
      { size: '2 kg', price: 8400, servings: 16 },
      { size: '3 kg', price: 12600, servings: 24 },
      { size: '4 kg', price: 16800, servings: 32 },
      { size: '5 kg', price: 21000, servings: 40 }
    ],
    creamOptions: [
      { name: 'Vanilla Buttercream', price: 0, available: true },
      { name: 'Cream Cheese Frosting', price: 250, available: true },
      { name: 'Orange Buttercream', price: 200, available: true },
      { name: 'Lemon Buttercream', price: 200, available: true },
      { name: 'Almond Buttercream', price: 300, available: true }
    ]
  }
];

export default function CakeDetailPage() {
  const params = useParams();
  const cakeId = parseInt(params.id as string);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedCream, setSelectedCream] = useState<CreamOption | null>(null);
  const [selectedContainerType, setSelectedContainerType] = useState<ContainerType | null>(null);
  const [customNotes, setCustomNotes] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isAuthenticated] = useState(false); // TODO: Get from auth context

  const cake = cakes.find(c => c.id === cakeId);

  useEffect(() => {
    if (cake) {
      setSelectedSize(cake.availableSizes[0]);
      setSelectedCream(cake.creamOptions[0]);
      setSelectedContainerType({ name: 'Circle', value: 'circle' });
    }
  }, [cake]);

  if (!cake) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Cake not found</h1>
          <Link href="/catalog" className="text-[#c7b8ea] hover:underline">
            Back to catalog
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = selectedSize ? selectedSize.price + (selectedCream?.price || 0) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/catalog" className="hover:text-[#c7b8ea] flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Catalog
            </Link>
            <span>/</span>
            <span className="text-gray-900">{cake.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Image and Description */}
          <div className="space-y-4">
            {/* Single Image */}
            <div className="flex justify-center">
              <Image 
                src={cake.imageUrl} 
                alt={cake.name} 
                width={450} 
                height={450} 
                className="rounded-lg object-cover"
              />
            </div>
            
            {/* Description underneath image */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{cake.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">{cake.rating}</span>
                  <span className="text-sm text-gray-600 ml-1">({cake.reviews} reviews)</span>
                </div>
                <span className="text-sm text-gray-600">Category: {cake.category}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{cake.longDescription}</p>
            </div>

            {/* Container Type Selector */}
            <ContainerTypeSelector 
              selectedContainerType={selectedContainerType}
              onContainerTypeChange={setSelectedContainerType}
            />

            {/* Reviews Section */}
            <Reviews 
              cakeId={cake.id}
              cakeName={cake.name}
              isAuthenticated={isAuthenticated}
            />
          </div>
          
          {/* Right: Customization Panel */}
          <div className="space-y-6">
            {/* Size Selector */}
            <SizeSelector 
              sizes={cake.availableSizes} 
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
            />

            {/* Cream Selector */}
            <CreamSelector 
              options={cake.creamOptions}
              selectedCream={selectedCream}
              onCreamChange={setSelectedCream}
            />

            {/* Notes Section */}
            <NotesSection 
              isAuthenticated={isAuthenticated}
              notes={customNotes}
              onNotesChange={setCustomNotes}
            />

            {/* Image Uploader */}
            <ImageUploader 
              isAuthenticated={isAuthenticated}
              uploadedImages={uploadedImages}
              onImagesChange={setUploadedImages}
            />

            {/* Customization Summary */}
            <CustomizationSummary 
              cake={cake}
              selectedSize={selectedSize}
              selectedCream={selectedCream}
              totalPrice={totalPrice}
            />

            {/* Add to Cart Button */}
            <AddToCartButton 
              cake={cake}
              selectedSize={selectedSize}
              selectedCream={selectedCream}
              customNotes={customNotes}
              uploadedImages={uploadedImages}
              totalPrice={totalPrice}
              isAuthenticated={isAuthenticated}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 