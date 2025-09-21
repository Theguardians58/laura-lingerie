import React from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        {/* Left Section: Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/new-arrivals" className="transition-colors hover:text-foreground">
            New Arrivals
          </Link>
          <Link href="/best-sellers" className="transition-colors hover:text-foreground">
            Best Sellers
          </Link>
          <Link href="/collections" className="transition-colors hover:text-foreground">
            Collections
          </Link>
        </nav>

        {/* Center Section: Logo */}
        <div className="flex md:absolute md:left-1/2 md:-translate-x-1/2">
          <Link href="/" className="text-xl font-bold tracking-wider">
            L'AURA
          </Link>
        </div>

        {/* Right Section: Icons */}
        <div className="flex items-center gap-4">
          <button className="hidden md:block text-muted-foreground transition-colors hover:text-foreground">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </button>
          <Link href="/account" className="text-muted-foreground transition-colors hover:text-foreground">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Link>
          <Link href="/cart" className="relative text-muted-foreground transition-colors hover:text-foreground">
            <ShoppingBag className="h-5 w-5" />
            {/* Cart count badge */}
            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              0
            </span>
            <span className="sr-only">Shopping Bag</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

          
