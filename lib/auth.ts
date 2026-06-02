import crypto from "crypto";

type JwtPayload = Record<string, string | number | boolean>;

function base64Url(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

function signPart(value: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(value).digest("base64url");
}

export function signJwt(payload: JwtPayload, expiresInSeconds = 60 * 60 * 24 * 7) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined.");
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

export function verifyJwt<T extends JwtPayload = JwtPayload>(token: string): T | null {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined.");
  }

  const [header, payload, signature] = token.split(".");
  if (!header || !payload || !signature) {
    return null;
  }

  const expected = signPart(`${header}.${payload}`, secret);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (signatureBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as T & { exp?: number };
  if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return decoded;
}
