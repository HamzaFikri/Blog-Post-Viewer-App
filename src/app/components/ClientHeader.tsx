"use client";
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the MobileMenu component (client-side only)
const MobileMenu = dynamic(() => import('./MobileMenu'), { ssr: false });

/**
 * ClientHeader component
 * Renders the responsive navigation bar for the blog, including:
 * - Site name
 * - Navigation links (desktop/tablet)
 * - Theme toggle (desktop/tablet)
 * - Hamburger menu (mobile)
 * - Mobile menu overlay (mobile)
 */
export default function ClientHeader() {
  // State to control whether the mobile menu is open
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    // Header bar (fixed on iPad Pro, responsive)
    <header className="flex justify-center pt-[30px] px-4 w-full bg-[#090D1F] z-20">
      <nav className="flex flex-row items-center justify-between w-full max-w-[1216px] h-[60px] mx-auto px-4">
        {/* Site name (always visible, left-aligned) */}
        <span className="text-[20px] font-semibold text-white">Your Name</span>

        {/* Navigation links (centered, hidden on mobile) */}
        <div className="hidden md:flex flex-row gap-8 mx-8">
          <Link href="/" className="text-white text-[16px] font-medium no-underline transition-colors duration-200 hover:text-[#6941C6]">Blog</Link>
          <Link href="/projects" className="text-white text-[16px] font-medium no-underline transition-colors duration-200 hover:text-[#6941C6]">Projects</Link>
          <Link href="/about" className="text-white text-[16px] font-medium no-underline transition-colors duration-200 hover:text-[#6941C6]">About</Link>
          <Link href="/newsletter" className="text-white text-[16px] font-medium no-underline transition-colors duration-200 hover:text-[#6941C6]">Newsletter</Link>
        </div>

        {/* Theme toggle (right, hidden on mobile) */}
        <div className="hidden md:inline-flex">
          <ThemeToggle />
        </div>

        {/* Hamburger menu button (right, only on mobile) */}
        <button
          className="flex md:hidden w-8 h-8 justify-center items-center bg-none border-none cursor-pointer ml-auto"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <span className="w-6 h-6 block bg-none border-none">
            {/* Hamburger icon SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="4" width="24" height="2" rx="1" fill="white"/>
              <rect y="11" width="24" height="2" rx="1" fill="white"/>
              <rect y="18" width="24" height="2" rx="1" fill="white"/>
            </svg>
          </span>
        </button>
      </nav>
      {/* Mobile menu overlay (full screen, only when menuOpen is true) */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
} 