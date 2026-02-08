
"use client";

import { useCartStore } from "@/lib/store";
import Link from "next/link";
import { ArrowLeft, CreditCard, Lock, Truck } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";


import { checkout } from "@/lib/api";

export default function CheckoutPage() {
    const { items, clearCart } = useCartStore();
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const formData = new FormData(e.currentTarget as HTMLFormElement);
            const shippingDetails = {
                firstName: formData.get("firstName"),
                lastName: formData.get("lastName"),
                address: formData.get("address"),
                city: formData.get("city"),
                postalCode: formData.get("postalCode"),
            };
            const paymentDetails = {
                cardNumber: formData.get("cardNumber"),
                expiryDate: formData.get("expiryDate"),
                cvc: formData.get("cvc"),
            };

            await checkout({ items, shippingDetails, paymentDetails });

            clearCart();
            alert("Order placed successfully! Thank you for shopping with Askhu Store.");
            router.push("/");
        } catch (error) {
            alert("Checkout failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <h1 className="text-2xl font-bold">Your cart is empty</h1>
                <Link href="/" className="text-orange-600 hover:text-orange-500 hover:underline">
                    Go back to shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <Link
                href="/cart"
                className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-8 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Cart
            </Link>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
                {/* Checkout Form */}
                <div>
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
                        <p className="text-gray-500 mt-2">Complete your order with secure payment.</p>
                    </div>

                    <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
                        {/* Shipping Details */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold flex items-center">
                                <Truck className="w-5 h-5 mr-2" /> Shipping Address
                            </h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input name="firstName" required type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input name="lastName" required type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Address</label>
                                    <input name="address" required type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">City</label>
                                    <input name="city" required type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                                    <input name="postalCode" required type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2" />
                                </div>
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="space-y-4 pt-6 border-t">
                            <h2 className="text-xl font-semibold flex items-center">
                                <CreditCard className="w-5 h-5 mr-2" /> Payment Method
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Card Number</label>
                                    <div className="relative mt-1 rounded-md shadow-sm">
                                        <input name="cardNumber" required type="text" placeholder="0000 0000 0000 0000" className="block w-full rounded-md border-gray-300 pl-3 pr-10 focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2" />
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                            <Lock className="h-4 w-4 text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                                        <input name="expiryDate" required type="text" placeholder="MM/YY" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">CVC</label>
                                        <input name="cvc" required type="text" placeholder="123" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-6 rounded-lg sticky top-24 h-fit border">
                    <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
                    <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {items.map((item) => (
                                <li key={item.id} className="flex py-6">
                                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                                    </div>
                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3 className="line-clamp-1 mr-2">{item.name}</h3>
                                                <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="text-gray-500">Qty {item.quantity}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-t border-gray-200 mt-6 pt-6 space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium">${total.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Shipping</span>
                            <span className="font-medium text-green-600">Free</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Taxes</span>
                            <span className="font-medium">${(total * 0.08).toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                            <span className="text-base font-bold text-gray-900">Total</span>
                            <span className="text-base font-bold text-gray-900">${(total * 1.08).toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        form="checkout-form"
                        disabled={isProcessing}
                        className="w-full mt-8 flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {isProcessing ? "Processing..." : `Pay $${(total * 1.08).toFixed(2)}`}
                    </button>
                    <p className="mt-4 text-center text-xs text-gray-500 flex items-center justify-center">
                        <Lock className="w-3 h-3 mr-1" /> Secure Encrypted Payment
                    </p>
                </div>
            </div>
        </div>
    );
}
