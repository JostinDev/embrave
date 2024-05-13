import { NextResponse } from 'next/server';
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware((auth, request) => {
  const isSignedIn = Boolean(auth().userId);

  if (request.nextUrl.pathname === '/' && !isSignedIn) {
    return NextResponse.rewrite(new URL('/home', request.url));
  }
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', // Don't run middleware on static files
    '/', // Run middleware on index page
    '/(api|trpc)(.*)',
  ], // Run middleware on API routes
};
