"use client"

import Link from 'next/link'
import { Search, ShoppingBag, User } from 'lucide-react'
import { useCart } from '../context/CartContext'
import CartSheet from './CartSheet'
import { useState } from 'react'
import Dropdown from './ui/dropdown' // Import the new Dropdown component

interface HeaderClientProps {
  isLoggedIn: boolean;
}

export default function HeaderClient({ isLoggedIn }: HeaderClientProps) {
  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Define our categories that will appear in the dropdown
  const categories = [
    { href: "/shop/all", label: "All Products" },
    { href: "/shop/bras", label: "Bras" },
    { href: "/shop/panties", label: "Panties" },
    { href: "/shop/sleepwear", label: "Sleepwear" },
  ];

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('query') as string;
    if (query) {
      window.location.href = `/search?query=${encodeURIComponent(query)}`;
    }
  };

  return (
    <>
      <div className="flex flex-1 items-center justify-end space-x-4">
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-muted-foreground">
          {/* Replace the simple Shop link with our new Dropdown */}
          <Dropdown triggerText="Shop" items={categories} />
          <Link href="/collections" className="transition-colors hover:text-primary">
            Collections
          </Link>
          <Link href="/about" className="transition-colors hover:text-primary">
            About
          </Link>
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button onClick={() => setIsSearchOpen(true)} className="text-muted-foreground transition-colors hover:text-primary">
            <Search className="h-5 w-5" />
          </button>
          <Link href={isLoggedIn ? "/account" : "/login"} className="text-muted-foreground transition-colors hover:text-primary">
            <User className="h-5 w-5" />
          </Link>
          <CartSheet>
            <button className="relative text-muted-foreground transition-colors hover:text-primary">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </button>
          </CartSheet>
        </div>
      </div>
      
      {isSearchOpen && (
         <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)}>
           <div className="fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setIsSearchOpen(false)} className="absolute right-6 top-6 text-muted-foreground">&times;</button>
              <h2 className="text-center text-xl font-semibold mb-4">Search for products</h2>
              <form onSubmit={handleSearchSubmit}>
                  <input
                      name="query"
                      className="w-full bg-input px-4 py-2 rounded-md"
                      placeholder="e.g. Silk Bralette"
                  />
              </form>
           </div>
         </div>
      )}
    </>
  )
}

    
