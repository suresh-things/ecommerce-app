
import { Product } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function getProducts(category?: string): Promise<Product[]> {
    const url = new URL(`${API_URL}/products`);
    if (category) {
        url.searchParams.append('category', category);
    }

    const res = await fetch(url.toString(), {
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
