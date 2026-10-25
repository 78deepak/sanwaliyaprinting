import React from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/auth";
import { getSiteSettingsAction } from "@/app/admin/actions";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  const settings = await getSiteSettingsAction();
  return <AdminShell ownerName={settings.ownerName}>{children}</AdminShell>;
}
