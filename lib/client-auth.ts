import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connectDb } from "@/lib/db";
import { ClientUser } from "@/models/ClientUser";

export const CLIENT_SESSION_COOKIE = "client_session";

export type ClientSession = {
  userId: string;
  role: "client" | "user";
  type: "client";
  exp: number;
};

export type CurrentClient = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  role: "client" | "user";
  status: "active" | "blocked";
  nationalCode: string;
  avatar: string;
};

type ClientJwtPayload = ClientSession &
  Record<string, string | number | boolean>;

function base64Url(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

function signPart(value: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(value).digest("base64url");
}

function getClientSessionSecret() {
  const secret = process.env.CLIENT_SESSION_SECRET || process.env.JWT_SECRET;
  if (secret) return secret;
  return process.env.NODE_ENV === "production"
    ? null
    : "development-client-session-secret";
}

function signClientJwt(
  payload: Omit<ClientSession, "exp">,
  expiresInSeconds = 60 * 60 * 24 * 7,
) {
  const secret = getClientSessionSecret();
  if (!secret) {
    throw new Error(
      "CLIENT_SESSION_SECRET or JWT_SECRET is required in production.",
    );
  }

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "HS256", typ: "JWT" };
  const body: ClientJwtPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  };
  const encodedHeader = base64Url(JSON.stringify(header));
  const encodedPayload = base64Url(JSON.stringify(body));
  const unsigned = `${encodedHeader}.${encodedPayload}`;
  const signature = signPart(unsigned, secret);

  return `${unsigned}.${signature}`;
}

function verifyClientJwt(token: string) {
  const secret = getClientSessionSecret();
  if (!secret) return null;

  const [header, payload, signature] = token.split(".");
  if (!header || !payload || !signature) return null;

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
  ) as ClientJwtPayload;
  if (decoded.exp < Math.floor(Date.now() / 1000)) return null;
  if (decoded.type !== "client" || decoded.role !== "client" || !decoded.userId)
    return null;

  return decoded;
}

function canUseDemoClient() {
  return (
    process.env.NODE_ENV !== "production" &&
    process.env.ALLOW_DEMO_CLIENT === "true"
  );
}

export function safeClientNext(
  value: FormDataEntryValue | string | null | undefined,
) {
  const next = typeof value === "string" && value ? value : "/dashboard";
  if (
    !next.startsWith("/") ||
    next.startsWith("//") ||
    next.startsWith("/admin")
  ) {
    return "/dashboard";
  }
  return next;
}

export async function createClientSession(userId: string) {
  const cookieStore = await cookies();
  const value = signClientJwt({
    userId,
    role: "client",
    type: "client",
  });

  cookieStore.set(CLIENT_SESSION_COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearClientSession() {
  const cookieStore = await cookies();
  cookieStore.set(CLIENT_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

async function getClientSession(): Promise<ClientSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(CLIENT_SESSION_COOKIE)?.value;

  if (!token) return null;
  if (token === "demo" && canUseDemoClient()) {
    return {
      userId: "demo-client",
      role: "client",
      type: "client",
      exp: Math.floor(Date.now() / 1000) + 3600,
    };
  }

  try {
    return verifyClientJwt(token);
  } catch {
    return null;
  }
}

export async function getCurrentClient(): Promise<CurrentClient | null> {
  const session = await getClientSession();
  if (!session) return null;

  if (session.userId === "demo-client" && canUseDemoClient()) {
    return {
      id: "demo-client",
      fullName: "علی محمدی",
      phone: "09123456789",
      email: "client@example.com",
      role: "client",
      status: "active",
      nationalCode: "",
      avatar: "",
    };
  }

  await connectDb();
  const user = await ClientUser.findById(session.userId).lean<{
    _id: unknown;
    fullName: string;
    phone: string;
    email?: string;
    role: "client" | "user";
    status: "active" | "blocked";
    nationalCode?: string;
    avatar?: string;
  }>();

  if (
    !user ||
    !["client", "user"].includes(user.role) ||
    user.status !== "active"
  )
    return null;

  return {
    id: String(user._id),
    fullName: user.fullName,
    phone: user.phone,
    email: user.email ?? "",
    role: "client",
    status: user.status,
    nationalCode: user.nationalCode ?? "",
    avatar: user.avatar ?? "",
  };
}

export async function requireClient(nextPath = "/dashboard") {
  const client = await getCurrentClient();
  if (!client) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }
  return client;
}

export const requireClientSession = requireClient;
