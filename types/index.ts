
// Mock Interfaces to unblock Frontend Development
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    image: string;
    rating: number;
    reviews: number;
    category: string;
    inStock: boolean;
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'USER' | 'ADMIN';
}

export interface CartItem extends Product {
    quantity: number;
}
