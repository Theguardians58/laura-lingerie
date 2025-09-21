"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../context/CartContext' // 1. Import the useCart hook
import { CartSheet } from './CartSheet' // 2. Import the CartSheet component

export default function HeaderClient() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false) // 3. State for the cart panel
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const { cart } = useCart() // 4. Get the cart state

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
    }
  }

  // Calculate total items in the cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <div className="flex items-center space-x-4">
        {/* Search Icon */}
        <button onClick={() => setIsSearchOpen(true)} className="hover:text-primary transition-colors" aria-label="Open search">
          <Search />
        </button>
        
        {/* Cart Icon */}
        <button onClick={() => setIsCartOpen(true)} className="hover:text-primary transition-colors relative" aria-label="Open cart">
          <ShoppingBag />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Cart Sheet (Slide-out panel) */}
      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center animate-in fade-in-0">
          <button onClick={() => setIsSearchOpen(false)} className="absolute top-8 right-8 text-foreground hover:text-primary" aria-label="Close search">
            <X size={32} />
          </button>
          <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl px-4">
            <input
              type="search"
              name="q"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for your desires..."
              className="w-full bg-transparent border-b-2 border-primary text-4xl text-center text-foreground placeholder:text-muted-foreground focus:outline-none"
              autoFocus
            />
          </form>
        </div>
      )}
    </>
  )
}

                              
