import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Admin session required." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const publicId = body?.publicId;

    if (!publicId || typeof publicId !== "string") {
      return NextResponse.json(
        { success: false, message: "publicId is required." },
        { status: 400 }
      );
    }

    const res = await deleteFromCloudinary(publicId);
    return NextResponse.json({ success: res.success, result: res.result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Cloudinary deletion failed";
    console.error("Delete image route handler error:", err);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
