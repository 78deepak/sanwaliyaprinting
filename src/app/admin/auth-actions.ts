"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  verifyAdminPassword,
  createAdminSessionToken,
  setAdminSessionCookie,
  clearAdminSessionCookie,
} from "@/lib/auth";
import {
  checkLoginRateLimit,
  recordFailedLogin,
  resetLoginRateLimit,
} from "@/lib/rate-limit";

export interface LoginResult {
  success: boolean;
  error?: string;
  locked?: boolean;
  remainingAttempts?: number;
  retryAfterMinutes?: number;
}

/**
 * Get client IP address from headers.
 */
async function getClientIp(): Promise<string> {
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return headerList.get("x-real-ip") || "127.0.0.1";
}

/**
 * Check if current client IP is locked out.
 */
export async function checkLockoutStatusAction(): Promise<{
  isLocked: boolean;
  remainingAttempts: number;
  retryAfterMinutes?: number;
}> {
  const ip = await getClientIp();
  return await checkLoginRateLimit(ip);
}

/**
 * Authenticate admin with rate-limiting and HTTP-only session cookie.
 */
export async function loginAction(password: string): Promise<LoginResult> {
  const ip = await getClientIp();

  // 1. Rate-limit check
  const rateLimit = await checkLoginRateLimit(ip);
  if (rateLimit.isLocked) {
    return {
      success: false,
      locked: true,
      error: `Control desk is temporarily locked due to 5 consecutive failed attempts. Please retry in ${
        rateLimit.retryAfterMinutes || 15
      } minutes.`,
      retryAfterMinutes: rateLimit.retryAfterMinutes,
      remainingAttempts: 0,
    };
  }

  // 2. Validate input
  const trimmed = password?.trim();
  if (!trimmed) {
    return {
      success: false,
      error: "Please enter the master desk password.",
      remainingAttempts: rateLimit.remainingAttempts,
    };
  }

  // 3. Verify password against hash
  const isValid = await verifyAdminPassword(trimmed);

  if (!isValid) {
    const updatedStatus = await recordFailedLogin(ip);
    if (updatedStatus.isLocked) {
      return {
        success: false,
        locked: true,
        error: `Authentication failed: Incorrect password. Desk locked for ${
          updatedStatus.retryAfterMinutes || 15
        } minutes.`,
        remainingAttempts: 0,
        retryAfterMinutes: updatedStatus.retryAfterMinutes,
      };
    }

    return {
      success: false,
      error: `Authentication failed: Incorrect password. (${updatedStatus.remainingAttempts} attempts remaining)`,
      remainingAttempts: updatedStatus.remainingAttempts,
    };
  }

  // 4. Reset rate-limit on success
  await resetLoginRateLimit(ip);

  // 5. Create and set session cookie
  const token = await createAdminSessionToken();
  await setAdminSessionCookie(token);

  return { success: true };
}

/**
 * Terminate session and redirect to login screen.
 */
export async function logoutAction(): Promise<void> {
  await clearAdminSessionCookie();
  redirect("/admin/login");
}
