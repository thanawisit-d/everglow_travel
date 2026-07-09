import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { updateSession } from '@/lib/supabase/middleware';

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

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') || pathname === '/admin') {
    if (pathname !== '/admin/login') {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
          cookies: {
            getAll: () => request.cookies.getAll(),
            setAll: () => {},
          },
        }
      );
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }
    return updateSession(request);
  }

  const locale = getLocale(request);
  if (locale) {
    const newUrl = new URL(`/${locale}${pathname}${request.nextUrl.search}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  return updateSession(request);
}

export const config = {
  matcher: ['/((?!_next|api|images|favicon.ico).*)'],
};
