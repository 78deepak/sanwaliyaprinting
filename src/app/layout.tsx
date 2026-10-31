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
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  fallback: ["system-ui", "-apple-system", "sans-serif"],
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
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Fine Print Studio & Wedding Stationery • ${siteConfig.nameHindi}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} • Fine Print Studio`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "PrintShop",
  name: siteConfig.name,
  alternateName: siteConfig.nameHindi,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ramsnehi Patidar Complex, Sadar Bazar",
    addressLocality: "Suwasra",
    addressRegion: "Madhya Pradesh",
    postalCode: "458888",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "24.0886",
    longitude: "75.6327",
  },
  openingHours: "Mo-Sa 10:00-20:30",
  sameAs: [siteConfig.googleMapsUrl],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
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
