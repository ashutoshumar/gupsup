import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req:any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("middleware",token)
  
  const { pathname } = req.nextUrl;
  console.log("middle_pathname",pathname)
  // const headers = new Headers(req.headers);
  // headers.set("x-current-path", req.nextUrl.pathname);
  
  //Redirect if token is present and trying to access a protected route
  if (( pathname == '/login' || pathname=='/register' )&& token) {
    console.log("middleware login")
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
  if ((pathname == '/reset-password' ) && token) {
    console.log("wow",pathname)
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
  if ((pathname == '/forget-password' ) && token) {
    console.log("wow",pathname)
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
  

  // Redirect if no token is present and trying to access a protected route
  
  if ((pathname == '/write' ) && !token) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  
  if ( pathname.startsWith('/profile') && !token) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Role-based redirection example
  if (pathname.startsWith('/admin' )) {
    if (token?.role !== 'admin') {
      const url = req.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }
  if (pathname.startsWith('/dashboard' )) {
    if (token?.role !== 'admin') {
      const url = req.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  // Handle API routes that need authentication
  if (pathname.startsWith('/api/protected')) {
    if (!token) {
      return new NextResponse(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401 }
      );
    }
  }

  // If everything is fine, continue
  return NextResponse.next();
}

// Configure the matcher to apply middleware only to specific routes
export const config = {
    matcher: [
        '/login',
        '/register',
        '/forget-password',
        '/reset-password',
        '/write',
        '/dashboard', 
        '/profile/:path*', 
        '/admin/:path*', 
        '/api/protected/:path*',
      // "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
  };

