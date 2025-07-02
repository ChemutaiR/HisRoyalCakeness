# Style Guide

## Typography

### Font Family
- Primary Font: Work Sans
- Usage: Applied globally to all text elements
- Implementation: `font-work-sans` class

### Font Size Scale
| Element             | Tailwind Class         | Font Size (px) |
|---------------------|-----------------------|---------------|
| Main Heading        | text-4xl md:text-6xl  | 36 / 60        |
| Section Heading     | text-3xl              | 30            |
| Card Title          | text-2xl              | 24            |
| Label/FloatingLabel | text-sm               | 14            |
| Button/Text         | text-base             | 16            |
| Paragraph/Body      | text-base             | 16            |

### Font Weights
- Regular: `font-normal` (400)
- Medium: `font-medium` (500)
- Semibold: `font-semibold` (600)
- Bold: `font-bold` (700)

### Line Heights
- Headings: `leading-tight` (1.2)
- Body Text: `leading-normal` (1.5)
- Buttons: `leading-normal` (1.5)

### Text Colors
- Primary: Black (`text-black`)
- Secondary: Gray-600 (`text-gray-600`)
- Accent: Pink (`text-[#c7b8ea]`)
- White: White (`text-white`)

### Text Alignment
- Headings: Left-aligned
- Body Text: Left-aligned
- Buttons: Center-aligned
- Cards: Left-aligned

### Text Transforms
- Headings: None
- Buttons: None
- Labels: None

### Text Decoration
- Links: None (unless hover state)
- Buttons: None
- Headings: None

### Text Spacing
- Letter Spacing: Normal
- Word Spacing: Normal
- Line Height: Normal

### Text Overflow
- Headings: Truncate with ellipsis
- Body Text: Wrap
- Buttons: Truncate with ellipsis

### Text Selection
- Background: Pink (`bg-[#c7b8ea]`)
- Text: Black (`text-black`)

### Text Accessibility
- Minimum contrast ratio: 4.5:1
- Minimum font size: 14px
- Maximum line length: 80 characters

### Text Responsiveness
- Mobile: Base sizes
- Tablet: Slightly larger
- Desktop: Full sizes

### Text Implementation
- Use Tailwind classes for all text styling
- Maintain consistent spacing between text elements
- Ensure proper hierarchy with font sizes
- Use semantic HTML elements for proper structure

## Color Palette

### Primary Colors
- Black: `#000000`
  - Usage: Background for navbar, text on white backgrounds
  - Implementation: `bg-black`, `text-black`
- White: `#FFFFFF`
  - Usage: Background for main content, text on black backgrounds
  - Implementation: `bg-white`, `text-white`

### Accent Color
- Pink: `#c7b8ea`
  - Usage: Call-to-action buttons (e.g., "Add to Cart", "Shop Now"), hover effect for interactive elements
  - Implementation: `bg-[#c7b8ea]`, `text-black` (when used as background), `hover:bg-[#c7b8ea]`

### Interactive States
- Hover: Use the pink accent color for all interactive elements (dropdowns, buttons, links)
  - Implementation: `hover:bg-[#c7b8ea]`, `hover:text-black`

## Components

### Navbar
- Background: Black
- Text: White
- Icons: White
- Hover Effects: White with 10% opacity or pink accent for dropdown
- Cart Badge: White background with black text

### Buttons
- Shape: Rounded full
- Font: Work Sans, font-semibold
- Font Size: `text-sm` (14px)
- Transition: Smooth color transition
- Shadow: Use for primary buttons

#### Primary Button
- Background: Pink (`#c7b8ea`)
- Text: Black
- Shadow: Yes
- Hover: Slightly darker pink (`bg-[#c7b8ea]/80`)
- Example: `bg-[#c7b8ea] text-black text-sm hover:bg-[#c7b8ea]/80`

#### Secondary Button
- Background: White
- Text: Black
- Border: 1px solid pink (`#c7b8ea`)
- Hover: Pink background, black text
- Example: `bg-white text-black text-sm border border-[#c7b8ea] hover:bg-[#c7b8ea] hover:text-black`

#### Dropdown & Links
- On hover: Pink background, black text
- Example: `hover:bg-[#c7b8ea] hover:text-black`

### Layout
- Max Width: `max-w-7xl`
- Padding:
  - Mobile: `px-4`
  - Tablet: `sm:px-6`
  - Desktop: `lg:px-8`
- Vertical Spacing: `py-8` (Note: Section padding may vary)

### Tables
- Container: `bg-white rounded-lg shadow-lg overflow-hidden`
- Header Section: `bg-gray-50 px-6 py-4 border-b`
- Header Title: `text-lg font-semibold text-gray-800`
- Header Controls: `flex space-x-2` for filters and buttons
- Table Wrapper: `overflow-x-auto`
- Table: `w-full`
- Table Head: `bg-gray-50`
- Table Headers: `px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`
- Table Body: `bg-white divide-y divide-gray-200`
- Table Rows: `hover:bg-gray-50`
- Table Cells: `px-6 py-4 whitespace-nowrap`
- Cell Content: `text-sm text-gray-900` for primary text, `text-sm text-gray-500` for secondary text
- Action Buttons: `text-indigo-600 hover:text-indigo-900 mr-3` for edit, `text-green-600 hover:text-green-900 mr-3` for positive actions, `text-red-600 hover:text-red-900` for delete/negative actions
- Status Badges: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full` with color variations:
  - High Priority: `bg-red-100 text-red-800`
  - Medium Priority: `bg-yellow-100 text-yellow-800`
  - Low Priority: `bg-green-100 text-green-800`
  - In Progress: `bg-blue-100 text-blue-800`
  - Review: `bg-yellow-100 text-yellow-800`
  - To Do: `bg-gray-100 text-gray-800`
- Progress Bars: `w-16 bg-gray-200 rounded-full h-2 mr-2` with colored progress `bg-blue-500 h-2 rounded-full`
- Avatar Elements: `h-8 w-8 rounded-full` with background colors and `text-white text-sm font-medium`

## Spacing
- Component Spacing: `space-x-4`
- Section Padding: `py-8`
- Container Padding: `px-4 sm:px-6 lg:px-8`

## Shadows
- Navbar: `shadow-lg`
- Buttons: Use for primary buttons

## Responsive Design
- Mobile First Approach
- Breakpoints:
  - sm: 640px
  - lg: 1024px

## Icons
- Source: Lucide React
- Size: `h-6 w-6`
- Color: Inherits from parent text color

## Design Suggestion
- Use the pink as a hover effect for all interactive elements (dropdowns, buttons, links).
- For the secondary button, add a pink border for clarity, and on hover, fill with pink and switch text to black. 