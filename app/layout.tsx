import type { Metadata, Viewport } from "next";
import { Marcellus, Montserrat, Playfair_Display } from "next/font/google";
import {
  SITE_URL,
  UK_SEO_KEYWORDS,
  buildPageMetadata,
  organizationJsonLd,
} from "@/lib/seo";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-body" });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-heading" });
const marcellus = Marcellus({ subsets: ["latin"], weight: "400", variable: "--font-hero" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildPageMetadata({
    title: "Entertainment Agency UK | Weddings, Corporate & Venue Acts | Sing It",
    description:
      "UK entertainment agency supplying world-class DJs, singers, musicians & performers for weddings, corporate events and venues. Personally vetted talent, London & worldwide. Get a quote.",
    path: "/",
    keywords: UK_SEO_KEYWORDS,
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${montserrat.variable} ${playfairDisplay.variable} ${marcellus.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
