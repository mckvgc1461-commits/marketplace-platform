import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl;

  // Subdomain kontrolü
  const subdomain = hostname.split('.')[0];
  
  // Ana domain (ai-dukkan.vercel.app)
  if (subdomain === 'ai-dukkan' || subdomain === 'localhost:3000' || !hostname.includes('.')) {
    return NextResponse.next();
  }

  // Subdomain varsa (ahmet.ai-dukkan.vercel.app)
  // Store sayfasına yönlendir
  url.searchParams.set('subdomain', subdomain);
  url.pathname = `/store${url.pathname}`;
  
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
