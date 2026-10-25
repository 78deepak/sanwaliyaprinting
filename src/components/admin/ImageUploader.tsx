"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  UploadCloud,
  Star,
  Trash2,
  ArrowUp,
  ArrowDown,
  Loader2,
  AlertCircle,
  Cloud,
} from "lucide-react";

export interface UploadedImage {
  id?: string;
  url: string;
  alt: string;
  caption?: string;
  isPrimary?: boolean;
  publicId?: string;
  width?: number;
  height?: number;
  order?: number;
}

interface ImageUploaderProps {
  images: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  maxImages?: number;
  className?: string;
}

interface UploadingFile {
  id: string;
  name: string;
  previewUrl: string;
}

export function ImageUploader({
  images,
  onChange,
  maxImages = 8,
  className = "",
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Handle files selection and upload directly to Cloudinary
  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploadError(null);
    const validFiles: File[] = [];

    Array.from(files).forEach((file) => {
      if (images.length + validFiles.length >= maxImages) return;
      if (!file.type.startsWith("image/")) {
        setUploadError("Only image files (JPG, PNG, WebP, AVIF) are supported.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setUploadError(`"${file.name}" exceeds 10MB size limit.`);
        return;
      }
      validFiles.push(file);
    });

    if (validFiles.length === 0) return;

    // Create optimistic uploading previews
    const newUploading: UploadingFile[] = validFiles.map((f, i) => ({
      id: `uploading-${Date.now()}-${i}`,
      name: f.name,
      previewUrl: URL.createObjectURL(f),
    }));

    setUploadingFiles((prev) => [...prev, ...newUploading]);

    const uploadedResults: UploadedImage[] = [];

    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      const previewId = newUploading[i].id;
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || `Upload failed for ${file.name}`);
        }

        const isFirst = images.length === 0 && uploadedResults.length === 0;

        uploadedResults.push({
          id: data.publicId,
          publicId: data.publicId,
          url: data.url,
          alt: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
          isPrimary: isFirst,
          width: data.width,
          height: data.height,
        });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to upload image";
        console.error("Cloudinary upload failed:", err);
        setUploadError(msg);
      } finally {
        // Revoke local object URL and remove from uploading list
        URL.revokeObjectURL(newUploading[i].previewUrl);
        setUploadingFiles((prev) => prev.filter((p) => p.id !== previewId));
      }
    }

    if (uploadedResults.length > 0) {
      onChange([...images, ...uploadedResults]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  // Set selected image as main hero
  const handleSetPrimary = (index: number) => {
    const updated = images.map((img, i) => ({
      ...img,
      isPrimary: i === index,
    }));
    onChange(updated);
  };

  // Reorder: Move Up / Left
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...images];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    onChange(updated);
  };

  // Reorder: Move Down / Right
  const handleMoveDown = (index: number) => {
    if (index === images.length - 1) return;
    const updated = [...images];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    onChange(updated);
  };

  // Remove image from list and delete from Cloudinary
  const handleRemove = async (index: number) => {
    const target = images[index];
    const removedWasPrimary = target?.isPrimary;
    const updated = images.filter((_, i) => i !== index);

    // If removed image was primary and there are remaining images, set first as primary
    if (removedWasPrimary && updated.length > 0) {
      updated[0].isPrimary = true;
    }
    onChange(updated);

    // If it has a Cloudinary publicId, delete in background
    if (target?.publicId) {
      try {
        await fetch("/api/admin/delete-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publicId: target.publicId }),
        });
      } catch (e) {
        console.warn("Background deletion of Cloudinary asset failed:", e);
      }
    }
  };

  // Update alt text for accessibility and SEO
  const handleAltChange = (index: number, alt: string) => {
    const updated = [...images];
    updated[index] = { ...updated[index], alt };
    onChange(updated);
  };

  const isUploading = uploadingFiles.length > 0;

  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      {/* Upload Error Alert */}
      {uploadError && (
        <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive flex items-center justify-between text-body-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{uploadError}</span>
          </div>
          <button
            type="button"
            onClick={() => setUploadError(null)}
            className="text-destructive font-bold text-label-sm hover:underline ml-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Dropzone container */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`rounded-xl p-8 border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
          isDragging
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-border bg-surface-container-low hover:bg-surface-container"
        } ${isUploading ? "pointer-events-none opacity-80" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          disabled={isUploading}
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="w-14 h-14 rounded-full bg-surface-container-highest flex items-center justify-center text-primary mb-3 shadow-xs">
          {isUploading ? (
            <Loader2 className="w-7 h-7 animate-spin text-secondary" />
          ) : (
            <UploadCloud className="w-7 h-7" />
          )}
        </div>

        <h4 className="font-headline-sm text-lg text-foreground font-bold">
          {isUploading ? "Uploading to Cloudinary..." : "Drag & drop atelier photographs here"}
        </h4>
        <p className="text-body-sm text-muted-foreground mt-1 max-w-sm">
          or <span className="text-primary font-semibold underline">browse local files</span>. Automatically optimized via Cloudinary (WebP/AVIF auto-format & compression).
        </p>

        <div className="flex items-center gap-2 mt-3">
          <span className="text-label-sm text-secondary font-semibold bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
            {images.length + uploadingFiles.length} of {maxImages} images added
          </span>
          <span className="text-label-sm text-tertiary font-semibold bg-tertiary/10 px-3 py-1 rounded-full border border-tertiary/20 flex items-center gap-1">
            <Cloud className="w-3.5 h-3.5" />
            <span>Cloudinary CDN</span>
          </span>
        </div>
      </div>

      {/* Image Gallery Grid */}
      {(images.length > 0 || uploadingFiles.length > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Active Uploading Previews */}
          {uploadingFiles.map((up) => (
            <div
              key={up.id}
              className="relative bg-surface-container p-3 rounded-xl border border-secondary/40 shadow-xs flex flex-col gap-3 animate-pulse"
            >
              <div className="relative h-48 w-full rounded-lg overflow-hidden bg-surface-container-highest flex items-center justify-center">
                <Image
                  src={up.previewUrl}
                  alt={up.name}
                  fill
                  className="object-cover opacity-60"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white gap-2">
                  <Loader2 className="w-8 h-8 animate-spin text-secondary" />
                  <span className="text-label-sm font-bold">Optimizing & Uploading...</span>
                  <span className="text-[11px] text-white/80 truncate max-w-[200px]">{up.name}</span>
                </div>
              </div>
              <div className="h-9 rounded-lg bg-surface-lowest/50" />
            </div>
          ))}

          {/* Uploaded Images */}
          {images.map((image, index) => (
            <div
              key={image.publicId || image.url || index}
              className={`relative bg-surface-container p-3 rounded-xl border flex flex-col gap-3 transition-all ${
                image.isPrimary
                  ? "border-primary ring-2 ring-primary/20 shadow-md"
                  : "border-border shadow-xs"
              }`}
            >
              {/* Image Preview Container */}
              <div className="relative h-48 w-full rounded-lg overflow-hidden bg-surface-container-highest">
                <Image
                  src={image.url}
                  alt={image.alt || `Product image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />

                {/* Primary Hero Badge */}
                {image.isPrimary ? (
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary text-white text-label-sm font-bold shadow-md">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>MAIN HERO</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSetPrimary(index)}
                    className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-md bg-black/60 hover:bg-black/80 text-white text-label-sm font-medium backdrop-blur-sm transition-all"
                    title="Set as hero product photo"
                  >
                    <Star className="w-3 h-3" />
                    <span>Set as Hero</span>
                  </button>
                )}

                {/* CDN Badge */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[11px] font-mono">
                  <Cloud className="w-3 h-3 text-secondary" />
                  <span>f_auto, q_auto</span>
                </div>

                {/* Reorder Buttons Over Image */}
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-lg p-1 text-white">
                  <button
                    type="button"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Move previous / up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === images.length - 1}
                    className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Move next / down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Alt Text Input */}
              <div className="flex flex-col gap-1">
                <label className="text-label-sm text-foreground font-semibold flex items-center justify-between">
                  <span>Image {index + 1} Alt Text:</span>
                  <span className="text-[11px] text-muted-foreground font-normal">Accessibility & SEO</span>
                </label>
                <input
                  type="text"
                  value={image.alt}
                  onChange={(e) => handleAltChange(index, e.target.value)}
                  placeholder="Describe image for screen readers & Google SEO..."
                  className="w-full px-3 py-1.5 rounded-lg bg-surface-lowest border border-border text-foreground text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-1 border-t border-border/40">
                <span className="text-label-sm text-muted-foreground">
                  Order position: #{index + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="text-destructive hover:text-destructive/80 text-label-sm font-semibold flex items-center gap-1 px-2 py-1 rounded hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
