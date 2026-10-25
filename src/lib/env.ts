import { z } from "zod";

/**
 * Server-only environment variables schema.
 * Never import or expose these on the client side.
 */
const serverEnvSchema = z.object({
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required for database operations"),
  ADMIN_PASSWORD_HASH: z.string().optional(),
  SESSION_SECRET: z
    .string()
    .min(32, "SESSION_SECRET must be at least 32 characters long for secure JWT signing")
    .default("default_dev_session_secret_at_least_32_characters_long"),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  UPSTASH_REDIS_REST_URL: z.string().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
});

/**
 * Public client-accessible environment variables schema.
 */
const clientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().default("919876543210"),
  NEXT_PUBLIC_PHONE_NUMBER: z.string().default("+91 98765 43210"),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type ClientEnv = z.infer<typeof clientEnvSchema>;

/**
 * Safe server environment accessor with Zod validation.
 */
export function getServerEnv(): ServerEnv {
  if (typeof window !== "undefined") {
    throw new Error("FATAL: Attempted to access server environment variables from client-side code!");
  }

  const result = serverEnvSchema.safeParse(process.env);
  if (!result.success) {
    const errorDetails = result.error.issues
      .map((issue) => ` - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    console.error(`❌ Invalid Server Environment Variables:\n${errorDetails}`);
    throw new Error(`Invalid Server Environment Variables:\n${errorDetails}`);
  }

  return result.data;
}

/**
 * Safe client environment accessor.
 */
export function getClientEnv(): ClientEnv {
  const result = clientEnvSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    NEXT_PUBLIC_PHONE_NUMBER: process.env.NEXT_PUBLIC_PHONE_NUMBER,
  });

  if (!result.success) {
    console.warn("⚠️ Invalid public client environment variables, using defaults.");
    return {
      NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
      NEXT_PUBLIC_WHATSAPP_NUMBER: "919876543210",
      NEXT_PUBLIC_PHONE_NUMBER: "+91 98765 43210",
    };
  }

  return result.data;
}
