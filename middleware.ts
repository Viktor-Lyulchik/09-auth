import { NextRequest, NextResponse } from 'next/server';
import setCookie, { Cookie } from 'set-cookie-parser';
import { checkSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const sessionValid = !!accessToken;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );

  // Якщо немає accessToken, але є refreshToken → перевіряємо сесію
  if (!accessToken && refreshToken) {
    try {
      const data = await checkSession();
      const setCookieHeader = data.headers['set-cookie'];
      if (setCookieHeader) {
        const cookieArray = Array.isArray(setCookieHeader)
          ? setCookieHeader
          : [setCookieHeader];
        const parsedCookies: Cookie[] = setCookie.parse(cookieArray, {
          map: false,
        });
        const response = isPublicRoute
          ? NextResponse.redirect(new URL('/', request.url))
          : NextResponse.next();
        for (const c of parsedCookies) {
          response.cookies.set({
            name: c.name,
            value: c.value,
            path: c.path ?? '/',
            httpOnly: c.httpOnly,
            secure: c.secure,
            sameSite: c.sameSite?.toLowerCase() as
              | 'lax'
              | 'strict'
              | 'none'
              | undefined,
            expires: c.expires,
            maxAge: c.maxAge,
          });
        }
        return response;
      }
    } catch (e) {
      console.error('Session check failed', e);
    }
  }

  if (!sessionValid && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (sessionValid && isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // fallback для всіх інших маршрутів
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
