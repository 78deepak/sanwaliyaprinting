"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Stamp,
  CheckCircle2,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  Store,
  ShieldCheck,
  Loader2,
  ShieldAlert,
} from "lucide-react";
import { loginAction, checkLockoutStatusAction } from "@/app/admin/auth-actions";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [retryMinutes, setRetryMinutes] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    checkLockoutStatusAction().then((status) => {
      if (mounted && status.isLocked) {
        setIsLocked(true);
        setRetryMinutes(status.retryAfterMinutes || 15);
        setError(
          `Control desk is temporarily locked due to excessive failed attempts. Please retry in ${
            status.retryAfterMinutes || 15
          } minutes.`
        );
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await loginAction(password);

      if (result.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(result.error || "Authentication failed: Incorrect password.");
        if (result.locked) {
          setIsLocked(true);
          setRetryMinutes(result.retryAfterMinutes || 15);
        }
        setIsLoading(false);
      }
    } catch {
      setError("An unexpected authentication error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background decoration matching Stitch screen */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      {/* Top Navigation Shortcut */}
      <div className="absolute top-6 left-6 md:left-12 flex items-center gap-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-surface-lowest border border-border text-foreground hover:text-primary text-label-md font-semibold shadow-xs transition-colors"
        >
          <Store className="w-4 h-4 text-secondary" />
          <span>View Public Catalogue</span>
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-surface-lowest border border-border rounded-2xl shadow-2xl p-7 md:p-9 relative overflow-hidden z-10 animate-in zoom-in-95 duration-300">
        {/* Gilded Top Border Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-primary" />

        <div className="flex flex-col items-center text-center">
          {/* Emblem Icon */}
          <div className="relative mb-4">
            <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg">
              <Stamp className="w-8 h-8 text-secondary-fixed" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Bilingual Atelier Header */}
          <span className="text-label-sm tracking-widest text-secondary font-bold uppercase">
            Heritage Print Atelier
          </span>
          <h1 className="font-headline-md text-2xl text-primary font-bold mt-1">
            Admin Control Desk Sign In
          </h1>
          <p className="text-body-sm text-muted-foreground mt-1">
            सांवलिया प्रिंटिंग प्रेस • सुवासरा (मंदसौर)
          </p>

          {/* Error Banner */}
          {error && (
            <div
              className={`w-full mt-5 p-3.5 rounded-lg border flex items-center gap-2.5 text-left text-body-sm animate-in fade-in ${
                isLocked
                  ? "bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300"
                  : "bg-destructive/10 border-destructive/30 text-destructive"
              }`}
            >
              {isLocked ? (
                <ShieldAlert className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0" />
              )}
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="w-full mt-6 flex flex-col gap-5 text-left">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="masterPasswordInput"
                  className="text-label-md text-foreground font-semibold"
                >
                  Master Desk Password
                </label>
                <span className="text-label-sm text-muted-foreground font-normal">
                  Owner PIN
                </span>
              </div>

              <div className="relative">
                <input
                  id="masterPasswordInput"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading || isLocked}
                  placeholder={
                    isLocked
                      ? `Locked for ${retryMinutes || 15} minutes`
                      : "Enter shop master password"
                  }
                  className="w-full px-4 pr-11 py-3 rounded-lg bg-surface-container border border-border text-foreground text-body-md focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all shadow-inner disabled:opacity-50"
                  autoFocus={!isLocked}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLocked}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 transition-colors disabled:opacity-40"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Quick Helper hint */}
            <div className="p-3 rounded-lg bg-surface-container border border-border/40 text-center">
              <p className="text-body-sm text-muted-foreground flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-secondary" />
                <span>Single shopkeeper access. No registration required.</span>
              </p>
            </div>

            {/* Sign in button */}
            <button
              type="submit"
              disabled={isLoading || isLocked}
              className="w-full py-3.5 px-6 rounded-lg bg-primary hover:bg-primary-container text-white text-label-lg font-bold shadow-md transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : isLocked ? (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Desk Temporarily Locked</span>
                </>
              ) : (
                <>
                  <span>Sign In to Shop</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer Security Seal */}
          <div className="mt-8 pt-4 w-full flex items-center justify-between text-muted-foreground text-label-sm border-t border-border/40">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-tertiary" />
              Gateway Encrypted (TLS 1.3)
            </span>
            <span className="text-secondary font-semibold">Suwasra Node</span>
          </div>
        </div>
      </div>
    </div>
  );
}
