# Staff Permissions Refactoring Plan

## Overview
Refactor the staff permissions page to remove the permissions matrix tab and create a dedicated page for adding/editing roles with permission assignment.

## Current State
- `/admin/staff/permissions` has two tabs:
  - **Permissions Matrix Tab**: Visual matrix for assigning permissions to roles
  - **Roles & Permissions Tab**: Table view of all roles with their permissions
- Both tabs are on the same page with tab navigation

## Target State
- **Single Tab**: Only "Roles & Permissions" tab remains on `/admin/staff/permissions`
- **New Page**: `/admin/staff/permissions/create` - For creating new roles with permission matrix
- **Edit Page**: `/admin/staff/permissions/[roleId]` - For editing existing roles with permission matrix
- **Navigation**: Click "Add Role" button navigates to create page; Edit button navigates to edit page

---

## Implementation Steps

### Step 1: Update Permissions Page (`src/app/admin/staff/permissions/page.tsx`)
**Objective**: Remove tab navigation and permissions matrix tab

**Changes**:
1. Remove `activeTab` state and tab navigation UI
2. Remove `PermissionsMatrix` component import and rendering
3. Keep only `RolesTable` component
4. Update page title/description if needed
5. Remove unused `Shield` icon import if only used for matrix tab

**Files to Modify**:
- `src/app/admin/staff/permissions/page.tsx`

---

### Step 2: Update RolesTable Component (`src/components/admin/staff/RolesTable.tsx`)
**Objective**: Add "Add Role" button that navigates to create page

**Changes**:
1. Add `useRouter` from `next/navigation`
2. Add "Add Role" button in the header section (next to "Total Roles" counter)
3. Add `onAddRole` handler that navigates to `/admin/staff/permissions/create`
4. Update Edit button to navigate to `/admin/staff/permissions/[roleId]` instead of modal

**Files to Modify**:
- `src/components/admin/staff/RolesTable.tsx`

---

### Step 3: Create Role Form Component (`src/components/admin/staff/RolePermissionForm.tsx`)
**Objective**: Extract reusable form component for role creation/editing

**Features**:
- Role basic info fields:
  - Name (required)
  - Description (optional)
- Permission matrix section:
  - Grouped by categories (Orders, Customers, Products, Recipes, Analytics, Staff, Settings)
  - Checkbox grid for each permission
  - "Select All" for each category
  - Visual indicators for selected permissions
- Form validation
- Submit/Cancel buttons
- Loading states

**Props**:
```typescript
interface RolePermissionFormProps {
  initialData?: {
    id?: string;
    name: string;
    description: string;
    permissions: string[];
  };
  mode: 'create' | 'edit';
  onSave: (data: RoleFormData) => void | Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}
```

**Files to Create**:
- `src/components/admin/staff/RolePermissionForm.tsx`

---

### Step 4: Create New Role Page (`src/app/admin/staff/permissions/create/page.tsx`)
**Objective**: Page for creating new roles with permission matrix

**Features**:
- Use `RolePermissionForm` component
- Handle form submission
- Navigate back to permissions list on success
- Show success/error messages
- Handle navigation on cancel

**Implementation**:
```typescript
export default function CreateRolePage() {
  const router = useRouter();
  
  const handleSave = async (data: RoleFormData) => {
    // TODO: API call to create role
    // On success, navigate to permissions page
    router.push('/admin/staff/permissions');
  };
  
  const handleCancel = () => {
    router.push('/admin/staff/permissions');
  };
  
  return (
    <AdminLayout title="Create Role" description="Create a new role and assign permissions">
      <RolePermissionForm
        mode="create"
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </AdminLayout>
  );
}
```

**Files to Create**:
- `src/app/admin/staff/permissions/create/page.tsx`

---

### Step 5: Create Edit Role Page (`src/app/admin/staff/permissions/[roleId]/page.tsx`)
**Objective**: Page for editing existing roles with permission matrix

**Features**:
- Fetch role data by ID (from URL params)
- Use `RolePermissionForm` component with initial data
- Handle form submission for updates
- Navigate back to permissions list on success
- Show loading state while fetching role data
- Handle error states (role not found)

**Implementation**:
```typescript
export default function EditRolePage({ params }: { params: { roleId: string } }) {
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // TODO: Fetch role by ID
    // Set role data
    setLoading(false);
  }, [params.roleId]);
  
  const handleSave = async (data: RoleFormData) => {
    // TODO: API call to update role
    // On success, navigate to permissions page
    router.push('/admin/staff/permissions');
  };
  
  const handleCancel = () => {
    router.push('/admin/staff/permissions');
  };
  
  if (loading) return <LoadingSpinner />;
  if (!role) return <NotFound />;
  
  return (
    <AdminLayout title="Edit Role" description="Edit role and update permissions">
      <RolePermissionForm
        mode="edit"
        initialData={role}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </AdminLayout>
  );
}
```

