import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sanwaliya Admin | Studio Management Console",
  description: "Shopkeeper management console for Sanwaliya Printing Press, Suwasra.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-secondary-container selection:text-secondary-foreground">
      {children}
    </div>
  );
}
