"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  UploadCloud,
  Star,
  Trash2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

export interface UploadedImage {
  id?: string;
  url: string;
  alt: string;
  caption?: string;
  isPrimary?: boolean;
}

interface ImageUploaderProps {
  images: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  maxImages?: number;
  className?: string;
}

export function ImageUploader({
  images,
  onChange,
  maxImages = 8,
  className = "",
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Handle local file selection and convert to local object URLs
  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    // // TODO(backend): Upload raw files to image CDN / S3 bucket via POST /api/admin/uploads
    const newItems: UploadedImage[] = [];

    Array.from(files).forEach((file, index) => {
      if (images.length + newItems.length >= maxImages) return;

      if (!file.type.startsWith("image/")) return;

      const localUrl = URL.createObjectURL(file);
      const isFirstImage = images.length === 0 && newItems.length === 0;

      newItems.push({
        id: `img-${Date.now()}-${index}`,
        url: localUrl,
        alt: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
        caption: `Specimen view ${images.length + newItems.length + 1}`,
        isPrimary: isFirstImage,
      });
    });

    if (newItems.length > 0) {
      onChange([...images, ...newItems]);
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

  // Remove image
  const handleRemove = (index: number) => {
    const removedWasPrimary = images[index]?.isPrimary;
    const updated = images.filter((_, i) => i !== index);

    // If the removed image was primary and there are still images, make the first one primary
    if (removedWasPrimary && updated.length > 0) {
      updated[0].isPrimary = true;
    }
    onChange(updated);
  };

  // Update alt text for a specific image
  const handleAltChange = (index: number, alt: string) => {
    const updated = [...images];
    updated[index] = { ...updated[index], alt };
    onChange(updated);
  };

  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      {/* Dropzone container */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`rounded-xl p-8 border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
          isDragging
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-border bg-surface-container-low hover:bg-surface-container"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="w-14 h-14 rounded-full bg-surface-container-highest flex items-center justify-center text-primary mb-3 shadow-xs">
          <UploadCloud className="w-7 h-7" />
        </div>

        <h4 className="font-headline-sm text-lg text-foreground font-bold">
          Drag & drop atelier photographs here
        </h4>
        <p className="text-body-sm text-muted-foreground mt-1 max-w-sm">
          or <span className="text-primary font-semibold underline">browse local files</span>. Accepts JPG, PNG, or WebP. Local object previews generated instantly.
        </p>

        <span className="text-label-sm text-secondary font-semibold mt-3 bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
          {images.length} of {maxImages} images added
        </span>
      </div>

      {/* Image Gallery Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id || image.url || index}
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
                  className="object-cover"
                  unoptimized
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
