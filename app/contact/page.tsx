import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import ContactPageContent from "../components/ContactPageContent";
import { buildPageMetadata } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Sing It Entertainment | Book UK Event Entertainment",
  description:
    "Get in touch to book world-class entertainment for your event or venue. UK & worldwide. Call +44 7949 040 404 or request a quote.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className={inter.className}>
      <Suspense fallback={null}>
        <ContactPageContent />
      </Suspense>
    </div>
  );
}
