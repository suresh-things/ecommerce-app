
"use client";

import Link from 'next/link';
import { ShoppingCart, Search, User, Menu } from 'lucide-react';
import Logo from '../ui/Logo';
import { useCartStore } from '@/lib/store';
import { useUserStore } from '@/lib/userStore';

export default function Header() {
    const items = useCartStore((state) => state.items);
    const user = useUserStore((state) => state.user);
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center mx-auto px-4">
                {/* Mobile Menu */}
                <button className="mr-6 md:hidden">
                    <Menu className="h-6 w-6" />
                </button>

                {/* Logo */}
                <Link href="/" className="mr-6 flex items-center space-x-2 group">
                    <Logo />
                </Link>

                {/* Navigation - Desktop */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">Home</Link>
                    <Link href="/products" className="transition-colors hover:text-foreground/80 text-foreground/60">Products</Link>
                    <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">About</Link>
                </nav>

                {/* Search Bar - Center */}
                <div className="flex-1 md:px-8 px-4">
                    <div className="relative w-full max-w-sm ml-auto mr-auto md:ml-0 md:mr-0 md:max-w-md">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search products..."
                            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                </div>

                {/* Actions - Right */}
                <div className="flex items-center justify-end space-x-4">
                    <Link href="/cart" className="relative transition-colors hover:text-foreground/80 text-foreground">
                        <ShoppingCart className="h-5 w-5" />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                                {itemCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <Link href="/profile" className="hidden md:flex items-center transition-colors hover:text-foreground/80 text-foreground font-medium text-sm">
                            <span className="mr-2">Hi, {user.name.split(' ')[0]}</span>
                            <User className="h-5 w-5" />
                        </Link>
                    ) : (
                        <Link href="/login" className="hidden md:flex transition-colors hover:text-foreground/80 text-foreground">
                            <User className="h-5 w-5" />
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
