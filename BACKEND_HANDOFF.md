
# Backend Handoff Document

This document outlines the frontend structure, data models, and required API endpoints to transition the "Askhu Store" from mock data to a real backend.

## Tech Stack
- **Frontend**: Next.js 16, TypeScript, TailwindCSS, Zustand (State Management)
- **Current Data**: Mock data located in `@/lib/mockData.ts` and `@/types/index.ts`

## Data Models (Frontend Interfaces)

### Product
```typescript
interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    image: string;
    rating: number;
    reviews: number;
    category: string; // e.g., "Electronics", "Wearables"
    inStock: boolean;
}
```

### Cart Item
```typescript
interface CartItem extends Product {
    quantity: number;
}
```

## Required API Endpoints

The frontend currently simulates these calls. The Backend Agent needs to implement the following routes (likely in `app/api/...` or a separate backend service).

### Products
- `GET /api/products`
  - Returns: `Product[]`
  - Supports filtering by category (optional query param `?category=electronics`)
- `GET /api/products/:id`
  - Returns: `Product`

### Authentication
- `POST /api/auth/login`
  - Input: `{ email, password }`
  - Returns: Auth Token / User Session
- `POST /api/auth/signup`
  - Input: `{ name, email, password }`
  - Returns: Auth Token / User Session

### Checkout
- `POST /api/checkout`
  - Input: `{ items: CartItem[], shippingDetails: Address, paymentDetails: Payment }`
  - Returns: `{ orderId, status }`

## Integration Points

1.  **Product Loading**: Replace `import { PRODUCTS } from "@/lib/mockData"` in `app/page.tsx`, `app/products/page.tsx`, and `app/products/[id]/page.tsx` with `fetch('/api/products...')`.
2.  **Category Filtering**: Update `app/category/[slug]/page.tsx` to fetch filtered server-side data.
3.  **Authentication**: Update `app/login/page.tsx` and `app/signup/page.tsx` to replace `setTimeout` with real `fetch` calls.
4.  **Checkout**: Update `app/checkout/page.tsx` to send the payload to the backend.

## Notes for Backend Agent
- The `Category` page normalizes slugs (e.g., "Home & Garden" -> "homegarden"). Ensure the API handles slug matching or returns a "slug" field in the Product model.
- The `Cart` logic uses `zustand` and persists in memory only. Consider syncing cart state to the database for logged-in users.
