import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const CLIENT_SESSION_COOKIE = "client_session";

export type ClientSession = {
  userId: string;
  fullName: string;
  email?: string;
  phone?: string;
  type: "client";
};

type ClientJwtPayload = Record<string, string | number | boolean> & ClientSession;

const demoSession: ClientSession = {
  userId: "demo-client",
  fullName: "علی محمدی",
  email: "demo@vakilyar.local",
  phone: "09120000000",
  type: "client",
};

function base64Url(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

function signPart(value: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(value).digest("base64url");
}

function getClientSessionSecret() {
  return process.env.CLIENT_SESSION_SECRET || process.env.JWT_SECRET || null;
}

function signClientJwt(payload: ClientJwtPayload, expiresInSeconds = 60 * 60 * 24 * 7) {
  const secret = getClientSessionSecret();

  if (!secret) {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "HS256", typ: "JWT" };
  const body = { ...payload, iat: now, exp: now + expiresInSeconds };
  const encodedHeader = base64Url(JSON.stringify(header));
  const encodedPayload = base64Url(JSON.stringify(body));
  const unsigned = `${encodedHeader}.${encodedPayload}`;
  const signature = signPart(unsigned, secret);

  return `${unsigned}.${signature}`;
}

function verifyClientJwt(token: string) {
  const secret = getClientSessionSecret();

  if (!secret) {
    return null;
  }

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
  ) as ClientJwtPayload & { exp?: number };

  if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return decoded;
}

function isDemoSessionToken(token: string) {
  return token === "demo";
}

function sessionFromPayload(payload: ClientJwtPayload | ClientSession) {
  if (payload.type !== "client" || !payload.userId) return null;
  return {
    userId: payload.userId,
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    type: "client" as const,
  };
}

export async function createClientSession(input: {
  fullName?: string;
  email?: string;
  phone?: string;
}) {
  const cookieStore = await cookies();
  const session: ClientSession = {
    ...demoSession,
    fullName: input.fullName?.trim() || demoSession.fullName,
    email: input.email?.trim() || demoSession.email,
    phone: input.phone?.trim() || demoSession.phone,
  };

  const value = signClientJwt(session) ?? "demo";

  cookieStore.set(CLIENT_SESSION_COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getClientSession(): Promise<ClientSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(CLIENT_SESSION_COOKIE)?.value;

  if (!token) return null;
  if (isDemoSessionToken(token)) return demoSession;

  try {
    const payload = verifyClientJwt(token);
    return payload ? sessionFromPayload(payload) : null;
  } catch {
    return null;
  }
}

export async function requireClientSession(nextPath = "/dashboard") {
  const session = await getClientSession();
  if (!session) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }
  return session;
}
