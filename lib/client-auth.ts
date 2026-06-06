import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signJwt, verifyJwt } from "@/lib/auth";

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

function canUseDemoSession() {
  return process.env.NODE_ENV !== "production";
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

  let value = "demo";
  try {
    value = signJwt(session, 60 * 60 * 24 * 7);
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      throw error;
    }
  }

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
  if (token === "demo" && canUseDemoSession()) return demoSession;

  try {
    const payload = verifyJwt<ClientJwtPayload>(token);
    if (payload?.type !== "client" || !payload.userId) return null;
    return {
      userId: payload.userId,
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      type: "client",
    };
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
