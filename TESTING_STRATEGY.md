# Testing Strategy - Domain-Specific Test Organization

**Project:** His Royal Cakeness Frontend  
**Framework:** Next.js 15.5.3 with React 18.2.0  
**Testing Framework:** Jest + React Testing Library  
**Last Updated:** 2025-01-27

---

## 📋 Table of Contents

1. [Test Structure Overview](#test-structure-overview)
2. [Domain-Based Test Organization](#domain-based-test-organization)
3. [Unit Test Specifications](#unit-test-specifications)
4. [Integration Test Specifications](#integration-test-specifications)
5. [Test Coverage Goals](#test-coverage-goals)
6. [Test Execution Strategy](#test-execution-strategy)

---

## Test Structure Overview

```
__tests__/
├── unit/                          # Pure unit tests
│   ├── cart/                      # Shopping Cart Domain
│   ├── checkout/                  # Checkout Domain
│   ├── products/                  # Products Domain
│   ├── orders/                    # Orders Domain
│   ├── promotions/                # Promotions Domain
│   ├── customers/                 # Customers Domain
│   ├── reviews/                   # Reviews Domain
│   ├── analytics/                 # Analytics Domain
│   ├── auth/                      # Authentication Domain
│   ├── admin/                     # Admin Domain
│   ├── decorations/               # Decorations Domain
│   ├── recipes/                   # Recipes Domain
│   ├── delivery/                  # Delivery Domain
│   └── shared/                    # Shared Utilities
│
├── integration/                   # Integration tests
│   ├── shop/                      # Shop flows
│   ├── checkout/                  # Checkout flows
│   ├── admin/                     # Admin workflows
│   └── auth/                      # Authentication flows
│
├── e2e/                           # End-to-end tests (Future)
└── fixtures/                      # Test data and mocks
```

---

## Domain-Based Test Organization

### 🛒 **Domain 1: Shopping Cart**

**Location:** `__tests__/unit/cart/` | `__tests__/integration/shop/`

#### **Unit Tests**

**1. Cart Calculations (`cart/calculations.test.ts`)**
```typescript
✅ calculateItemTotal()
   - Should calculate total for single item
   - Should handle quantity > 1
   - Should return 0 for empty item

✅ calculateCustomLoafTotal()
   - Should include base price
   - Should include cream price
   - Should include topping price
   - Should handle missing optional prices

✅ calculateCartSubtotal()
   - Should sum regular items
   - Should sum custom loaf items
   - Should return 0 for empty cart
   - Should handle mixed cart

✅ calculateDeliveryFee()
   - Should return 0 if subtotal >= threshold
   - Should return zone fee if subtotal < threshold
   - Should handle custom thresholds

✅ calculateCartTotal()
   - Should calculate with tax
   - Should apply discounts
   - Should include delivery fee
   - Should handle edge cases (negative values)

✅ calculatePromotionalDiscount()
   - Should apply percentage discount
   - Should apply fixed amount discount
   - Should validate minimum order
   - Should handle invalid codes

✅ getCartSummary()
   - Should return complete summary
   - Should calculate all fields correctly
   - Should handle empty cart

✅ qualifiesForFreeDelivery()
   - Should return true when threshold met
   - Should return false when below threshold

✅ calculateEstimatedDeliveryTime()
   - Should add base time
   - Should add time for custom loaves
   - Should return future date
```

**2. Cart Comparison (`cart/comparison.test.ts`)**
```typescript
✅ areCustomizationsEqual()
   - Should match identical customizations
   - Should differentiate by size
   - Should differentiate by cream
   - Should differentiate by decorations
   - Should differentiate by container type
   - Should handle missing fields
   - Should compare uploaded images
```

**3. Cart Storage (`cart/storage.test.ts`)**
```typescript
✅ saveCartToStorage()
   - Should persist cart to localStorage
   - Should handle storage errors
   - Should format data correctly

✅ loadCartFromStorage()
   - Should load valid cart data
   - Should return empty cart on error
   - Should handle corrupted data
   - Should handle missing data

✅ clearCartStorage()
   - Should remove cart from storage
   - Should not throw on missing data
```

**4. Cart Validation (`cart/validation.test.ts`)**
```typescript
✅ validateCartItem()
   - Should validate required fields
   - Should check quantity limits
   - Should validate price ranges

✅ validateCartForCheckout()
   - Should require at least one item
   - Should validate all items
   - Should check delivery requirements
```

#### **Integration Tests**

**Cart Management Flow (`integration/shop/cart-flow.test.tsx`)**
```typescript
✅ Adding items to cart
   - Should add regular cake to cart
   - Should add custom loaf to cart
   - Should merge duplicate items
   - Should update quantities

✅ Updating cart items
   - Should update item quantity
   - Should remove items
   - Should handle invalid updates

✅ Cart persistence
   - Should persist across page reloads
   - Should sync across tabs
   - Should handle storage quota

✅ Cart calculations with promotions
   - Should apply promotion discount
   - Should update total correctly
   - Should handle expired promotions
```

---

### 💳 **Domain 2: Checkout**

**Location:** `__tests__/unit/checkout/` | `__tests__/integration/checkout/`

#### **Unit Tests**

**1. Checkout Validation (`checkout/checkoutValidation.test.ts`)**
```typescript
✅ validateDeliveryStep()
   - Should validate delivery zone
   - Should validate street address
   - Should validate phone number format
   - Should validate delivery date (future dates only)
   - Should validate delivery time format
   - Should require minimum fields

✅ validatePaymentStep()
   - Should validate payment method
   - Should validate M-Pesa phone number
   - Should check payment method availability

✅ validateReviewStep()
   - Should validate order summary
   - Should check order totals match
   - Should verify item availability
```

**2. Order Formatters (`checkout/orderFormatters.test.ts`)**
```typescript
✅ buildCreateOrderRequest()
   - Should format order data correctly
   - Should include all required fields
   - Should calculate totals correctly
   - Should format address correctly
   - Should include promotion data if present
   - Should handle custom loaves
```

**3. Payment Service (`checkout/payment.test.ts`)**
```typescript
✅ processMpesaPayment()
   - Should format phone number correctly
   - Should validate amount
   - Should return transaction ID
   - Should handle payment failures
   - Should retry on network errors
```

#### **Integration Tests**

**Checkout Flow (`integration/checkout/checkout-flow.test.tsx`)**
```typescript
✅ Complete checkout flow
   - Should navigate through all steps
   - Should validate each step before proceeding
   - Should allow going back
   - Should submit order successfully

✅ Delivery step integration
   - Should load delivery zones
   - Should calculate delivery fee
   - Should validate form fields
   - Should show validation errors

✅ Payment step integration
   - Should process M-Pesa payment
   - Should handle payment errors
   - Should update order status

✅ Order submission
   - Should create order in system
   - Should clear cart after success
   - Should redirect to confirmation
   - Should handle submission errors
```

---

### 🍰 **Domain 3: Products**

**Location:** `__tests__/unit/products/` | `__tests__/integration/shop/`

#### **Unit Tests**

**1. Product Calculations (`products/pricing.test.ts`)**
```typescript
✅ calculateProductPrice()
   - Should calculate based on size
   - Should include cream price
   - Should include decoration prices
   - Should handle missing prices

✅ calculateWeightBasedPrice()
   - Should scale price by weight
   - Should handle fractional weights
```

**2. Product Search (`products/search.test.ts`)**
```typescript
✅ searchProducts()
   - Should match by name
   - Should match by category
   - Should be case-insensitive
   - Should handle partial matches
   - Should return empty for no matches
   - Should handle special characters
```

**3. Cream Options (`products/creamOptions.test.ts`)**
```typescript
✅ parseCreamOption()
   - Should extract name and cost
   - Should handle options without cost
   - Should handle malformed strings

✅ serializeCreamOption()
   - Should format correctly
   - Should include cost if > 0
   - Should exclude cost if 0
```

**4. Product Validation (`products/validation.test.ts`)**
```typescript
✅ validateProductForm()
   - Should validate required fields
   - Should validate price ranges
   - Should require at least one image
   - Should validate cream options
```

#### **Integration Tests**

**Product Catalog (`integration/shop/product-catalog.test.tsx`)**
```typescript
✅ Product listing
   - Should display products
   - Should filter by category
   - Should search products
   - Should paginate results

✅ Product details
   - Should display all product info
   - Should show customization options
   - Should calculate prices correctly
   - Should handle out of stock

✅ Product customization
   - Should update price on size change
   - Should add cream options
   - Should select decorations
   - Should upload images
```

---

### 📦 **Domain 4: Orders**

**Location:** `__tests__/unit/orders/` | `__tests__/integration/admin/`

#### **Unit Tests**

**1. Order Date Calculations (`orders/dateCalculations.test.ts`)**
```typescript
✅ getDaysUntilDue()
   - Should calculate days correctly
   - Should handle past dates
   - Should handle today's date

✅ isUrgent()
   - Should identify urgent orders
   - Should handle non-urgent orders
   - Should use configurable threshold

✅ isOverdue()
   - Should identify overdue orders
   - Should handle current orders
   - Should compare dates correctly

✅ getDateStatus()
   - Should return correct status
   - Should handle edge cases
```

**2. Order Status (`orders/statusColors.test.ts`)**
```typescript
✅ getStatusColor()
   - Should return color for each status
   - Should handle unknown status
```

**3. Order Formatters (`orders/dateFormatters.test.ts`)**
```typescript
✅ formatOrderDate()
   - Should format dates correctly
   - Should handle different locales
   - Should handle invalid dates
```

**4. Order Image Utils (`orders/imageUtils.test.ts`)**
```typescript
✅ getMockUploadedImages()
   - Should return image URLs
   - Should handle missing images
   - Should return correct format
```

#### **Integration Tests**

**Order Management (`integration/admin/order-management.test.tsx`)**
```typescript
✅ Order listing
   - Should display orders
   - Should filter by status
   - Should search orders
   - Should sort orders

✅ Order status updates
   - Should update status
   - Should trigger side effects
   - Should handle errors

✅ Order details
   - Should display all order info
   - Should show customer details
   - Should display items
   - Should show payment status
```

---

### 🎁 **Domain 5: Promotions**

**Location:** `__tests__/unit/promotions/` | `__tests__/integration/shop/`

#### **Unit Tests**

**1. Promotion Calculations (`promotions/calculations.test.ts`)**
```typescript
✅ calculatePromotionDiscountForCart()
   - Should calculate percentage discount
   - Should calculate fixed amount discount
   - Should apply to eligible items only
   - Should handle "All Cakes" promotions
   - Should respect minimum order value
   - Should handle max usage limits

✅ getPromotionDetail()
   - Should return promotion details
   - Should handle missing promotions
   - Should return applicable products
```

**2. Promotion Formatters (`promotions/formatters.test.ts`)**
```typescript
✅ formatPromotionData()
   - Should format for display
   - Should format for API
   - Should handle missing fields
```

#### **Integration Tests**

**Promotion Application (`integration/shop/promotions.test.tsx`)**
```typescript
✅ Applying promotions
   - Should filter catalog by promotion
   - Should apply discount to cart
   - Should update totals correctly
   - Should handle expired promotions
   - Should show promotion banner
```

---

### 👥 **Domain 6: Customers**

**Location:** `__tests__/unit/customers/` | `__tests__/integration/admin/`

#### **Unit Tests**

**1. Customer Status Utils (`customers/statusUtils.test.ts`)**
```typescript
✅ getStatusColor()
   - Should return color for each status
   - Should handle unknown status

✅ getAvatarColor()
   - Should return consistent colors
   - Should handle different names
```

**2. Customer Validation (`customers/validation.test.ts`)**
```typescript
✅ validateCustomerData()
   - Should validate email format
   - Should validate phone format
   - Should require name
```

#### **Integration Tests**

**Customer Management (`integration/admin/customer-management.test.tsx`)**
```typescript
✅ Customer listing
   - Should display customers
   - Should filter by status
   - Should search customers
   - Should show tabs (active/deactivated)

✅ Customer actions
   - Should activate/deactivate
   - Should delete customer
   - Should handle errors
```

---

### ⭐ **Domain 7: Reviews**

**Location:** `__tests__/unit/reviews/` | `__tests__/integration/admin/`

#### **Unit Tests**

**1. Review Utils (`reviews/reviewUtils.test.ts`)**
```typescript
✅ getStatusColor()
   - Should return color for each status

✅ getAvatarColor()
   - Should return consistent colors
```

#### **Integration Tests**

**Review Management (`integration/admin/review-management.test.tsx`)**
```typescript
✅ Review listing
   - Should display reviews
   - Should filter by rating
   - Should filter by status
   - Should show analytics

✅ Review moderation
   - Should approve reviews
   - Should flag reviews
   - Should reply to reviews
   - Should feature reviews
```

---

### 📊 **Domain 8: Analytics**

**Location:** `__tests__/unit/analytics/` | `__tests__/integration/admin/`

#### **Unit Tests**

**1. Analytics Calculations (`analytics/calculations.test.ts`)**
```typescript
✅ generateMockData()
   - Should generate correct structure
   - Should respect date range
   - Should calculate aggregates
   - Should calculate change percentages

✅ calculateChangePercentage()
   - Should calculate positive changes
   - Should calculate negative changes
   - Should handle zero values
   - Should handle division by zero

✅ calculateMetrics()
   - Should calculate revenue metrics
   - Should calculate order metrics
   - Should calculate conversion rates
```

**2. Date Range Utils (`analytics/dateRange.test.ts`)**
```typescript
✅ calculateDateRange()
   - Should calculate week range
   - Should calculate month range
   - Should calculate quarter range
   - Should calculate year range
   - Should handle custom ranges

✅ getBucketSize()
   - Should return correct bucket size
   - Should match range type
```

#### **Integration Tests**

**Analytics Dashboard (`integration/admin/analytics.test.tsx`)**
```typescript
✅ Analytics display
   - Should show stat cards
   - Should display charts
   - Should update on date range change
   - Should show comparison data
```

---

### 🔐 **Domain 9: Authentication**

**Location:** `__tests__/unit/auth/` | `__tests__/integration/auth/`

#### **Unit Tests**

**1. Auth Validation (`auth/validation.test.ts`)**
```typescript
✅ validateLoginForm()
   - Should validate email format
   - Should require password
   - Should check password length

✅ validateSignupForm()
   - Should validate all fields
   - Should check password match
   - Should validate phone format

✅ validateForgotPasswordForm()
   - Should validate email format
   - Should require email
```

**2. Auth API (`auth/authApi.test.ts`)**
```typescript
✅ login()
   - Should authenticate user
   - Should return tokens
   - Should handle invalid credentials
   - Should handle network errors

✅ signup()
   - Should create user
   - Should validate data
   - Should handle duplicate emails

✅ requestPasswordReset()
   - Should send reset email
   - Should handle invalid email
```

#### **Integration Tests**

**Auth Flows (`integration/auth/auth-flows.test.tsx`)**
```typescript
✅ Login flow
   - Should login successfully
   - Should redirect after login
   - Should show errors on failure
   - Should handle validation errors

✅ Signup flow
   - Should create account
   - Should validate form
   - Should redirect to login
   - Should handle errors

✅ Password reset flow
   - Should send reset email
   - Should show success message
   - Should handle errors
```

---

### 👨‍💼 **Domain 10: Admin**

**Location:** `__tests__/unit/admin/` | `__tests__/integration/admin/`

#### **Unit Tests**

**1. Admin Permissions (`admin/permissions.test.ts`)**
```typescript
✅ checkPermission()
   - Should check user permissions
   - Should handle role-based access
   - Should validate permission strings
```

**2. Admin Data Transform (`admin/dataTransform.test.ts`)**
```typescript
✅ transformProductData()
   - Should format for display
   - Should format for API
```

#### **Integration Tests**

**Admin Workflows (`integration/admin/admin-workflows.test.tsx`)**
```typescript
✅ Product management
   - Should create product
   - Should update product
   - Should delete product
   - Should handle image uploads

✅ Order management
   - Should update order status
   - Should view order details
   - Should filter orders

✅ Settings management
   - Should update settings
   - Should validate settings
```

---

### 🎨 **Domain 11: Decorations**

**Location:** `__tests__/unit/decorations/` | `__tests__/integration/admin/`

#### **Unit Tests**

**1. Decoration Validation (`decorations/validation.test.ts`)**
```typescript
✅ validateDecorationForm()
   - Should validate required fields
   - Should validate price
   - Should validate category
```

#### **Integration Tests**

**Decoration Management (`integration/admin/decorations.test.tsx`)**
```typescript
✅ Decoration CRUD
   - Should create decoration
   - Should update decoration
   - Should delete decoration
   - Should manage categories
```

---

### 📝 **Domain 12: Recipes**

**Location:** `__tests__/unit/recipes/` | `__tests__/integration/admin/`

#### **Unit Tests**

**1. Recipe Validation (`recipes/validation.test.ts`)**
```typescript
✅ validateRecipeForm()
   - Should validate required fields
   - Should validate ingredients
   - Should validate instructions
   - Should check servings
```

#### **Integration Tests**

**Recipe Management (`integration/admin/recipes.test.tsx`)**
```typescript
✅ Recipe CRUD
   - Should create recipe
   - Should update recipe
   - Should delete recipe
   - Should manage ingredients
   - Should manage instructions
```

---

### 🚚 **Domain 13: Delivery**

**Location:** `__tests__/unit/delivery/` | `__tests__/integration/checkout/`

#### **Unit Tests**

**1. Delivery Calculations (`delivery/calculations.test.ts`)**
```typescript
✅ calculateDeliveryFee()
   - Should calculate by zone
   - Should apply free delivery threshold
   - Should handle edge cases

✅ validateDeliveryDate()
   - Should require future dates
   - Should enforce minimum notice
   - Should handle business hours
```

#### **Integration Tests**

**Delivery Flow (`integration/checkout/delivery.test.tsx`)**
```typescript
✅ Delivery zone selection
   - Should load zones
   - Should update fee on zone change
   - Should validate zone selection

✅ Delivery date/time
   - Should validate date
   - Should validate time
   - Should check availability
```

---

### 🔧 **Domain 14: Shared/Common**

**Location:** `__tests__/unit/shared/`

#### **Unit Tests**

**1. Format Utils (`shared/format.test.ts`)**
```typescript
✅ formatCurrency()
   - Should format KES correctly
   - Should handle decimals
   - Should format large numbers

✅ formatPhoneNumber()
   - Should format Kenyan numbers
   - Should handle different formats
   - Should validate format

✅ formatDate()
   - Should format dates correctly
   - Should handle different locales
```

**2. Validation Utils (`shared/validation.test.ts`)**
```typescript
✅ validateEmail()
   - Should validate correct emails
   - Should reject invalid emails

✅ validatePhone()
   - Should validate Kenyan formats
   - Should handle international format
```

**3. String Utils (`shared/string.test.ts`)**
```typescript
✅ truncate()
   - Should truncate long strings
   - Should add ellipsis
   - Should handle short strings

✅ slugify()
   - Should create valid slugs
   - Should handle special characters
```

---

## Test Coverage Goals

### **Unit Tests**
- **Target:** 80%+ code coverage
- **Critical Paths:** 95%+ coverage
  - Cart calculations
  - Payment processing
  - Order calculations
  - Promotions logic

### **Integration Tests**
- **Target:** All major user flows covered
- **Critical Flows:**
  - Complete checkout process
  - Product customization to cart
  - Order management workflows
  - Admin product management

### **Priority Order**
1. **P0 (Critical):** Cart, Checkout, Payment
2. **P1 (High):** Orders, Products, Promotions
3. **P2 (Medium):** Customers, Reviews, Analytics
4. **P3 (Low):** Decorations, Recipes, Settings

---

## Test Execution Strategy

### **Unit Tests**
```bash
# Run all unit tests
npm run test:unit

# Run specific domain
npm run test:unit -- cart

# Run with coverage
npm run test:unit -- --coverage
```

### **Integration Tests**
```bash
# Run all integration tests
npm run test:integration

# Run specific flow
npm run test:integration -- checkout
```

### **Test Commands (package.json)**
```json
{
  "scripts": {
    "test": "jest",
    "test:unit": "jest --testPathPattern=__tests__/unit",
    "test:integration": "jest --testPathPattern=__tests__/integration",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

## Test File Naming Convention

- **Unit Tests:** `<feature>.test.ts` or `<feature>.test.tsx`
- **Integration Tests:** `<flow>-flow.test.tsx` or `<feature>-integration.test.tsx`
- **Fixtures:** `<feature>.fixtures.ts`

---

## Example Test Structure

### **Unit Test Example**
```typescript
// __tests__/unit/cart/calculations.test.ts
import {
  calculateCartSubtotal,
  calculateDeliveryFee,
  calculateCartTotal
} from '@/utils/cart/calculations';

describe('Cart Calculations', () => {
  describe('calculateCartSubtotal', () => {
    it('should calculate subtotal for multiple items', () => {
      const items = [/* test data */];
      const result = calculateCartSubtotal(items, []);
      expect(result).toBe(1500);
    });

    it('should return 0 for empty cart', () => {
      const result = calculateCartSubtotal([], []);
      expect(result).toBe(0);
    });
  });
});
```

### **Integration Test Example**
```typescript
// __tests__/integration/checkout/checkout-flow.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CheckoutPage from '@/app/shop/checkout/page';

describe('Checkout Flow Integration', () => {
  it('should complete full checkout process', async () => {
    render(<CheckoutPage />);
    
    // Fill delivery step
    fireEvent.change(screen.getByLabelText('Street Address'), {
      target: { value: '123 Main St' }
    });
    
    // Navigate through steps
    fireEvent.click(screen.getByText('Next'));
    
    // Verify order submission
    await waitFor(() => {
      expect(screen.getByText('Order Confirmed')).toBeInTheDocument();
    });
  });
});
```

---

## Next Steps

1. **Setup Testing Infrastructure**
   - Install Jest + React Testing Library
   - Configure test environment
   - Setup coverage reporting

2. **Start with P0 Tests**
   - Cart calculations
   - Checkout validation
   - Payment processing

3. **Gradually Expand Coverage**
   - Add P1 domain tests
   - Add integration tests
   - Target 80%+ coverage

4. **Continuous Integration**
   - Run tests on PR
   - Enforce coverage thresholds
   - Report coverage in CI

---

**Total Estimated Test Files:**
- **Unit Tests:** ~40-50 files
- **Integration Tests:** ~15-20 files
- **Total Test Cases:** ~500+ test cases

