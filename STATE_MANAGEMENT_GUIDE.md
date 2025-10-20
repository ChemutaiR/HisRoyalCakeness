# State Management Implementation Guide

## 🎯 **Recommended Architecture: Zustand + TanStack Query**

This guide outlines the implementation of a robust state management system for the His Royal Cakeness application.

## 📦 **Required Dependencies**

Add these to your `package.json`:

```bash
npm install zustand @tanstack/react-query @tanstack/react-query-devtools
```

## 🏗️ **Architecture Overview**

### **1. Client State (Zustand)**
- **Authentication**: User data, tokens, login state
- **Shopping Cart**: Items, quantities, customizations
- **UI State**: Modals, notifications, theme, loading states

### **2. Server State (TanStack Query)**
- **Products**: Cakes, categories, search results
- **Orders**: User orders, admin orders, order history
- **Reviews**: Product reviews, ratings
- **Analytics**: Dashboard data, reports

### **3. Local State (React useState)**
- **Form State**: Input values, validation
- **Component State**: Toggles, temporary UI state

## 🔧 **Implementation Steps**

### **Step 1: Install Dependencies**

```bash
npm install zustand @tanstack/react-query @tanstack/react-query-devtools
```

### **Step 2: Setup Providers**

Update your `app/layout.tsx`:

```tsx
import { QueryProvider, StoreProvider } from '@/providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <StoreProvider>
            {children}
          </StoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
```

### **Step 3: Update Components**

#### **Authentication Example**

```tsx
// Before (local state)
const [isAuthenticated] = useState(false);

// After (Zustand store)
import { useAuth } from '@/lib/store';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.firstName}!</p>
      ) : (
        <button onClick={() => login({ email, password })}>
          Login
        </button>
      )}
    </div>
  );
}
```

#### **Cart Example**

```tsx
// Before (TODO comments)
// TODO: Add to cart context/state management

// After (Zustand store)
import { useCartActions } from '@/lib/store';

function AddToCartButton({ cake, customization }) {
  const { addItem } = useCartActions();
  
  const handleAddToCart = () => {
    addItem(cake, customization, 1);
  };
  
  return <button onClick={handleAddToCart}>Add to Cart</button>;
}
```

#### **Products Example**

```tsx
// Before (hardcoded data)
const cakes: Cake[] = [/* hardcoded data */];

// After (TanStack Query)
import { useProducts } from '@/lib/query';

function CatalogPage() {
  const { data: products, isLoading, error } = useProducts({
    category: 'Chocolate Cakes',
    priceRange: [1000, 5000]
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;
  
  return (
    <div>
      {products?.data.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

## 📁 **File Structure**

```
frontend/src/
├── lib/
│   ├── store/
│   │   ├── auth.ts          # Authentication state
│   │   ├── cart.ts          # Shopping cart state
│   │   ├── ui.ts            # UI state (modals, notifications)
│   │   └── index.ts         # Store exports
│   └── query/
│       ├── products.ts      # Product queries
│       ├── orders.ts        # Order queries
│       └── index.ts         # Query exports
├── providers/
│   ├── QueryProvider.tsx    # TanStack Query setup
│   ├── StoreProvider.tsx    # Store initialization
│   └── index.ts             # Provider exports
└── types/
    ├── auth.ts              # Auth types
    ├── forms.ts             # Form types
    ├── ui.ts                # UI types
    └── index.ts             # Type exports
```

## 🎨 **Usage Patterns**

### **1. Authentication**

```tsx
import { useAuth, useAuthActions } from '@/lib/store';

function LoginForm() {
  const { isLoading, error } = useAuth();
  const { login, clearError } = useAuthActions();
  
  const handleSubmit = async (formData) => {
    await login(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      {error && <div className="error">{error.message}</div>}
      <button disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

### **2. Shopping Cart**

```tsx
import { useCart, useCartActions } from '@/lib/store';

function CartIcon() {
  const { totalItems } = useCart();
  const { toggleCart } = useCartActions();
  
  return (
    <button onClick={toggleCart}>
      Cart ({totalItems})
    </button>
  );
}

function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCartActions();
  
  return (
    <div>
      <span>{item.cake.name}</span>
      <input 
        type="number" 
        value={item.quantity}
        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
      />
      <button onClick={() => removeItem(item.id)}>Remove</button>
    </div>
  );
}
```

### **3. Product Management**

```tsx
import { useProducts, useCreateProduct } from '@/lib/query';

function ProductsPage() {
  const { data: products, isLoading } = useProducts();
  const createProduct = useCreateProduct();
  
  const handleCreateProduct = async (productData) => {
    await createProduct.mutateAsync(productData);
  };
  
  return (
    <div>
      {isLoading ? (
        <div>Loading products...</div>
      ) : (
        <div>
          {products?.data.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
```

### **4. UI State Management**

```tsx
import { useUIActions, useNotifications } from '@/lib/store';

function MyComponent() {
  const { addNotification, openModal } = useUIActions();
  const notifications = useNotifications();
  
  const handleSuccess = () => {
    addNotification({
      type: 'success',
      title: 'Success!',
      message: 'Product added to cart',
      duration: 3000
    });
  };
  
  return (
    <div>
      <button onClick={handleSuccess}>Add to Cart</button>
      <button onClick={() => openModal('productModal')}>
        Open Modal
      </button>
      
      {notifications.map(notification => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
```

## 🔄 **Migration Strategy**

### **Phase 1: Setup Infrastructure**
1. Install dependencies
2. Create store files
3. Setup providers
4. Update root layout

### **Phase 2: Migrate Authentication**
1. Replace hardcoded `isAuthenticated` with auth store
2. Update login/signup forms
3. Add auth guards to protected routes

### **Phase 3: Migrate Cart**
1. Replace TODO cart comments with cart store
2. Update AddToCartButton component
3. Implement cart page functionality

### **Phase 4: Migrate Products**
1. Replace hardcoded product data with TanStack Query
2. Update catalog page
3. Update product detail pages

### **Phase 5: Migrate Orders**
1. Replace admin order state with TanStack Query
2. Update order management components
3. Add real-time order updates

## 🚀 **Benefits**

### **Performance**
- ✅ Automatic caching and background updates
- ✅ Optimistic updates for better UX
- ✅ Selective re-renders with Zustand selectors

### **Developer Experience**
- ✅ TypeScript support throughout
- ✅ DevTools for debugging
- ✅ Predictable state updates

### **User Experience**
- ✅ Persistent cart and auth state
- ✅ Offline support with cached data
- ✅ Real-time updates for orders

### **Maintainability**
- ✅ Centralized state logic
- ✅ Separation of concerns
- ✅ Easy testing and debugging

## 🔧 **Advanced Features**

### **1. Optimistic Updates**

```tsx
const updateOrder = useUpdateOrder();

const handleUpdateOrder = async (orderId, status) => {
  // Optimistically update UI
  updateOrder.mutate(
    { id: orderId, data: { status } },
    {
      onError: (error) => {
        // Revert on error
        addNotification({
          type: 'error',
          message: 'Failed to update order'
        });
      }
    }
  );
};
```

### **2. Background Sync**

```tsx
const { data: orders } = useAdminOrders({
  refetchInterval: 30000, // Refetch every 30 seconds
  refetchIntervalInBackground: true
});
```

### **3. Infinite Queries**

```tsx
const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: ['orders'],
  queryFn: ({ pageParam = 0 }) => fetchOrders({ page: pageParam }),
  getNextPageParam: (lastPage) => lastPage.nextPage,
});
```

This architecture provides a solid foundation for scalable state management while maintaining excellent developer and user experience.
