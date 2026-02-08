
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store"; // We'll assume the store is available

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, clearCart, subtotal } = useCartStore();

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 px-4 text-center">
                <div className="bg-orange-100 p-6 rounded-full dark:bg-orange-900/20">
                    <ShoppingBag className="w-12 h-12 text-orange-500" />
                </div>
                <h1 className="text-2xl font-bold">Your cart is empty</h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                    Looks like you haven't added anything to your cart yet.
                </p>
                <Link
                    href="/"
                    className="mt-4 px-6 py-2.5 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg bg-white dark:bg-black border-gray-100 dark:border-gray-800 shadow-sm">
                            <div className="relative w-full sm:w-32 aspect-square rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex flex-col flex-1 justify-between py-1">
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <h3 className="font-semibold text-lg line-clamp-1">{item.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{item.category}</p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                        aria-label="Remove item"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="flex justify-between items-end mt-4 sm:mt-0">
                                    <div className="flex items-center border rounded-md">
                                        <button
                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="text-right">
                                        <span className="block font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                                        {item.quantity > 1 && (
                                            <span className="text-xs text-gray-500">${item.price} each</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={clearCart}
                        className="text-sm text-red-500 hover:underline mt-4"
                    >
                        Clear Shopping Cart
                    </button>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 p-6 border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 space-y-6">
                        <h2 className="text-lg font-semibold">Order Summary</h2>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Subtotal ({items.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                                <span className="font-medium">${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Shipping</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Tax Estimate</span>
                                <span className="font-medium">${(total * 0.08).toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <div className="flex justify-between text-base font-bold">
                                <span>Total</span>
                                <span>${(total * 1.08).toFixed(2)}</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Including tax</p>
                        </div>


                        <Link
                            href="/checkout"
                            className="block w-full text-center bg-orange-600 text-white py-3 rounded-md font-medium hover:bg-orange-700 transition-colors shadow-sm"
                        >
                            Proceed to Checkout
                        </Link>

                        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
                            <ShieldCheck className="w-4 h-4" />
                            Secure Checkout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ShieldCheck(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    )
}
