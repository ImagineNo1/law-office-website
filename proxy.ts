import { NextResponse, type NextRequest } from "next/server";

const ADMIN_COOKIE = "admin_token";

function base64UrlToBytes(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return false;
  }

  const [header, payload, signature] = token.split(".");
  if (!header || !payload || !signature) {
    return false;
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );

  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    base64UrlToBytes(signature),
    new TextEncoder().encode(`${header}.${payload}`),
  );

  if (!valid) {
    return false;
  }

  const decoded = JSON.parse(
    new TextDecoder().decode(base64UrlToBytes(payload)),
  ) as { exp?: number };

  return !decoded.exp || decoded.exp >= Math.floor(Date.now() / 1000);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const valid = token ? await verifyToken(token) : false;

  if (valid) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
