
import { Product } from "@/types";

// Get the base URL for API calls
function getBaseUrl() {
    if (typeof window !== 'undefined') {
        // Browser should use relative path
        return '';
    }
    // SSR should use absolute URL
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }
    // Development fallback
    return 'http://localhost:3000';
}

const API_URL = `${getBaseUrl()}/api`;

export async function getProducts(category?: string): Promise<Product[]> {
    const url = category
        ? `${API_URL}/products?category=${encodeURIComponent(category)}`
        : `${API_URL}/products`;

    const res = await fetch(url, {
        cache: 'no-store' // Dynamic data
    });

    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }

    return res.json();
}

export async function getProduct(id: string): Promise<Product | null> {
    const res = await fetch(`${API_URL}/products/${id}`, {
        cache: 'no-store'
    });

    if (res.status === 404) return null;

    if (!res.ok) {
        throw new Error('Failed to fetch product');
    }

    return res.json();
}

export async function login(credentials: any) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    if (!res.ok) {
        throw new Error('Login failed');
    }

    return res.json();
}

export async function signup(userData: any) {
    const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });

    if (!res.ok) {
        throw new Error('Signup failed');
    }

    return res.json();
}

export async function checkout(data: any) {
    const res = await fetch(`${API_URL}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Checkout failed');
    }

    return res.json();
}
