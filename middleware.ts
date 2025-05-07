// middleware.ts
import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, search, searchParams } = request.nextUrl;

  console.log(`Full URL: ${request.url}`);
  console.log(`Pathname: ${pathname}`);
  console.log(`Search: ${search}`);
  console.log("SearchParams:", Array.from(searchParams.entries()));

  let rewritePathTarget: string | null = null;
  let useBuggyMethod = false;

  if (pathname.startsWith("/test-rewrite/buggy")) {
    rewritePathTarget = "/target-page";
    useBuggyMethod = true;
    console.log("---- BUGGY REWRITE PATH DETECTED ----");
  } else if (pathname.startsWith("/test-rewrite/fixed")) {
    rewritePathTarget = "/target-page";
    useBuggyMethod = false;
    console.log("---- FIXED REWRITE PATH DETECTED ----");
  }

  if (rewritePathTarget) {
    request.nextUrl.pathname = rewritePathTarget;

    if (useBuggyMethod) {
      console.log("Search params unchanged", request.nextUrl.search);
    } else {
      let customSearchString = "";
      const paramsArray = [];
      for (const [key, value] of searchParams.entries()) {
        paramsArray.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        );
      }
      if (paramsArray.length > 0) {
        customSearchString = `?${paramsArray.join("&")}`;
      }
      request.nextUrl.search = customSearchString;
      console.log(
        "Manually built query string with %20 for spaces in keys",
        request.nextUrl.search
      );
    }

    console.log("Url for rewrite", request.nextUrl.toString());
    return NextResponse.rewrite(request.nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/test-rewrite/buggy/:path*",
    "/test-rewrite/fixed/:path*",
    "/target-page",
  ],
};
