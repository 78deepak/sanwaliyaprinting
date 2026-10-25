"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloatingButton } from "@/components/whatsapp/whatsapp-floating-button";
import { SelectionDrawer } from "@/components/selection/selection-drawer";

export function PublicLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1 w-full pb-16 lg:pb-0">{children}</main>
      <Footer />
      <WhatsAppFloatingButton />
      <SelectionDrawer />
    </>
  );
}
