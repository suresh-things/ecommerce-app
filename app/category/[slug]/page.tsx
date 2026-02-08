
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Star, AlertCircle } from "lucide-react";
import { PRODUCTS } from "@/lib/mockData";

// Make the casing match logic more robust
function normalize(str: string) {
    return str.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Clean up the slug for display
    const categoryTitle = decodeURIComponent(slug).replace(/-/g, " ");

    // Filter products
    // We normalize both the product category and the slug to ensure matches
    // e.g. "Home & Garden" -> "homegarden" matches "home-garden" -> "homegarden"
    // But our mock data simply has specific categories.
    const products = PRODUCTS.filter(
        (product) => normalize(product.category) === normalize(categoryTitle) ||
            product.category.toLowerCase().includes(categoryTitle.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            {/* Breadcrumb */}
            <Link
                href="/products"
                className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-8 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Products
            </Link>

            <div className="flex flex-col space-y-4 mb-8">
                <h1 className="text-3xl font-bold tracking-tight capitalize">
                    {categoryTitle} Collection
                </h1>
                <p className="text-gray-500 max-w-2xl">
                    Explore our exclusive range of {categoryTitle} products.
                </p>
            </div>

            {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                        <AlertCircle className="w-8 h-8 text-orange-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">No products found</h2>
                    <p className="text-gray-500 mt-2 text-center max-w-sm">
                        We couldn't find any products in the <span className="font-medium text-black">"{categoryTitle}"</span> category.
                    </p>
                    <Link
                        href="/products"
                        className="mt-6 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                    >
                        View All Products
                    </Link>
                </div>
            ) : (
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
            )}
        </div>
    );
}
