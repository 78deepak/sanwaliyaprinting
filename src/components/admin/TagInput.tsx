"use client";

import React, { useState, KeyboardEvent } from "react";
import { X, Plus, Tag } from "lucide-react";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  label?: string;
  suggestions?: string[];
  maxTags?: number;
  className?: string;
}

export function TagInput({
  tags,
  onChange,
  placeholder = "+ Type and press Enter...",
  label = "Search Indexing Tags (English & Devanagari)",
  suggestions = [
    "शादी कार्ड",
    "shadi card",
    "wedding box",
    "निमंत्रण पत्र",
    "24k Gold Foil",
    "velvet box",
    "बिल बुक",
    "GST Bill Book",
    "विज़िटिंग कार्ड",
    "सुवासरा प्रिंटिंग",
  ],
  maxTags = 25,
  className = "",
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const addTag = (text: string) => {
    const trimmed = text.trim().replace(/^,+|,+$/g, "");
    if (trimmed && !tags.includes(trimmed) && tags.length < maxTags) {
      onChange([...tags, trimmed]);
      setInputValue("");
    }
  };

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-label-md text-foreground font-semibold flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-secondary" />
            {label}
          </span>
          <span className="text-label-sm text-muted-foreground font-normal">
            {tags.length} / {maxTags} tags
          </span>
        </label>
      )}

      {/* Main Tag Chips Container */}
      <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-lg bg-surface-container border border-border min-h-[46px] focus-within:bg-surface-lowest focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        {tags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-lowest text-foreground text-label-sm border border-border shadow-xs group"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="text-muted-foreground hover:text-destructive flex items-center justify-center transition-colors"
              title="Remove tag"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        ))}

        {tags.length < maxTags && (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => inputValue && addTag(inputValue)}
            placeholder={tags.length === 0 ? placeholder : "+ Add another..."}
            className="bg-transparent px-2 py-1 text-foreground text-body-sm focus:outline-none flex-1 min-w-[140px]"
          />
        )}
      </div>

      {/* Quick Suggestions Chips */}
      {suggestions && suggestions.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-label-sm text-muted-foreground mr-1">Suggestions:</span>
          {suggestions
            .filter((s) => !tags.includes(s))
            .slice(0, 6)
            .map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => addTag(suggestion)}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-label-sm bg-surface-container-high hover:bg-surface-container-highest text-primary font-medium transition-colors"
              >
                <Plus className="w-3 h-3" />
                {suggestion}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
