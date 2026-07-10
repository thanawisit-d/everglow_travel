import { NextResponse } from 'next/server';

const locales = ['th', 'en'];
const defaultLocale = 'th';

function getLocale(request) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;
  if (pathname.startsWith('/admin') || pathname === '/admin') return;
  const acceptLang = request.headers.get('accept-language') || '';
  const preferred = locales.find((l) => acceptLang.startsWith(l)) || defaultLocale;
  return preferred;
}

export async function proxy(request) {
  try {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/admin') || pathname === '/admin') {
      return NextResponse.next();
    }

    const locale = getLocale(request);
    if (locale) {
      const newUrl = new URL(`/${locale}${pathname}${request.nextUrl.search}`, request.url);
      return NextResponse.redirect(newUrl);
    }

    return NextResponse.next();
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!_next|api|images|favicon.ico).*)'],
};
