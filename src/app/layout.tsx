import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SelectionProvider } from "@/context/selection-context";
import { PublicLayoutWrapper } from "@/components/layout/public-layout-wrapper";
import { siteConfig } from "@/lib/site-config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Fine Print Studio & Wedding Stationery • ${siteConfig.nameHindi}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "wedding invitations",
    "shadi card",
    "visiting cards",
    "bill books",
    "flex banners",
    "Suwasra",
    "Mandsaur",
    "Sanwaliya Printing Press",
    "शादी कार्ड",
    "प्रिंटिंग प्रेस",
  ],
  authors: [{ name: siteConfig.name }],
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${plusJakarta.variable} ${notoDevanagari.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground antialiased selection:bg-secondary-container selection:text-secondary-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SelectionProvider>
            <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
          </SelectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
