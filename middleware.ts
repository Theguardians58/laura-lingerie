import { NextResponse, type NextRequest } from 'next/server'
// UPDATE: Import and use the new function name
import { createMiddlewareClient } from './lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // UPDATE: Use the new function name
  const { supabase, response } = createMiddlewareClient(request)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // if user is signed in and the current path is /auth, redirect the user to /
  if (user && request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // if user is not signed in and the current path is not /auth, redirect the user to /auth
  if (!user && !request.nextUrl.pathname.startsWith('/auth')) {
    // You might want to allow access to the homepage even if not logged in
    if (request.nextUrl.pathname === '/') {
       return response;
    }
    //return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  
  // Protect admin routes (example)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    
    // You would add a role check here in a real application
    // const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    // if (profile?.role !== 'admin') {
    //   return new NextResponse('Unauthorized', { status: 403 })
    // }
  }


  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

  
