This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Data Flow (Development / Mock-API)

Beginner-friendly overview of how admin products power the shop pages during development:

1. Admin UI (pages and components)
   - Reads and writes via a React hook: `src/hooks/admin/useProducts.ts`.
2. Hook → Service (business logic)
   - The hook calls `src/services/admin/products.ts` for CRUD, validation, and lists.
3. Service → Mock Database
   - The service mutates in-memory data in `src/mockDatabase/admin/products.ts` (simulating a backend).
4. Sync to Shop Store
   - After load/create/update/delete, `src/services/admin/shopSync.ts` converts admin products for the shop and updates the catalog store.
5. Shop Pages Read from Store
   - Shop hooks/components (`src/hooks/shop/*`) read from the catalog store; cake detail pages use these to display sizes, creams, and pricing.

This layout makes it easy to swap the mock service for a real API later by changing only the service internals.
