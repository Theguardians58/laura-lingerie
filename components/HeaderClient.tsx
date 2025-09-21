"use client"

import Link from 'next/link'
import { Search, ShoppingBag, User } from 'lucide-react'
import { useCart } from '../context/CartContext' // Using relative path
import CartSheet from './CartSheet'
import { useState } from 'react'

// Define the props that this component will accept
interface HeaderClientProps {
  isLoggedIn: boolean;
}

export default function HeaderClient({ isLoggedIn }: HeaderClientProps) {
  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Search state is now managed here
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <div className="flex flex-1 items-center justify-end space-x-4">
        {/* Main Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-muted-foreground">
          <Link href="/shop" className="transition-colors hover:text-primary">
            Shop
          </Link>
          <Link href="#" className="transition-colors hover:text-primary">
            Collections
          </Link>
          <Link href="#" className="transition-colors hover:text-primary">
            About
          </Link>
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search Button */}
          <button onClick={() => setIsSearchOpen(true)} className="text-muted-foreground transition-colors hover:text-primary">
            <Search className="h-5 w-5" />
          </button>

          {/* Account Link - This is now dynamic */}
          <Link href={isLoggedIn ? "/account" : "/login"} className="text-muted-foreground transition-colors hover:text-primary">
            <User className="h-5 w-5" />
          </Link>
          
          {/* Cart Trigger */}
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
      
      {/* Search Overlay */}
      {isSearchOpen && (
         <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
           <div className="fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4">
              <button onClick={() => setIsSearchOpen(false)} className="absolute right-6 top-6 text-muted-foreground">&times;</button>
              <h2 className="text-center text-xl font-semibold mb-4">Search for products</h2>
              <form action="/search" method="GET">
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

            
