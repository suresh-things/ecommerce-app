
import Link from 'next/link';
import Logo from '@/components/ui/Logo';

export default function Footer() {
    return (
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container px-4 py-8 mx-auto md:px-6 md:py-12">
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                    {/* Brand */}
                    <div className="flex flex-col gap-2">
                        <Link className="flex items-center gap-2 group" href="#">
                            <Logo />
                        </Link>
                        <p className="text-sm text-balance leading-relaxed text-muted-foreground">
                            The future of online shopping. Built with modern web technologies.
                        </p>
                    </div>


                    {/* Links */}
                    <div className="grid gap-2">
                        <h3 className="text-sm font-semibold">Categories</h3>
                        <Link className="text-sm text-muted-foreground hover:underline" href="/category/electronics">
                            Electronics
                        </Link>
                        <Link className="text-sm text-muted-foreground hover:underline" href="/category/wearables">
                            Wearables
                        </Link>
                        <Link className="text-sm text-muted-foreground hover:underline" href="/category/furniture">
                            Furniture
                        </Link>
                        <Link className="text-sm text-muted-foreground hover:underline" href="/category/cameras">
                            Cameras
                        </Link>
                    </div>

                    <div className="grid gap-2">
                        <h3 className="text-sm font-semibold">Company</h3>
                        <Link className="text-sm text-muted-foreground hover:underline" href="/about">
                            About Us
                        </Link>
                        <Link className="text-sm text-muted-foreground hover:underline" href="/products">
                            All Products
                        </Link>
                        <Link className="text-sm text-muted-foreground hover:underline" href="#">
                            Careers
                        </Link>
                    </div>

                    <div className="grid gap-2">
                        <h3 className="text-sm font-semibold">Legal</h3>
                        <Link className="text-sm text-muted-foreground hover:underline" href="#">
                            Privacy Policy
                        </Link>
                        <Link className="text-sm text-muted-foreground hover:underline" href="#">
                            Terms of Service
                        </Link>
                        <Link className="text-sm text-muted-foreground hover:underline" href="#">
                            Cookie Policy
                        </Link>
                    </div>

                    {/* Newsletter */}
                    <div className="grid gap-2">
                        <h3 className="text-sm font-semibold">Newsletter</h3>
                        <p className="text-sm text-muted-foreground">
                            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                        </p>
                        <form className="flex gap-2">
                            <input
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Enter your email"
                                type="email"
                            />
                            <button className="h-9 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                                Join
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {/* Copyright */}
            <div className="border-t py-6 md:py-8">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row mx-auto px-4">
                    <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                        © 2026 Askhu Store. All rights reserved. Built by Antigravity using Next.js 14 and AI.
                    </p>
                </div>
            </div>
        </footer>
    );
}
