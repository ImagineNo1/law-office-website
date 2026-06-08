import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connectDb } from "@/lib/db";
import { User } from "@/models/User";

export const ADMIN_COOKIE = "admin_token";

type JwtPayload = Record<string, string | number | boolean>;

export type AdminJwtPayload = JwtPayload & {
  userId: string;
  email: string;
  role: "super_admin" | "admin" | "user";
};

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined.");
  }

  return secret;
}

function base64Url(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

function signPart(value: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(value).digest("base64url");
}

export function signJwt(
  payload: JwtPayload,
  expiresInSeconds = 60 * 60 * 24 * 7,
) {
  const secret = getJwtSecret();
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "HS256", typ: "JWT" };
  const body = { ...payload, iat: now, exp: now + expiresInSeconds };
  const encodedHeader = base64Url(JSON.stringify(header));
  const encodedPayload = base64Url(JSON.stringify(body));
  const unsigned = `${encodedHeader}.${encodedPayload}`;
  const signature = signPart(unsigned, secret);

  return `${unsigned}.${signature}`;
}

export function verifyJwt<T extends JwtPayload = JwtPayload>(
  token: string,
): T | null {
  const secret = getJwtSecret();
  const [header, payload, signature] = token.split(".");

  if (!header || !payload || !signature) {
    return null;
  }

  const expected = signPart(`${header}.${payload}`, secret);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null;
  }

  const decoded = JSON.parse(
    Buffer.from(payload, "base64url").toString("utf8"),
  ) as T & { exp?: number };

  if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return decoded;
}

export async function setAdminCookie(token: string) {
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const payload = verifyJwt<AdminJwtPayload>(token);
  if (!payload?.userId) {
    return null;
  }

  await connectDb();
  const user = await User.findById(payload.userId)
    .select("fullName email role status")
    .lean();

  if (
    !user ||
    user.status !== "active" ||
    !["admin", "super_admin"].includes(user.role)
  ) {
    return null;
  }

  return {
    id: String(user._id),
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    status: user.status,
  };
}

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/admin/login");
  }

  return user;
}
