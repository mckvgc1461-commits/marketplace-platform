import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  
  // Ana domain kontrolü
  const mainDomain = process.env.NEXT_PUBLIC_SITE_URL?.replace('https://', '') || 'ai-dukkan.onrender.com';
  
  // Subdomain çıkar
  const subdomain = hostname.replace(`.${mainDomain}`, '').replace(mainDomain, '');
  
  // Eğer subdomain varsa (örn: ahmet.ai-dukkan.com)
  if (subdomain && subdomain !== hostname && subdomain !== 'www') {
    // Subdomain'i header olarak ekle
    const url = request.nextUrl.clone();
    url.searchParams.set('subdomain', subdomain);
    
    const response = NextResponse.rewrite(url);
    response.headers.set('x-subdomain', subdomain);
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
