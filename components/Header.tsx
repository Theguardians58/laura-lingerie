import { createServerClient } from '../lib/supabase/server'
import { User, ShoppingBag } from 'lucide-react'
import HeaderClient from './HeaderClient' // We'll use a client component for interactivity
import { signOut } from '../app/auth/actions'

export default async function Header() {
  const supabase = createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <a href="/" className="text-2xl font-bold tracking-wider text-primary">
          L'AURA
        </a>
        <nav className="hidden items-center space-x-8 md:flex">
          <a href="#" className="text-sm font-medium transition-colors hover:text-primary">New Arrivals</a>
          <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Bras</a>
          <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Panties</a>
          <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Sleepwear</a>
        </nav>
        <div className="flex items-center space-x-4">
          
          {/* HeaderClient handles the client-side search bar state */}
          <HeaderClient />

          {/* This is the new dynamic part */}
          {user ? (
            <div className="flex items-center space-x-2 md:space-x-4">
              <span className="text-sm hidden sm:inline text-muted-foreground">Hi, {user.email?.split('@')[0]}</span>
              <form action={signOut}>
                <button
                  type="submit"
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                  aria-label="Sign Out"
                >
                  <User className="h-5 w-5" />
                </button>
              </form>
            </div>
          ) : (
            <a href="/login" className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Login or Sign Up">
              <User className="h-5 w-5" />
            </a>
          )}
          
          <button className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Shopping Bag">
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}

                  
