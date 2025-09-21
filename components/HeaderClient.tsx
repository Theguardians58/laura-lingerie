"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartSheet from "./CartSheet";

type HeaderClientProps = {
  isLoggedIn: boolean;
  userName?: string | null;
};

export default function HeaderClient({ isLoggedIn, userName }: HeaderClientProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { items } = useCart();

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left side: Logo and Navigation */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tighter text-primary">L'AURA</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                {/* This is the new link we added */}
                <Link href="/shop" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                  Shop
                </Link>
                {/* Add other links like 'Collections', 'About' here later */}
              </nav>
            </div>

            {/* Right side: Icons and User Info */}
            <div className="flex items-center gap-4">
              <button onClick={() => setIsSearchOpen(true)} className="p-2 text-foreground/80 hover:text-foreground transition-colors">
                <Search className="h-5 w-5" />
              </button>
              
              <CartSheet>
                <button className="relative p-2 text-foreground/80 hover:text-foreground transition-colors">
                  <ShoppingBag className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </CartSheet>

              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline text-sm text-foreground/80">Hi, {userName}</span>
                  <form action="/auth/sign-out" method="post">
                    <button type="submit" className="p-2 text-foreground/80 hover:text-foreground transition-colors">
                      Sign Out
                    </button>
                  </form>
                </div>
              ) : (
                <Link href="/login" className="p-2 text-foreground/80 hover:text-foreground transition-colors">
                  <User className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col items-center justify-center">
            <button onClick={() => setIsSearchOpen(false)} className="absolute top-4 right-4 text-foreground/80 hover:text-foreground">
              <X className="h-8 w-8" />
            </button>
            <form onSubmit={handleSearchSubmit} className="w-full max-w-xl">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for elegance..."
                className="w-full bg-transparent border-b-2 border-primary text-4xl text-center text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/80 transition-colors"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

    
