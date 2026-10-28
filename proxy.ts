import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// On a visitor's first page load, picks their default currency from their country
// (Canada → CAD, everywhere else → USD) and stores it in the "currency" cookie,
// which lib/currency.ts reads in the browser. Pages stay cached: nothing here
// changes what the server renders.
export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Only Vercel adds this header, so local dev keeps the CAD default.
  const country = request.headers.get("x-vercel-ip-country");
  if (country && !request.cookies.has("currency")) {
    response.cookies.set("currency", country === "CA" ? "cad" : "usd", {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return response;
}

// Skip API routes, build assets, and files like images and robots.txt.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
