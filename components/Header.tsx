import Link from 'next/link';
import { ShoppingBag, User, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation Links - Left */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/products" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Shop All
          </Link>
          <Link href="/collections/new-arrivals" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            New Arrivals
          </Link>
          <Link href="/collections/best-sellers" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Best Sellers
          </Link>
        </nav>

        {/* Logo - Centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/" className="text-2xl font-bold tracking-widest text-primary uppercase">
            L'AURA
          </Link>
        </div>

        {/* Action Icons - Right */}
        <div className="flex items-center gap-4">
           <button className="text-foreground/80 hover:text-primary transition-colors">
            <Search className="h-6 w-6" />
            <span className="sr-only">Search</span>
          </button>
          <Link href="/account" className="text-foreground/80 hover:text-primary transition-colors">
            <User className="h-6 w-6" />
            <span className="sr-only">Account</span>
          </Link>
          <Link href="/cart" className="text-foreground/80 hover:text-primary transition-colors">
            <ShoppingBag className="h-6 w-6" />
            <span className="sr-only">Shopping Bag</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

        
