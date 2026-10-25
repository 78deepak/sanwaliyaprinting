import { NextResponse } from "next/server";
import { getSearchIndex } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await getSearchIndex();
    return NextResponse.json({ products });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error fetching search index";
    return NextResponse.json({ products: [], error: msg }, { status: 500 });
  }
}
