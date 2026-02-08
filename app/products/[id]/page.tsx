
import Image from "next/image";
import Link from "next/link";

import { ArrowLeft, Star, ShoppingCart, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { Product } from "@/types";
import AddToCartButton from "@/components/ui/AddToCartButton";
import { getProduct } from "@/lib/api";
import { notFound } from "next/navigation";

// This is a Server Component
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            {/* Breadcrumb / Back Link */}
            <Link
                href="/"
                className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-8 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
            </Link>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                {/* Product Image Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 border">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover object-center"
                            priority
                        />
                    </div>
                    {/* Thumbnail Strip (Mock) */}
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="relative aspect-square rounded-md bg-gray-100 border cursor-pointer hover:border-orange-500 transition-colors overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={`Thumbnail ${i}`}
                                    fill
                                    className="object-cover opacity-70 hover:opacity-100 transition-opacity"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="flex flex-col space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            {product.name}
                        </h1>
                        <div className="flex items-center space-x-2">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"}`} />
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">
                                {product.rating} ({product.reviews} reviews)
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-baseline space-x-3">
                            <span className="text-3xl font-bold text-gray-900">
                                ${product.price}
                            </span>
                            <span className="text-lg text-gray-500 line-through">
                                ${(product.price * 1.2).toFixed(2)}
                            </span>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                Save 20%
                            </span>
                        </div>
                        <p className="text-base text-gray-700 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    <div className="border-t border-b py-6 space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Availability:</span>
                            <span className="font-medium text-green-600">In Stock</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Delivery:</span>
                            <span className="font-medium text-gray-900">Free Shipping</span>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-3 pt-2">
                        <AddToCartButton product={product} />
                        <button className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors">
                            Buy Now
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-6 text-center text-xs text-gray-500">
                        <div className="flex flex-col items-center space-y-2">
                            <Truck className="w-6 h-6 text-gray-400" />
                            <span>Free Delivery</span>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <RefreshCw className="w-6 h-6 text-gray-400" />
                            <span>30 Days Return</span>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <ShieldCheck className="w-6 h-6 text-gray-400" />
                            <span>2 Year Warranty</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
