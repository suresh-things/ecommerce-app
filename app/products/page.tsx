"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { getProducts } from "@/lib/api";
import { useEffect, useState } from "react";
import { Product } from "@/types";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts()
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to load products:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="flex flex-col space-y-4 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
                <p className="text-gray-500 max-w-2xl">
                    Browse our complete collection of premium products.
                    From electronics to furniture, we have everything you need.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="group relative rounded-lg border bg-white shadow-sm transition-all hover:shadow-lg overflow-hidden">
                        <Link href={`/products/${product.id}`} className="block relative aspect-square bg-gray-100 dark:bg-gray-800">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </Link>
                        <div className="p-4 space-y-2">
                            <Link href={`/products/${product.id}`}>
                                <h3 className="font-semibold text-lg leading-tight group-hover:text-orange-600 transition-colors line-clamp-1">
                                    {product.name}
                                </h3>
                            </Link>
                            <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm text-gray-600 font-medium">{product.rating}</span>
                                <span className="text-sm text-gray-400">({product.reviews})</span>
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <span className="font-bold text-xl">${product.price}</span>
                                <Link href={`/products/${product.id}`} className="rounded-full bg-black text-white p-2 hover:bg-gray-800 transition-colors">
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
