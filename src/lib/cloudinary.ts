import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

/**
 * Configure Cloudinary SDK with environment variables.
 */
function getCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary credentials missing in environment variables. Please check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  return cloudinary;
}

export interface CloudinaryUploadResult {
  url: string;
  secureUrl: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

/**
 * Upload a file Buffer or Base64 data URI to Cloudinary.
 * Automatically applies auto-format (f_auto) and auto-quality (q_auto).
 */
export async function uploadToCloudinary(
  fileBuffer: Buffer | string,
  options: {
    folder?: string;
    publicIdPrefix?: string;
    tags?: string[];
  } = {}
): Promise<CloudinaryUploadResult> {
  const client = getCloudinary();
  const folder = options.folder || "sanwaliya-press/products";

  return new Promise((resolve, reject) => {
    const uploadStream = client.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png", "webp", "avif"],
        transformation: [
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
        tags: options.tags || ["sanwaliya-press", "catalogue"],
      },
      (error, result?: UploadApiResponse) => {
        if (error || !result) {
          reject(error || new Error("Cloudinary upload failed with empty response"));
        } else {
          resolve({
            url: result.url,
            secureUrl: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
          });
        }
      }
    );

    if (Buffer.isBuffer(fileBuffer)) {
      uploadStream.end(fileBuffer);
    } else if (typeof fileBuffer === "string" && fileBuffer.startsWith("data:")) {
      // Base64 data URI upload
      client.uploader
        .upload(fileBuffer, {
          folder,
          resource_type: "image",
          transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
          tags: options.tags || ["sanwaliya-press", "catalogue"],
        })
        .then((result) => {
          resolve({
            url: result.url,
            secureUrl: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
          });
        })
        .catch(reject);
    } else {
      reject(new Error("Invalid file buffer or data format"));
    }
  });
}

/**
 * Permanently delete an image asset from Cloudinary by its publicId.
 */
export async function deleteFromCloudinary(publicId: string): Promise<{ success: boolean; result?: string }> {
  if (!publicId) return { success: false, result: "no_public_id" };

  try {
    const client = getCloudinary();
    const result = await client.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });
    return { success: result.result === "ok", result: result.result };
  } catch (error) {
    console.error("Cloudinary deletion failed for publicId:", publicId, error);
    return { success: false, result: (error as Error).message };
  }
}

/**
 * Generate an optimized Cloudinary delivery URL with optional transformations.
 */
export function getOptimizedCloudinaryUrl(
  publicIdOrUrl: string,
  options: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string | number;
    format?: string;
  } = {}
): string {
  // If it's already a full URL that's not Cloudinary, return as-is
  if (publicIdOrUrl.startsWith("http") && !publicIdOrUrl.includes("res.cloudinary.com")) {
    return publicIdOrUrl;
  }

  const { width, height, crop = "limit", quality = "auto", format = "auto" } = options;

  try {
    const client = getCloudinary();
    // If it's a full Cloudinary URL, extract the public_id or insert transformations
    if (publicIdOrUrl.includes("res.cloudinary.com")) {
      const parts = publicIdOrUrl.split("/upload/");
      if (parts.length === 2) {
        const transformString = `f_${format},q_${quality}${width ? `,w_${width}` : ""}${height ? `,h_${height}` : ""}${crop ? `,c_${crop}` : ""}`;
        return `${parts[0]}/upload/${transformString}/${parts[1]}`;
      }
      return publicIdOrUrl;
    }

    return client.url(publicIdOrUrl, {
      transformation: [
        { width, height, crop, quality, fetch_format: format },
      ],
      secure: true,
    });
  } catch {
    return publicIdOrUrl;
  }
}
