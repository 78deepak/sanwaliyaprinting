import mongoose, { Schema, Model } from "mongoose";
import { connectToDatabase } from "./mongodb";

const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;
const LOCKOUT_MS = LOCKOUT_MINUTES * 60 * 1000;

interface ILoginAttempt {
  ip: string;
  attempts: number;
  lockedUntil?: Date | null;
  createdAt: Date;
}

const LoginAttemptSchema = new Schema<ILoginAttempt>(
  {
    ip: { type: String, required: true, unique: true, index: true },
    attempts: { type: Number, default: 1 },
    lockedUntil: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now, expires: 900 }, // TTL index: 15 minutes
  },
  { timestamps: false }
);

const LoginAttempt: Model<ILoginAttempt> =
  mongoose.models.LoginAttempt ||
  mongoose.model<ILoginAttempt>("LoginAttempt", LoginAttemptSchema);

/**
 * In-memory fallback if MongoDB is temporarily connecting or unavailable
 */
const memoryAttempts = new Map<string, { attempts: number; lockedUntil?: number }>();

export interface RateLimitStatus {
  isLocked: boolean;
  remainingAttempts: number;
  retryAfterMinutes?: number;
}

/**
 * Check if the given client IP is currently rate-limited/locked.
 */
export async function checkLoginRateLimit(ip: string): Promise<RateLimitStatus> {
  const cleanIp = ip.trim() || "unknown-ip";

  // Check Upstash Redis if configured
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (upstashUrl && upstashToken) {
    try {
      const res = await fetch(`${upstashUrl}/get/ratelimit:${cleanIp}`, {
        headers: { Authorization: `Bearer ${upstashToken}` },
        cache: "no-store",
      });
      const data = await res.json();
      const count = Number(data.result) || 0;
      if (count >= MAX_ATTEMPTS) {
        return { isLocked: true, remainingAttempts: 0, retryAfterMinutes: LOCKOUT_MINUTES };
      }
      return { isLocked: false, remainingAttempts: Math.max(0, MAX_ATTEMPTS - count) };
    } catch (e) {
      console.warn("⚠️ Upstash check failed, falling back to database limiter:", e);
    }
  }

  // Try MongoDB
  try {
    await connectToDatabase();
    const record = await LoginAttempt.findOne({ ip: cleanIp });
    if (record) {
      const now = new Date();
      if (record.lockedUntil && record.lockedUntil > now) {
        const remainingMs = record.lockedUntil.getTime() - now.getTime();
        return {
          isLocked: true,
          remainingAttempts: 0,
          retryAfterMinutes: Math.max(1, Math.ceil(remainingMs / 60000)),
        };
      }
      return {
        isLocked: false,
        remainingAttempts: Math.max(0, MAX_ATTEMPTS - record.attempts),
      };
    }
  } catch {
    // In-memory fallback
    const mem = memoryAttempts.get(cleanIp);
    if (mem) {
      const now = Date.now();
      if (mem.lockedUntil && mem.lockedUntil > now) {
        return {
          isLocked: true,
          remainingAttempts: 0,
          retryAfterMinutes: Math.max(1, Math.ceil((mem.lockedUntil - now) / 60000)),
        };
      }
      return {
        isLocked: false,
        remainingAttempts: Math.max(0, MAX_ATTEMPTS - mem.attempts),
      };
    }
  }

  return { isLocked: false, remainingAttempts: MAX_ATTEMPTS };
}

/**
 * Increment failed attempts count and lock out if threshold is reached.
 */
export async function recordFailedLogin(ip: string): Promise<RateLimitStatus> {
  const cleanIp = ip.trim() || "unknown-ip";

  // Check Upstash Redis
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (upstashUrl && upstashToken) {
    try {
      const res = await fetch(`${upstashUrl}/incr/ratelimit:${cleanIp}`, {
        headers: { Authorization: `Bearer ${upstashToken}` },
        cache: "no-store",
      });
      const data = await res.json();
      const count = Number(data.result) || 1;
      if (count === 1) {
        await fetch(`${upstashUrl}/expire/ratelimit:${cleanIp}/900`, {
          headers: { Authorization: `Bearer ${upstashToken}` },
          cache: "no-store",
        });
      }
      const isLocked = count >= MAX_ATTEMPTS;
      return {
        isLocked,
        remainingAttempts: Math.max(0, MAX_ATTEMPTS - count),
        retryAfterMinutes: isLocked ? LOCKOUT_MINUTES : undefined,
      };
    } catch (e) {
      console.warn("⚠️ Upstash increment failed, falling back to database limiter:", e);
    }
  }

  // Try MongoDB
  try {
    await connectToDatabase();
    const record = await LoginAttempt.findOne({ ip: cleanIp });
    const now = new Date();

    if (!record) {
      await LoginAttempt.create({ ip: cleanIp, attempts: 1, createdAt: now });
      return { isLocked: false, remainingAttempts: MAX_ATTEMPTS - 1 };
    }

    record.attempts += 1;
    const isLocked = record.attempts >= MAX_ATTEMPTS;
    if (isLocked) {
      record.lockedUntil = new Date(now.getTime() + LOCKOUT_MS);
    }
    await record.save();

    return {
      isLocked,
      remainingAttempts: Math.max(0, MAX_ATTEMPTS - record.attempts),
      retryAfterMinutes: isLocked ? LOCKOUT_MINUTES : undefined,
    };
  } catch {
    // In-memory fallback
    const mem = memoryAttempts.get(cleanIp) || { attempts: 0 };
    mem.attempts += 1;
    const isLocked = mem.attempts >= MAX_ATTEMPTS;
    if (isLocked) {
      mem.lockedUntil = Date.now() + LOCKOUT_MS;
    }
    memoryAttempts.set(cleanIp, mem);

    return {
      isLocked,
      remainingAttempts: Math.max(0, MAX_ATTEMPTS - mem.attempts),
      retryAfterMinutes: isLocked ? LOCKOUT_MINUTES : undefined,
    };
  }
}

/**
 * Reset failed attempts upon successful login.
 */
export async function resetLoginRateLimit(ip: string): Promise<void> {
  const cleanIp = ip.trim() || "unknown-ip";

  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (upstashUrl && upstashToken) {
    try {
      await fetch(`${upstashUrl}/del/ratelimit:${cleanIp}`, {
        headers: { Authorization: `Bearer ${upstashToken}` },
        cache: "no-store",
      });
    } catch {
      // Ignore
    }
  }

  try {
    await connectToDatabase();
    await LoginAttempt.deleteOne({ ip: cleanIp });
  } catch {
    // Ignore
  }

  memoryAttempts.delete(cleanIp);
}
