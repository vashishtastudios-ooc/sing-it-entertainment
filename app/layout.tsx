import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-body" });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "World-Class Entertainment Management | Weddings, Events, Restaurants & Casinos | Sing It Entertainment",
  description:
    "Sing It Entertainment delivers world-class artists for weddings, corporate events and private occasions — and provides fully outsourced entertainment management for restaurants, hotels and casinos across the UK and internationally.",
  keywords: [
    "outsourced entertainment management",
    "entertainment agency",
    "restaurant entertainment",
    "casino entertainment",
    "hotel entertainment",
    "wedding entertainment",
    "corporate events",
    "private events",
    "live music",
    "artist booking",
    "UK",
    "international",
  ],
  openGraph: {
    title: "Sing It Entertainment | World-Class Entertainment. Seamlessly Managed.",
    description:
      "From outsourced entertainment management for hospitality venues to world-class artists for private events — Sing It delivers extraordinary entertainment across the UK and worldwide.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfairDisplay.variable}`}>
      <body>{children}</body>
    </html>
  );
}
