
"use client";

import { ShoppingCart, Check } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { Product } from "@/types";
import { useState } from "react";

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    // Use a selector to avoid unnecessary re-renders, although zustand handles this well.
    const addToCart = useCartStore((state) => state.addToCart);

    // Local state for UI feedback
    const [isAdded, setIsAdded] = useState(false);

    const handleClick = () => {
        addToCart(product);

        // Show success state
        setIsAdded(true);

        // Reset after 2 seconds
        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    };

    return (
        <button
            onClick={handleClick}
            disabled={isAdded}
            className={`
            flex w-full items-center justify-center rounded-md px-8 py-3 text-base font-medium text-white 
            focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ease-in-out
            ${isAdded
                    ? "bg-green-600 hover:bg-green-700 focus:ring-green-500 scale-105"
                    : "bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 active:scale-95"
                }
        `}
        >
            {isAdded ? (
                <>
                    <Check className="mr-2 h-5 w-5" />
                    Added to Cart
                </>
            ) : (
                <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                </>
            )}
        </button>
    );
}
