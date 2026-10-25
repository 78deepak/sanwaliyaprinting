import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const SESSION_COOKIE_NAME = "sanwaliya_admin_session";
const SESSION_EXPIRY = "7d";
const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

/**
 * Encode JWT signing secret into Uint8Array for jose.
 */
function getSecretKey(): Uint8Array {
  const secret =
    process.env.SESSION_SECRET ||
    "dev_session_secret_sanwaliya_press_2026_super_secure_key_32chars";

  if (secret.length < 32) {
    console.warn("⚠️ SESSION_SECRET is shorter than 32 characters. Consider using a stronger key.");
  }

  return new TextEncoder().encode(secret);
}

/**
 * Verify plaintext password against the stored bcrypt hash.
 */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH;

  if (!hash) {
    console.error("❌ ADMIN_PASSWORD_HASH is not configured in environment variables.");
    return false;
  }

  try {
    return await bcrypt.compare(password, hash);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("❌ Bcrypt password verification failed:", msg);
    return false;
  }
}

/**
 * Create a cryptographically signed JWT session token.
 */
export async function createAdminSessionToken(): Promise<string> {
  const secretKey = getSecretKey();

  return await new SignJWT({
    role: "admin",
    sub: "shopkeeper",
    iss: "sanwaliya-press",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_EXPIRY)
    .sign(secretKey);
}

/**
 * Verify a signed JWT session token (Edge & Node compatible).
 */
export async function verifyAdminSessionToken(
  token: string
): Promise<{ valid: boolean; payload?: Record<string, unknown> }> {
  if (!token) return { valid: false };

  try {
    const secretKey = getSecretKey();
    const { payload } = await jwtVerify(token, secretKey, {
      issuer: "sanwaliya-press",
    });

    if (payload.role !== "admin") {
      return { valid: false };
    }

    return { valid: true, payload: payload as Record<string, unknown> };
  } catch {
    return { valid: false };
  }
}

/**
 * Check if the current request has a valid admin session cookie.
 */
export async function getAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return false;

    const { valid } = await verifyAdminSessionToken(token);
    return valid;
  } catch {
    return false;
  }
}

/**
 * Guard helper to enforce admin authentication in Server Components & Server Actions.
 * Throws a Next.js redirect if unauthenticated.
 */
export async function requireAdmin(redirectTo = "/admin/login"): Promise<void> {
  const isAuthenticated = await getAdminSession();
  if (!isAuthenticated) {
    redirect(redirectTo);
  }
}

/**
 * Set HTTP-only, secure session cookie.
 */
export async function setAdminSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

/**
 * Clear session cookie on logout.
 */
export async function clearAdminSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
