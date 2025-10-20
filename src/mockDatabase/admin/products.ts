// Admin products mock database - Sample data for admin product management

import { type AdminProduct } from '@/store/slices/admin/products';

export const adminProductsData: AdminProduct[] = [
  {
    id: 'prod1',
    name: 'Vanilla',
    description: 'Classic vanilla cake with smooth vanilla frosting',
    images: ['/product-images/vanilla cake.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1500, servings: 10 },
      { weight: '1 kg', amount: 2600, servings: 20 },
      { weight: '1.5 kg', amount: 3822, servings: 30 },
      { weight: '2.0 kg', amount: 5096, servings: 40 },
      { weight: '3.0 kg', amount: 7644, servings: 60 },
      { weight: '4.0 kg', amount: 10192, servings: 80 },
      { weight: '5.0 kg', amount: 12740, servings: 100 }
    ],
    whippingCreamOptions: ['Vanilla Cream', 'Chocolate Cream (+200)', 'Strawberry Cream (+200)', 'Buttercream (+300)', 'Whipped Cream (+150)'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Heart Tin'],
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'prod2',
    name: 'Eggless Cake',
    description: 'Delicious eggless vanilla cake perfect for dietary restrictions',
    images: ['/product-images/eggless cake.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1500, servings: 10 },
      { weight: '1 kg', amount: 2800, servings: 20 },
      { weight: '1.5 kg', amount: 4116, servings: 30 },
      { weight: '2.0 kg', amount: 5488, servings: 40 },
      { weight: '3.0 kg', amount: 8232, servings: 60 },
      { weight: '4.0 kg', amount: 10976, servings: 80 },
      { weight: '5.0 kg', amount: 13720, servings: 100 }
    ],
    whippingCreamOptions: ['Vanilla Cream', 'Chocolate Cream (+200)', 'Buttercream (+300)'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Heart Tin'],
    isActive: true,
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z'
  },
  {
    id: 'prod3',
    name: 'Vanilla Orange',
    description: 'Vanilla cake with refreshing orange flavor',
    images: ['/product-images/vanilla orange.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1600, servings: 10 },
      { weight: '1 kg', amount: 2800, servings: 20 },
      { weight: '1.5 kg', amount: 4116, servings: 30 },
      { weight: '2.0 kg', amount: 5488, servings: 40 },
      { weight: '3.0 kg', amount: 8232, servings: 60 },
      { weight: '4.0 kg', amount: 10976, servings: 80 },
      { weight: '5.0 kg', amount: 13720, servings: 100 }
    ],
    whippingCreamOptions: ['Orange Cream', 'Vanilla Cream', 'Buttercream (+300)'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Heart Tin'],
    isActive: true,
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z'
  },
  {
    id: 'prod4',
    name: 'Vanilla Blueberry',
    description: 'Vanilla cake with fresh blueberry flavor',
    images: ['/product-images/vanilla blueberry.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1600, servings: 10 },
      { weight: '1 kg', amount: 2800, servings: 20 },
      { weight: '1.5 kg', amount: 4116, servings: 30 },
      { weight: '2.0 kg', amount: 5488, servings: 40 },
      { weight: '3.0 kg', amount: 8232, servings: 60 },
      { weight: '4.0 kg', amount: 10976, servings: 80 },
      { weight: '5.0 kg', amount: 13720, servings: 100 }
    ],
    whippingCreamOptions: ['Blueberry Cream', 'Vanilla Cream', 'Whipped Cream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Heart Tin'],
    isActive: true,
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z'
  },
  {
    id: 'prod5',
    name: 'White Forest',
    description: 'White chocolate cake with cherries and cream',
    images: ['/product-images/white forest.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1600, servings: 10 },
      { weight: '1 kg', amount: 2800, servings: 20 },
      { weight: '1.5 kg', amount: 4116, servings: 30 },
      { weight: '2.0 kg', amount: 5488, servings: 40 },
      { weight: '3.0 kg', amount: 8232, servings: 60 },
      { weight: '4.0 kg', amount: 10976, servings: 80 },
      { weight: '5.0 kg', amount: 13720, servings: 100 }
    ],
    whippingCreamOptions: ['Whipped Cream', 'Vanilla Cream', 'Cherry Cream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Heart Tin'],
    isActive: true,
    createdAt: '2024-01-19T10:00:00Z',
    updatedAt: '2024-01-19T10:00:00Z'
  },
  {
    id: 'prod6',
    name: 'Marble (Vanilla Chocolate)',
    description: 'Beautiful marble cake with vanilla and chocolate swirls',
    images: ['/product-images/marble vanilla chocolate.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1600, servings: 10 },
      { weight: '1 kg', amount: 2800, servings: 20 },
      { weight: '1.5 kg', amount: 4116, servings: 30 },
      { weight: '2.0 kg', amount: 5488, servings: 40 },
      { weight: '3.0 kg', amount: 8232, servings: 60 },
      { weight: '4.0 kg', amount: 10976, servings: 80 },
      { weight: '5.0 kg', amount: 13720, servings: 100 }
    ],
    whippingCreamOptions: ['Chocolate Cream', 'Vanilla Cream', 'Buttercream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Rectangle Tin'],
    isActive: true,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: 'prod7',
    name: 'Black Forest',
    description: 'Classic chocolate cake with cherries and cream',
    images: ['/product-images/black forest.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1600, servings: 10 },
      { weight: '1 kg', amount: 2800, servings: 20 },
      { weight: '1.5 kg', amount: 4116, servings: 30 },
      { weight: '2.0 kg', amount: 5488, servings: 40 },
      { weight: '3.0 kg', amount: 8232, servings: 60 },
      { weight: '4.0 kg', amount: 10976, servings: 80 },
      { weight: '5.0 kg', amount: 13720, servings: 100 }
    ],
    whippingCreamOptions: ['Whipped Cream', 'Chocolate Cream', 'Cherry Cream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Heart Tin'],
    isActive: true,
    createdAt: '2024-01-21T10:00:00Z',
    updatedAt: '2024-01-21T10:00:00Z'
  },
  {
    id: 'prod8',
    name: 'Strawberry Forest',
    description: 'Chocolate cake with fresh strawberries and cream',
    images: ['/product-images/strawberry forest.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1600, servings: 10 },
      { weight: '1 kg', amount: 2800, servings: 20 },
      { weight: '1.5 kg', amount: 4116, servings: 30 },
      { weight: '2.0 kg', amount: 5488, servings: 40 },
      { weight: '3.0 kg', amount: 8232, servings: 60 },
      { weight: '4.0 kg', amount: 10976, servings: 80 },
      { weight: '5.0 kg', amount: 13720, servings: 100 }
    ],
    whippingCreamOptions: ['Strawberry Cream', 'Whipped Cream', 'Chocolate Cream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Heart Tin'],
    isActive: true,
    createdAt: '2024-01-22T10:00:00Z',
    updatedAt: '2024-01-22T10:00:00Z'
  },
  {
    id: 'prod9',
    name: 'Chocolate Orange',
    description: 'Rich chocolate cake with orange zest',
    images: ['/product-images/chocolate orange.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1600, servings: 10 },
      { weight: '1 kg', amount: 2800, servings: 20 },
      { weight: '1.5 kg', amount: 4116, servings: 30 },
      { weight: '2.0 kg', amount: 5488, servings: 40 },
      { weight: '3.0 kg', amount: 8232, servings: 60 },
      { weight: '4.0 kg', amount: 10976, servings: 80 },
      { weight: '5.0 kg', amount: 13720, servings: 100 }
    ],
    whippingCreamOptions: ['Orange Cream', 'Chocolate Cream', 'Buttercream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Rectangle Tin'],
    isActive: true,
    createdAt: '2024-01-23T10:00:00Z',
    updatedAt: '2024-01-23T10:00:00Z'
  },
  {
    id: 'prod10',
    name: 'Lemon Cake',
    description: 'Tangy lemon cake with lemon frosting',
    images: ['/product-images/lemon cake.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1700, servings: 10 },
      { weight: '1 kg', amount: 3000, servings: 20 },
      { weight: '1.5 kg', amount: 4410, servings: 30 },
      { weight: '2.0 kg', amount: 5880, servings: 40 },
      { weight: '3.0 kg', amount: 8820, servings: 60 },
      { weight: '4.0 kg', amount: 11760, servings: 80 },
      { weight: '5.0 kg', amount: 14700, servings: 100 }
    ],
    whippingCreamOptions: ['Lemon Cream', 'Vanilla Cream', 'Buttercream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Heart Tin'],
    isActive: true,
    createdAt: '2024-01-24T10:00:00Z',
    updatedAt: '2024-01-24T10:00:00Z'
  },
  {
    id: 'prod11',
    name: 'Red Velvet',
    description: 'Classic red velvet with cream cheese frosting',
    images: ['/product-images/red velvet.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1700, servings: 10 },
      { weight: '1 kg', amount: 3000, servings: 20 },
      { weight: '1.5 kg', amount: 4410, servings: 30 },
      { weight: '2.0 kg', amount: 5880, servings: 40 },
      { weight: '3.0 kg', amount: 8820, servings: 60 },
      { weight: '4.0 kg', amount: 11760, servings: 80 },
      { weight: '5.0 kg', amount: 14700, servings: 100 }
    ],
    whippingCreamOptions: ['Cream Cheese', 'Vanilla Cream', 'Buttercream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Heart Tin'],
    isActive: true,
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-01-25T10:00:00Z'
  },
  {
    id: 'prod12',
    name: 'Light Fruit Cake',
    description: 'Light fruit cake with mixed dried fruits',
    images: ['/product-images/light fruit cake.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1700, servings: 10 },
      { weight: '1 kg', amount: 3000, servings: 20 },
      { weight: '1.5 kg', amount: 4410, servings: 30 },
      { weight: '2.0 kg', amount: 5880, servings: 40 },
      { weight: '3.0 kg', amount: 8820, servings: 60 },
      { weight: '4.0 kg', amount: 11760, servings: 80 },
      { weight: '5.0 kg', amount: 14700, servings: 100 }
    ],
    whippingCreamOptions: ['Vanilla Cream', 'Buttercream', 'Whipped Cream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Rectangle Tin'],
    isActive: true,
    createdAt: '2024-01-26T10:00:00Z',
    updatedAt: '2024-01-26T10:00:00Z'
  },
  {
    id: 'prod13',
    name: 'Chocolate Fudge',
    description: 'Rich chocolate fudge cake with chocolate ganache',
    images: ['/product-images/chcocolate fudge.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1700, servings: 10 },
      { weight: '1 kg', amount: 3000, servings: 20 },
      { weight: '1.5 kg', amount: 4410, servings: 30 },
      { weight: '2.0 kg', amount: 5880, servings: 40 },
      { weight: '3.0 kg', amount: 8820, servings: 60 },
      { weight: '4.0 kg', amount: 11760, servings: 80 },
      { weight: '5.0 kg', amount: 14700, servings: 100 }
    ],
    whippingCreamOptions: ['Chocolate Cream', 'Fudge Cream', 'Buttercream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Rectangle Tin'],
    isActive: true,
    createdAt: '2024-01-27T10:00:00Z',
    updatedAt: '2024-01-27T10:00:00Z'
  },
  {
    id: 'prod14',
    name: 'Chocolate Mint',
    description: 'Chocolate cake with refreshing mint flavor',
    images: ['/product-images/chocolate mint.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1700, servings: 10 },
      { weight: '1 kg', amount: 3000, servings: 20 },
      { weight: '1.5 kg', amount: 4410, servings: 30 },
      { weight: '2.0 kg', amount: 5880, servings: 40 },
      { weight: '3.0 kg', amount: 8820, servings: 60 },
      { weight: '4.0 kg', amount: 11760, servings: 80 },
      { weight: '5.0 kg', amount: 14700, servings: 100 }
    ],
    whippingCreamOptions: ['Mint Cream', 'Chocolate Cream', 'Buttercream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Rectangle Tin'],
    isActive: true,
    createdAt: '2024-01-28T10:00:00Z',
    updatedAt: '2024-01-28T10:00:00Z'
  },
  {
    id: 'prod15',
    name: 'Carrot Cake',
    description: 'Moist carrot cake with cream cheese frosting',
    images: ['/product-images/carrot cake.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1700, servings: 10 },
      { weight: '1 kg', amount: 3000, servings: 20 },
      { weight: '1.5 kg', amount: 4410, servings: 30 },
      { weight: '2.0 kg', amount: 5880, servings: 40 },
      { weight: '3.0 kg', amount: 8820, servings: 60 },
      { weight: '4.0 kg', amount: 11760, servings: 80 },
      { weight: '5.0 kg', amount: 14700, servings: 100 }
    ],
    whippingCreamOptions: ['Cream Cheese', 'Vanilla Cream', 'Buttercream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Rectangle Tin'],
    isActive: true,
    createdAt: '2024-01-29T10:00:00Z',
    updatedAt: '2024-01-29T10:00:00Z'
  },
  {
    id: 'prod16',
    name: 'Zucchini Cake',
    description: 'Healthy zucchini cake with vanilla frosting',
    images: ['/product-images/zucchini cake.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1700, servings: 10 },
      { weight: '1 kg', amount: 3000, servings: 20 },
      { weight: '1.5 kg', amount: 4410, servings: 30 },
      { weight: '2.0 kg', amount: 5880, servings: 40 },
      { weight: '3.0 kg', amount: 8820, servings: 60 },
      { weight: '4.0 kg', amount: 11760, servings: 80 },
      { weight: '5.0 kg', amount: 14700, servings: 100 }
    ],
    whippingCreamOptions: ['Vanilla Cream', 'Buttercream', 'Whipped Cream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Rectangle Tin'],
    isActive: true,
    createdAt: '2024-01-30T10:00:00Z',
    updatedAt: '2024-01-30T10:00:00Z'
  },
  {
    id: 'prod17',
    name: 'Pinacolada Cake',
    description: 'Tropical pineapple and coconut cake',
    images: ['/product-images/pinacolada cake.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1700, servings: 10 },
      { weight: '1 kg', amount: 3000, servings: 20 },
      { weight: '1.5 kg', amount: 4410, servings: 30 },
      { weight: '2.0 kg', amount: 5880, servings: 40 },
      { weight: '3.0 kg', amount: 8820, servings: 60 },
      { weight: '4.0 kg', amount: 11760, servings: 80 },
      { weight: '5.0 kg', amount: 14700, servings: 100 }
    ],
    whippingCreamOptions: ['Coconut Cream', 'Pineapple Cream', 'Vanilla Cream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Heart Tin'],
    isActive: true,
    createdAt: '2024-01-31T10:00:00Z',
    updatedAt: '2024-01-31T10:00:00Z'
  },
  {
    id: 'prod18',
    name: 'Passion Cake',
    description: 'Exotic passion fruit cake',
    images: ['/product-images/passion cake.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1700, servings: 10 },
      { weight: '1 kg', amount: 3000, servings: 20 },
      { weight: '1.5 kg', amount: 4410, servings: 30 },
      { weight: '2.0 kg', amount: 5880, servings: 40 },
      { weight: '3.0 kg', amount: 8820, servings: 60 },
      { weight: '4.0 kg', amount: 11760, servings: 80 },
      { weight: '5.0 kg', amount: 14700, servings: 100 }
    ],
    whippingCreamOptions: ['Passion Fruit Cream', 'Vanilla Cream', 'Buttercream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Heart Tin'],
    isActive: true,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z'
  },
  {
    id: 'prod19',
    name: 'Banana Cake',
    description: 'Moist banana cake with banana frosting',
    images: ['/product-images/banana cake.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1700, servings: 10 },
      { weight: '1 kg', amount: 3000, servings: 20 },
      { weight: '1.5 kg', amount: 4410, servings: 30 },
      { weight: '2.0 kg', amount: 5880, servings: 40 },
      { weight: '3.0 kg', amount: 8820, servings: 60 },
      { weight: '4.0 kg', amount: 11760, servings: 80 },
      { weight: '5.0 kg', amount: 14700, servings: 100 }
    ],
    whippingCreamOptions: ['Banana Cream', 'Vanilla Cream', 'Buttercream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Rectangle Tin'],
    isActive: true,
    createdAt: '2024-02-02T10:00:00Z',
    updatedAt: '2024-02-02T10:00:00Z'
  },
  {
    id: 'prod20',
    name: 'Mocha Cake',
    description: 'Coffee and chocolate mocha cake',
    images: ['/product-images/mocha cake.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1700, servings: 10 },
      { weight: '1 kg', amount: 3000, servings: 20 },
      { weight: '1.5 kg', amount: 4410, servings: 30 },
      { weight: '2.0 kg', amount: 5880, servings: 40 },
      { weight: '3.0 kg', amount: 8820, servings: 60 },
      { weight: '4.0 kg', amount: 11760, servings: 80 },
      { weight: '5.0 kg', amount: 14700, servings: 100 }
    ],
    whippingCreamOptions: ['Mocha Cream', 'Chocolate Cream', 'Coffee Cream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Rectangle Tin'],
    isActive: true,
    createdAt: '2024-02-03T10:00:00Z',
    updatedAt: '2024-02-03T10:00:00Z'
  },
  {
    id: 'prod21',
    name: 'Rainbow Cake',
    description: 'Colorful rainbow layers with vanilla frosting',
    images: ['/product-images/rainbow cake.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1800, servings: 10 },
      { weight: '1 kg', amount: 3200, servings: 20 },
      { weight: '1.5 kg', amount: 4704, servings: 30 },
      { weight: '2.0 kg', amount: 6272, servings: 40 },
      { weight: '3.0 kg', amount: 9408, servings: 60 },
      { weight: '4.0 kg', amount: 12544, servings: 80 },
      { weight: '5.0 kg', amount: 15680, servings: 100 }
    ],
    whippingCreamOptions: ['Vanilla Cream', 'Buttercream', 'Whipped Cream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Rectangle Tin'],
    isActive: true,
    createdAt: '2024-02-04T10:00:00Z',
    updatedAt: '2024-02-04T10:00:00Z'
  },
  {
    id: 'prod22',
    name: 'Strawberry Cake',
    description: 'Fresh strawberry cake with strawberry frosting',
    images: ['/product-images/strawberry cake.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1800, servings: 10 },
      { weight: '1 kg', amount: 3200, servings: 20 },
      { weight: '1.5 kg', amount: 4704, servings: 30 },
      { weight: '2.0 kg', amount: 6272, servings: 40 },
      { weight: '3.0 kg', amount: 9408, servings: 60 },
      { weight: '4.0 kg', amount: 12544, servings: 80 },
      { weight: '5.0 kg', amount: 15680, servings: 100 }
    ],
    whippingCreamOptions: ['Strawberry Cream', 'Vanilla Cream', 'Whipped Cream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Heart Tin'],
    isActive: true,
    createdAt: '2024-02-05T10:00:00Z',
    updatedAt: '2024-02-05T10:00:00Z'
  },
  {
    id: 'prod23',
    name: 'Coconut Cake',
    description: 'Tropical coconut cake with coconut frosting',
    images: ['/product-images/coconut cake.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1800, servings: 10 },
      { weight: '1 kg', amount: 3200, servings: 20 },
      { weight: '1.5 kg', amount: 4704, servings: 30 },
      { weight: '2.0 kg', amount: 6272, servings: 40 },
      { weight: '3.0 kg', amount: 9408, servings: 60 },
      { weight: '4.0 kg', amount: 12544, servings: 80 },
      { weight: '5.0 kg', amount: 15680, servings: 100 }
    ],
    whippingCreamOptions: ['Coconut Cream', 'Vanilla Cream', 'Buttercream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Heart Tin'],
    isActive: true,
    createdAt: '2024-02-06T10:00:00Z',
    updatedAt: '2024-02-06T10:00:00Z'
  },
  {
    id: 'prod24',
    name: 'Butterscotch Cake',
    description: 'Rich butterscotch cake with butterscotch frosting',
    images: ['/product-images/butterscotch cake.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1800, servings: 10 },
      { weight: '1 kg', amount: 3200, servings: 20 },
      { weight: '1.5 kg', amount: 4704, servings: 30 },
      { weight: '2.0 kg', amount: 6272, servings: 40 },
      { weight: '3.0 kg', amount: 9408, servings: 60 },
      { weight: '4.0 kg', amount: 12544, servings: 80 },
      { weight: '5.0 kg', amount: 15680, servings: 100 }
    ],
    whippingCreamOptions: ['Butterscotch Cream', 'Vanilla Cream', 'Buttercream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Rectangle Tin'],
    isActive: true,
    createdAt: '2024-02-07T10:00:00Z',
    updatedAt: '2024-02-07T10:00:00Z'
  },
  {
    id: 'prod25',
    name: 'Caramel Cake',
    description: 'Sweet caramel cake with caramel drizzle',
    images: ['/product-images/caramel cake.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1800, servings: 10 },
      { weight: '1 kg', amount: 3200, servings: 20 },
      { weight: '1.5 kg', amount: 4704, servings: 30 },
      { weight: '2.0 kg', amount: 6272, servings: 40 },
      { weight: '3.0 kg', amount: 9408, servings: 60 },
      { weight: '4.0 kg', amount: 12544, servings: 80 },
      { weight: '5.0 kg', amount: 15680, servings: 100 }
    ],
    whippingCreamOptions: ['Caramel Cream', 'Vanilla Cream', 'Buttercream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Rectangle Tin'],
    isActive: true,
    createdAt: '2024-02-08T10:00:00Z',
    updatedAt: '2024-02-08T10:00:00Z'
  },
  {
    id: 'prod26',
    name: 'Orange Coconut Cake',
    description: 'Orange and coconut tropical cake',
    images: ['/product-images/orange coconut cake.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1800, servings: 10 },
      { weight: '1 kg', amount: 3200, servings: 20 },
      { weight: '1.5 kg', amount: 4704, servings: 30 },
      { weight: '2.0 kg', amount: 6272, servings: 40 },
      { weight: '3.0 kg', amount: 9408, servings: 60 },
      { weight: '4.0 kg', amount: 12544, servings: 80 },
      { weight: '5.0 kg', amount: 15680, servings: 100 }
    ],
    whippingCreamOptions: ['Orange Cream', 'Coconut Cream', 'Vanilla Cream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Heart Tin'],
    isActive: true,
    createdAt: '2024-02-09T10:00:00Z',
    updatedAt: '2024-02-09T10:00:00Z'
  },
  {
    id: 'prod27',
    name: 'Lemon Coconut Cake',
    description: 'Lemon and coconut tropical cake',
    images: ['/product-images/lemon coconut cake.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1800, servings: 10 },
      { weight: '1 kg', amount: 3200, servings: 20 },
      { weight: '1.5 kg', amount: 4704, servings: 30 },
      { weight: '2.0 kg', amount: 6272, servings: 40 },
      { weight: '3.0 kg', amount: 9408, servings: 60 },
      { weight: '4.0 kg', amount: 12544, servings: 80 },
      { weight: '5.0 kg', amount: 15680, servings: 100 }
    ],
    whippingCreamOptions: ['Lemon Cream', 'Coconut Cream', 'Vanilla Cream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Heart Tin'],
    isActive: true,
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z'
  },
  {
    id: 'prod28',
    name: 'Orange Poppy',
    description: 'Orange cake with poppy seeds',
    images: ['/product-images/orange poppy cake.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1800, servings: 10 },
      { weight: '1 kg', amount: 3200, servings: 20 },
      { weight: '1.5 kg', amount: 4704, servings: 30 },
      { weight: '2.0 kg', amount: 6272, servings: 40 },
      { weight: '3.0 kg', amount: 9408, servings: 60 },
      { weight: '4.0 kg', amount: 12544, servings: 80 },
      { weight: '5.0 kg', amount: 15680, servings: 100 }
    ],
    whippingCreamOptions: ['Orange Cream', 'Vanilla Cream', 'Buttercream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Rectangle Tin'],
    isActive: true,
    createdAt: '2024-02-11T10:00:00Z',
    updatedAt: '2024-02-11T10:00:00Z'
  },
  {
    id: 'prod29',
    name: 'Lemon Poppy',
    description: 'Lemon cake with poppy seeds',
    images: ['/product-images/lemon poppy cake.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 1800, servings: 10 },
      { weight: '1 kg', amount: 3200, servings: 20 },
      { weight: '1.5 kg', amount: 4704, servings: 30 },
      { weight: '2.0 kg', amount: 6272, servings: 40 },
      { weight: '3.0 kg', amount: 9408, servings: 60 },
      { weight: '4.0 kg', amount: 12544, servings: 80 },
      { weight: '5.0 kg', amount: 15680, servings: 100 }
    ],
    whippingCreamOptions: ['Lemon Cream', 'Vanilla Cream', 'Buttercream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Rectangle Tin'],
    isActive: true,
    createdAt: '2024-02-12T10:00:00Z',
    updatedAt: '2024-02-12T10:00:00Z'
  },
  {
    id: 'prod30',
    name: 'Sprinkles Confetti Cake',
    description: 'Fun confetti cake with colorful sprinkles',
    images: ['/product-images/sprinkle confetti cake.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 2000, servings: 10 },
      { weight: '1 kg', amount: 3500, servings: 20 },
      { weight: '1.5 kg', amount: 5145, servings: 30 },
      { weight: '2.0 kg', amount: 6860, servings: 40 },
      { weight: '3.0 kg', amount: 10290, servings: 60 },
      { weight: '4.0 kg', amount: 13720, servings: 80 },
      { weight: '5.0 kg', amount: 17150, servings: 100 }
    ],
    whippingCreamOptions: ['Vanilla Cream', 'Buttercream', 'Whipped Cream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Rectangle Tin'],
    isActive: true,
    createdAt: '2024-02-13T10:00:00Z',
    updatedAt: '2024-02-13T10:00:00Z'
  },
  {
    id: 'prod31',
    name: 'Mild Fruit Cake',
    description: 'Mild fruit cake with mixed fruits',
    images: ['/product-images/mild fruit cake.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 2000, servings: 10 },
      { weight: '1 kg', amount: 3500, servings: 20 },
      { weight: '1.5 kg', amount: 5145, servings: 30 },
      { weight: '2.0 kg', amount: 6860, servings: 40 },
      { weight: '3.0 kg', amount: 10290, servings: 60 },
      { weight: '4.0 kg', amount: 13720, servings: 80 },
      { weight: '5.0 kg', amount: 17150, servings: 100 }
    ],
    whippingCreamOptions: ['Vanilla Cream', 'Buttercream', 'Whipped Cream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Rectangle Tin'],
    isActive: true,
    createdAt: '2024-02-14T10:00:00Z',
    updatedAt: '2024-02-14T10:00:00Z'
  },
  {
    id: 'prod32',
    name: 'Chocolate Chip Cake',
    description: 'Vanilla cake with chocolate chips',
    images: ['/product-images/chocolate chip cake.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 2000, servings: 10 },
      { weight: '1 kg', amount: 3500, servings: 20 },
      { weight: '1.5 kg', amount: 5145, servings: 30 },
      { weight: '2.0 kg', amount: 6860, servings: 40 },
      { weight: '3.0 kg', amount: 10290, servings: 60 },
      { weight: '4.0 kg', amount: 13720, servings: 80 },
      { weight: '5.0 kg', amount: 17150, servings: 100 }
    ],
    whippingCreamOptions: ['Chocolate Cream', 'Vanilla Cream', 'Buttercream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Rectangle Tin'],
    isActive: true,
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z'
  },
  {
    id: 'prod33',
    name: 'Vegan Cake',
    description: 'Plant-based vegan cake',
    images: ['/product-images/vegan cake.webp'],
    prices: [
      { weight: '0.5 kg', amount: 2000, servings: 10 },
      { weight: '1 kg', amount: 3500, servings: 20 },
      { weight: '1.5 kg', amount: 5145, servings: 30 },
      { weight: '2.0 kg', amount: 6860, servings: 40 },
      { weight: '3.0 kg', amount: 10290, servings: 60 },
      { weight: '4.0 kg', amount: 13720, servings: 80 },
      { weight: '5.0 kg', amount: 17150, servings: 100 }
    ],
    whippingCreamOptions: ['Vegan Cream', 'Vanilla Cream', 'Coconut Cream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Rectangle Tin'],
    isActive: true,
    createdAt: '2024-02-16T10:00:00Z',
    updatedAt: '2024-02-16T10:00:00Z'
  },
  {
    id: 'prod34',
    name: 'Lemon Blueberry',
    description: 'Lemon cake with fresh blueberries',
    images: ['/product-images/lemon blueberry cake.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 2000, servings: 10 },
      { weight: '1 kg', amount: 3500, servings: 20 },
      { weight: '1.5 kg', amount: 5145, servings: 30 },
      { weight: '2.0 kg', amount: 6860, servings: 40 },
      { weight: '3.0 kg', amount: 10290, servings: 60 },
      { weight: '4.0 kg', amount: 13720, servings: 80 },
      { weight: '5.0 kg', amount: 17150, servings: 100 }
    ],
    whippingCreamOptions: ['Lemon Cream', 'Blueberry Cream', 'Vanilla Cream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Heart Tin'],
    isActive: true,
    createdAt: '2024-02-17T10:00:00Z',
    updatedAt: '2024-02-17T10:00:00Z'
  },
  {
    id: 'prod35',
    name: 'Rich Fruit Cake',
    description: 'Premium rich fruit cake with luxury ingredients',
    images: ['/product-images/rich fruit cake.jpg'],
    prices: [
      { weight: '0.5 kg', amount: 2300, servings: 10 },
      { weight: '1 kg', amount: 4500, servings: 20 },
      { weight: '1.5 kg', amount: 6615, servings: 30 },
      { weight: '2.0 kg', amount: 8820, servings: 40 },
      { weight: '3.0 kg', amount: 13230, servings: 60 },
      { weight: '4.0 kg', amount: 17640, servings: 80 },
      { weight: '5.0 kg', amount: 22050, servings: 100 }
    ],
    whippingCreamOptions: ['Vanilla Cream', 'Buttercream', 'Whipped Cream'],
    bakingTinOptions: ['Round Tin', 'Square Tin', 'Rectangle Tin'],
    isActive: true,
    createdAt: '2024-02-18T10:00:00Z',
    updatedAt: '2024-02-18T10:00:00Z'
  }
];

// Helper functions for admin products
export const getAdminProductById = (id: string): AdminProduct | undefined => {
  return adminProductsData.find(product => product.id === id);
};

export const getActiveAdminProducts = (): AdminProduct[] => {
  return adminProductsData.filter(product => product.isActive);
};

export const getInactiveAdminProducts = (): AdminProduct[] => {
  return adminProductsData.filter(product => !product.isActive);
};

export const searchAdminProducts = (searchTerm: string): AdminProduct[] => {
  if (!searchTerm.trim()) return adminProductsData;
  
  const term = searchTerm.toLowerCase();
  return adminProductsData.filter(product =>
    product.name.toLowerCase().includes(term) ||
    product.description.toLowerCase().includes(term)
  );
};

export const getAdminProductsByCreamOption = (creamOption: string): AdminProduct[] => {
  return adminProductsData.filter(product => 
    product.whippingCreamOptions.includes(creamOption)
  );
};

export const getAdminProductsByTinOption = (tinOption: string): AdminProduct[] => {
  return adminProductsData.filter(product => 
    product.bakingTinOptions.includes(tinOption)
  );
};

export const getAdminProductsStats = () => {
  const products = adminProductsData;
  const activeCount = products.filter(p => p.isActive).length;
  const inactiveCount = products.filter(p => !p.isActive).length;
  const totalProducts = products.length;
  
  // Get unique cream options
  const allCreamOptions = products.flatMap(p => p.whippingCreamOptions);
  const uniqueCreamOptions = Array.from(new Set(allCreamOptions));
  
  // Get unique tin options
  const allTinOptions = products.flatMap(p => p.bakingTinOptions);
  const uniqueTinOptions = Array.from(new Set(allTinOptions));
  
  return {
    totalProducts,
    activeCount,
    inactiveCount,
    uniqueCreamOptions,
    uniqueTinOptions,
    creamOptionsCount: uniqueCreamOptions.length,
    tinOptionsCount: uniqueTinOptions.length
  };
};
