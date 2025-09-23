"use client";

import Link from 'next/link';
import { Search, ShoppingCart, User, X } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { CartSheet } from './CartSheet';
import { Dropdown } from './ui/dropdown';

interface HeaderClientProps {
  isLoggedIn: boolean;
}

export function HeaderClient({ isLoggedIn }: HeaderClientProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };
  
  const categories = [
    { name: 'All', href: '/shop' },
    { name: 'Bras', href: '/shop/bras' },
    { name: 'Panties', href: '/shop/panties' },
    { name: 'Sleepwear', href: '/shop/sleepwear' },
  ];

  return (
    <>
      <div className="flex-1 flex items-center justify-center">
        <Link href="/" className="text-2xl font-bold tracking-widest text-primary hover:opacity-80 transition-opacity">
          L'AURA
        </Link>
      </div>

      <nav className="hidden md:flex items-center space-x-6">
        <Dropdown title="Shop" items={categories} />
      </nav>

      <div className="flex-1 flex items-center justify-end space-x-4">
        <button onClick={() => setIsSearchOpen(true)} className="hover:text-primary transition-colors">
          <Search size={20} />
          <span className="sr-only">Search</span>
        </button>
        
        {/* --- CHANGE START: The link now points to /account instead of /profile --- */}
        <Link href={isLoggedIn ? "/account" : "/login"} className="hover:text-primary transition-colors">
          <User size={20} />
          <span className="sr-only">{isLoggedIn ? "Account" : "Login"}</span>
        </Link>
        {/* --- CHANGE END --- */}

        <button onClick={() => setIsCartOpen(true)} className="relative hover:text-primary transition-colors">
          <ShoppingCart size={20} />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
          <span className="sr-only">Open cart</span>
        </button>
      </div>

      <CartSheet isOpen={isCartOpen} onOpenChange={setIsCartOpen} />

      {isSearchOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="relative w-full max-w-md p-4">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-4 right-4 text-foreground hover:text-primary transition-colors"
            >
              <X size={24} />
              <span className="sr-only">Close search</span>
            </button>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for..."
                className="w-full bg-transparent border-b-2 border-primary text-2xl text-center text-foreground placeholder-muted-foreground focus:outline-none focus:ring-0"
                autoFocus
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

     
