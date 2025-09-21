'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, ShoppingBag, User, X } from "lucide-react"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const router = useRouter()

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const query = formData.get("query") as string
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setIsSearchOpen(false)
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <div className="text-2xl font-bold tracking-wider text-primary">
            L'AURA
          </div>
          <nav className="hidden items-center space-x-8 md:flex">
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">New Arrivals</a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Bras</a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Panties</a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Sleepwear</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Open search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="My Account">
              <User className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Shopping Bag">
              <ShoppingBag className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-lg flex items-start justify-center animate-fade-in-down">
          <div className="w-full max-w-xl p-8 mt-20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Search for products</h2>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Close search"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="search"
                  name="query"
                  autoFocus
                  className="w-full bg-secondary border border-border h-14 rounded-full pl-6 pr-14 text-lg focus:ring-primary focus:border-primary"
                  placeholder="e.g. Silk Robe"
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full text-primary hover:bg-primary/10 transition-colors"
                  aria-label="Submit search"
                >
                  <Search className="h-6 w-6" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

    
