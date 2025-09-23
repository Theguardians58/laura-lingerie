import { createServerClient } from '../lib/supabase/server'
import { cookies } from 'next/headers'
// --- CHANGE: Import HeaderClient as a named export using curly braces ---
import { HeaderClient } from './HeaderClient'

export default async function Header() {
  // We no longer need to pass cookieStore to the function
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  // !!user is a shorthand to convert the user object (or null) to a boolean
  const isLoggedIn = !!user;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        {/* Pass the server-side login status to the client component */}
        <HeaderClient isLoggedIn={isLoggedIn} />
      </div>
    </header>
  )
}

          
