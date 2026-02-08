
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            {/* Hero Section */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                        About Askhu Store
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        We are building the future of e-commerce, one pixel at a time.
                        Askhu Store isn't just a shop; it's a seamless shopping experience powered by cutting-edge technology.
                    </p>
                    <div className="flex flex-col space-y-2">
                        {[
                            "AI-Powered Recommendations",
                            "Lightning Fast Delivery",
                            "24/7 Customer Support",
                            "Secure Transactions"
                        ].map((item) => (
                            <div key={item} className="flex items-center space-x-2 text-gray-700">
                                <CheckCircle2 className="w-5 h-5 text-orange-500" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                    <Link
                        href="/products"
                        className="inline-flex items-center px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors mt-4"
                    >
                        Explore Our Collection
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>
                <div className="relative aspect-video md:aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500">
                    <Image
                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80"
                        alt="Our Team"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gray-50 py-16 rounded-3xl mb-24">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { label: "Happy Customers", value: "10k+" },
                        { label: "Products Sold", value: "50k+" },
                        { label: "Countries Served", value: "25+" },
                        { label: "Team Members", value: "100+" }
                    ].map((stat) => (
                        <div key={stat.label} className="space-y-2">
                            <div className="text-4xl font-bold text-orange-600">{stat.value}</div>
                            <div className="text-gray-500 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
