import React from 'react';

interface LogoProps {
    className?: string;
    responsive?: boolean;
}

export default function Logo({ className = "", responsive = true }: LogoProps) {
    return (
        <div className={`flex items-center gap-2 group cursor-pointer ${className}`}>
            {/* Icon Container */}
            <div className="relative w-8 h-8 flex items-center justify-center">
                {/* Background Blob with Gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-xl rotate-3 group-hover:rotate-6 transition-transform duration-300 shadow-lg shadow-purple-500/20"></div>

                {/* SVG Icon - Abstract A/Shopping Bag */}
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10 w-5 h-5 text-white transform group-hover:scale-110 transition-transform duration-300"
                >
                    <path
                        d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 9H19L20 21H4L5 9Z"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M10 14L12 16L14 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                </svg>
            </div>

            {/* Text Logo */}
            <div className={`${responsive ? 'hidden md:flex' : 'flex'} flex-col`}>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-900 to-purple-900 dark:from-indigo-100 dark:to-purple-100 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:to-pink-600 transition-all duration-300">
                    Askhu
                </span>
                <span className="text-[0.6rem] font-medium tracking-widest uppercase text-muted-foreground -mt-1 group-hover:text-primary transition-colors duration-300">
                    Store
                </span>
            </div>
        </div>
    );
}
