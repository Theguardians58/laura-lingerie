import Link from 'next/link'
import { createServerClient } from '../lib/supabase/server' // Using relative path
import { cookies } from 'next/headers'
import HeaderClient from './HeaderClient'

export default async function Header() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary tracking-tighter">
          L'AURA
        </Link>

        {/* Client components for nav and interactive elements */}
        <HeaderClient isLoggedIn={!!user} />

      </div>
    </header>
  )
}

        
