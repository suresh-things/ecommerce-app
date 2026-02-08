"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { getProducts } from "@/lib/api";
import { useEffect, useState } from "react";
import { Product } from "@/types";

export default function Home() {
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

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=1600"
            alt="Shopping Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Welcome to the Future of Shopping
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                Discover millions of products with AI-powered recommendations and ultra-fast delivery.
              </p>
            </div>
            <div className="space-x-4">
              <Link
                className="inline-flex h-11 items-center justify-center rounded-md bg-orange-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                href="/products"
              >
                Shop Now
              </Link>
              <Link
                className="inline-flex h-11 items-center justify-center rounded-md border border-gray-700 bg-black/50 px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-800 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 backbone-blur"
                href="/about"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Shop by Category</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Explore our wide range of collections curated just for you.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8 md:grid-cols-4 lg:grid-cols-4">
            {["Electronics", "Wearables", "Furniture", "Cameras"].map((category) => (
              <div key={category} className="group relative flex flex-col items-center justify-center space-y-2 rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-gray-950">
                <h3 className="text-xl font-bold">{category}</h3>
                <Link href={`/category/${category.toLowerCase()}`} className="text-sm text-orange-500 hover:underline">
                  Browse
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tighter">Featured Products</h2>
            <Link href="/products" className="flex items-center text-orange-500 hover:underline font-medium">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
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
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-orange-500 text-white">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Ready to start shopping?
          </h2>
          <p className="mx-auto max-w-[600px] text-orange-100 md:text-xl mb-8">
            Join millions of happy customers and experience standard shipping on all orders.
          </p>
          <Link
            href="/signup"
            className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-orange-600 shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Create an Account
          </Link>
        </div>
      </section>
    </div>
  );
}
