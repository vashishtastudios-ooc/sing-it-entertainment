import type { Metadata } from "next";
import Link from "next/link";
import ScrollRevealHeading from "../components/ScrollRevealHeading";
import ServicesMegaGrid from "../components/ServicesMegaGrid";
import SiteHeader from "../components/SiteHeader";
import { serviceCatalogItems } from "./catalog";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Entertainment Services UK | DJs, Singers, Musicians & More | Sing It",
  description:
    "Explore our roster of world-class entertainment — DJs, singers, musicians, dancers, magicians and circus performers for events and venues across the UK.",
  path: "/services",
});

export default function ServicesIndexPage() {
  return (
    <main className="services-index-page">
      <SiteHeader alwaysVisible />
      <section className="services-index-hero">
        <div className="container">
          <p className="eyebrow">WORLD-CLASS EVENT ENTERTAINMENT</p>
          <ScrollRevealHeading text="Our Entertainment Services" as="h1" />
          <p className="lead">
            Sing It provides a unique and bespoke service with a network unlike any other.
            Our talent pool comprises a vast array of entertainers enabling us to bring
            any event to life, from highly stylized themes to seamless guest experiences.
          </p>
          <p className="lead services-index-subline">
            Browse every premium service category for corporate, private and wedding
            events across the UK and internationally.
          </p>
          <div className="services-index-actions">
            <Link href="/for-venues" className="audience-split-btn audience-split-btn--venue">
              For Venues
            </Link>
            <Link href="/private-clients" className="audience-split-btn audience-split-btn--private">
              Private Clients
            </Link>
          </div>
        </div>
      </section>

      <section className="services-index-grid-section">
        <div className="container">
          <ServicesMegaGrid items={serviceCatalogItems} />
        </div>
      </section>
    </main>
  );
}
