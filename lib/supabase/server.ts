// THE FIX: We import the function from the library but give it a unique alias
import { createServerClient as createSupabaseClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

// This is OUR function that we use in our pages. Its name is now unique.
export const createServerClient = () => {
  const cookieStore = cookies()

  // We call the aliased library function internally. No more name conflict.
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing sessions.
          }
        },
      },
    }
  )
}

            
