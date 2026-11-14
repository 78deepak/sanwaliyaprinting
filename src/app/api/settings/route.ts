import { NextResponse } from "next/server";
import { getSiteSettingsAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

/**
 * GET /api/settings
 * Returns the current site settings including dynamic ownerName, businessName, contacts, etc.
 */
export async function GET() {
  try {
    const settings = await getSiteSettingsAction();
    return NextResponse.json(settings, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch settings";
    console.error("API /api/settings error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
