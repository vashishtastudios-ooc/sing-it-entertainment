import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import ContactPageContent from "../components/ContactPageContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Contact Us | Sing It Entertainment",
  description:
    "Contact Sing It Entertainment for premium event entertainment across the UAE and UK. DJs, singers, musicians, dancers, magicians and circus performers.",
};

export default function ContactPage() {
  return (
    <div className={inter.className}>
      <Suspense fallback={null}>
        <ContactPageContent />
      </Suspense>
    </div>
  );
}