**Files to Create**:
- `src/app/admin/staff/permissions/[roleId]/page.tsx`

---

### Step 6: Extract Permission Matrix Logic
**Objective**: Create reusable permission matrix component from existing `PermissionsMatrix.tsx`

**Changes**:
1. Extract the permission matrix grid logic into a new component
2. Make it accept permissions and selected permissions as props
3. Handle permission toggle callbacks
4. Support category grouping and "Select All" functionality

**Component Structure**:
```typescript
interface PermissionMatrixGridProps {
  permissions: Permission[];
  selectedPermissions: string[];
  onTogglePermission: (permissionId: string) => void;
  onToggleCategory?: (category: string, selectAll: boolean) => void;
  readOnly?: boolean;
}
```

**Files to Create**:
- `src/components/admin/staff/PermissionMatrixGrid.tsx`

---

### Step 7: Update Types and Utilities
**Objective**: Ensure type consistency across components

**Types to Verify/Update**:
- `Role` interface (if needed)
- `RoleFormData` interface for form submission
- Permission-related types

**Files to Check/Update**:
- `src/types/admin/staff.ts`
- `src/utils/admin/permissions.ts`

---

## File Structure After Refactoring

```
src/
├── app/
│   └── admin/
│       └── staff/
│           └── permissions/
│               ├── page.tsx                    # Main permissions page (single tab)
│               ├── create/
│               │   └── page.tsx                # Create new role page
│               └── [roleId]/
│                   └── page.tsx                # Edit role page
│
├── components/
│   └── admin/
│       └── staff/
│           ├── RolesTable.tsx                  # Updated with navigation
│           ├── RolePermissionForm.tsx          # New: Reusable form component
│           ├── PermissionMatrixGrid.tsx        # New: Extracted matrix grid
│           └── PermissionsMatrix.tsx           # Can be removed or kept for reference
│
└── types/
    └── admin/
        └── staff.ts                            # Verify/update types
```

---

## Implementation Checklist

### Phase 1: Cleanup & Setup
- [ ] Remove tab navigation from permissions page
- [ ] Remove PermissionsMatrix tab content
- [ ] Keep only RolesTable component visible
- [ ] Test that Roles & Permissions tab still works

### Phase 2: Create Reusable Components
- [ ] Create `PermissionMatrixGrid` component
- [ ] Create `RolePermissionForm` component
- [ ] Extract permission categories and structure
- [ ] Add form validation logic

### Phase 3: Create New Pages
- [ ] Create `/admin/staff/permissions/create` page
- [ ] Create `/admin/staff/permissions/[roleId]` page
- [ ] Add navigation logic in RolesTable
- [ ] Test navigation flows

### Phase 4: Integration & Testing
- [ ] Integrate form submission with API (or mock)
- [ ] Test create role flow
- [ ] Test edit role flow
- [ ] Test cancel/back navigation
- [ ] Verify permission assignment works correctly

### Phase 5: Polish
- [ ] Add loading states
- [ ] Add error handling
- [ ] Add success messages
- [ ] Test edge cases (invalid roleId, etc.)
- [ ] Remove unused PermissionsMatrix component (if no longer needed)

---

## Best Practices Applied

1. **Single Responsibility**: Each component has a clear, single purpose
2. **Reusability**: `RolePermissionForm` and `PermissionMatrixGrid` are reusable
3. **Navigation**: Using Next.js routing for clean URLs and browser history
4. **Separation of Concerns**: Form logic separated from page logic
5. **Type Safety**: TypeScript interfaces for all props and data
6. **User Experience**: Clear navigation, loading states, and error handling
7. **Code Organization**: Logical file structure following Next.js conventions

---

## Testing Strategy

### Manual Testing Checklist
1. Navigate to `/admin/staff/permissions` - should see only Roles & Permissions table
2. Click "Add Role" button - should navigate to create page
3. Fill form and select permissions - should work correctly
4. Submit form - should create role and navigate back
5. Click "Edit" on a role - should navigate to edit page with pre-filled data
6. Modify permissions and submit - should update role
7. Click "Cancel" - should navigate back without saving
8. Test with invalid roleId - should show error or redirect

### Unit Tests (Future)
- Test `PermissionMatrixGrid` component rendering
- Test `RolePermissionForm` validation
- Test permission toggle logic
- Test category select-all functionality

---

## Notes

- The existing `PermissionsMatrix.tsx` component can be used as reference for the matrix grid implementation
- Consider using React Hook Form for form management if the form becomes complex
- Add breadcrumb navigation if needed for better UX
- Consider adding a "Duplicate Role" feature in the future

