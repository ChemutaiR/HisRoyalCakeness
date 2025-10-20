# Component Naming Conventions

## Overview
This document establishes naming conventions for components to prevent conflicts and improve maintainability.

## Naming Rules

### 1. Component Function Names
- Use **PascalCase** for all component function names
- Be descriptive and specific about the component's purpose
- Avoid generic names that could conflict

### 2. File Naming
- Use **PascalCase** for component files (e.g., `ProductCard.tsx`)
- Match the component function name exactly

### 3. Namespace Prefixes
Use prefixes to avoid conflicts between different areas:

#### Store Components (Customer-facing)
- **No prefix** for general components: `Navbar`, `Footer`, `ProductCard`
- **Feature prefix** for specific functionality: `CakeReviews`, `SizeSelector`

#### Admin Components
- **Admin prefix** for admin-specific components: `AdminLayout`, `AdminSidebar`
- **Feature prefix** for admin features: `AdminReviews`, `AdminAnalytics`

#### Auth Components
- **Auth prefix** for authentication components: `AuthForm`, `LoginButton`
- **Navbar variants**: `NavbarLogoOnly` (for auth pages)

#### UI Components
- **No prefix** for reusable UI components: `Button`, `Modal`, `Input`
- Keep in `src/components/ui/` directory

## Examples

### ✅ Good Naming
```typescript
// Store components
export default function ProductCard() { }
export default function CakeReviews() { }
export default function SizeSelector() { }

// Admin components  
export default function AdminLayout() { }
export default function AdminReviews() { }
export default function AdminAnalytics() { }

// Auth components
export default function LoginForm() { }
export default function NavbarLogoOnly() { }

// UI components
export default function Button() { }
export default function Modal() { }
```

### ❌ Bad Naming
```typescript
// Too generic - could conflict
export default function Reviews() { }
export default function Layout() { }
export default function Form() { }

// Inconsistent naming
export default function productCard() { } // should be ProductCard
export default function admin_layout() { } // should be AdminLayout
```

## Directory Structure

```
src/components/
├── ui/                    # Reusable UI components
│   ├── Button.tsx
│   ├── Modal.tsx
│   └── Input.tsx
├── CakeCustomizer/        # Store-specific components
│   ├── CakeReviews.tsx
│   ├── SizeSelector.tsx
│   └── AddToCartButton.tsx
├── admin/                 # Admin-specific components
│   ├── AdminLayout.tsx
│   ├── AdminSidebar.tsx
│   ├── reviews/
│   │   └── AdminReviews.tsx
│   └── analytics/
│       └── AdminAnalytics.tsx
├── Navbar.tsx            # General store components
├── Footer.tsx
└── ProductCard.tsx
```

## Import Guidelines

### Use Descriptive Import Names
```typescript
// ✅ Good - Clear and specific
import CakeReviews from '@/components/CakeCustomizer/Reviews';
import AdminReviews from '@/components/admin/reviews/Reviews';

// ❌ Bad - Ambiguous
import Reviews from '@/components/CakeCustomizer/Reviews';
import Reviews from '@/components/admin/reviews/Reviews';
```

### Barrel Exports
Create `index.ts` files for cleaner imports:

```typescript
// src/components/CakeCustomizer/index.ts
export { default as CakeReviews } from './Reviews';
export { default as SizeSelector } from './SizeSelector';
export { default as AddToCartButton } from './AddToCartButton';

// Usage
import { CakeReviews, SizeSelector } from '@/components/CakeCustomizer';
```

## Conflict Prevention

1. **Always check existing components** before creating new ones
2. **Use descriptive prefixes** for similar functionality
3. **Keep components in appropriate directories**
4. **Update imports immediately** when renaming components
5. **Test import resolution** after changes

## Migration Checklist

When renaming components:
- [ ] Update component function name
- [ ] Update all import statements
- [ ] Update all usage in JSX
- [ ] Test that imports resolve correctly
- [ ] Update any barrel exports
- [ ] Verify no linting errors

## Enforcement

- Use ESLint rules to enforce naming conventions
- Add pre-commit hooks to check for conflicts
- Regular code reviews to catch violations
- Documentation updates when patterns change
