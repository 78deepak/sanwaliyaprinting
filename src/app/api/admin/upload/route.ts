import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Admin session required." },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No image file provided." },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, message: "Only image files (JPEG, PNG, WebP) are allowed." },
        { status: 400 }
      );
    }

    // 10MB max size limit
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "Image file exceeds 10MB limit." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadToCloudinary(buffer, {
      folder: "sanwaliya-press/products",
      tags: ["sanwaliya-press", "products"],
    });

    return NextResponse.json({
      success: true,
      url: result.secureUrl,
      publicId: result.publicId,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Cloudinary upload failed";
    console.error("Upload route handler error:", err);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
