import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Check for language_index cookie
  let languageIndex = request.cookies.get("language_index")?.value;

  // 2. If no cookie, check Accept-Language header (optional, simple logic)
  if (!languageIndex) {
    const acceptLanguage = request.headers.get("accept-language");

    if (acceptLanguage) {
      if (acceptLanguage.startsWith("ru")) {
        languageIndex = "1";
      } else if (acceptLanguage.startsWith("kk")) {
        languageIndex = "2";
      } else {
        languageIndex = "0";
      }
    } else {
      languageIndex = "0";
    }
  }

  // 3. Set the header for Server Components
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-language-index", languageIndex);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ],
};
