import { createClient } from './utils/supabase/middleware'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)

  // Refresh session if expired - required for Server Components
  await supabase.auth.getUser()

  // Check if we're on auth pages
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()

  if (isAuthPage && user) {
    // Redirect to home page if already authenticated
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return Response.redirect(url)
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
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
