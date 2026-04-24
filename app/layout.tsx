import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-body" });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Sing It Entertainment | Luxury Events & Talent Agency",
  description:
    "World-class entertainment for corporate, private and public events across the UK and UAE.",
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
