import type { Metadata } from "next";
import Link from "next/link";
import ScrollRevealHeading from "../components/ScrollRevealHeading";
import ServicesMegaGrid from "../components/ServicesMegaGrid";
import SiteHeader from "../components/SiteHeader";
import { serviceCatalogItems } from "./catalog";

export const metadata: Metadata = {
  title: "Entertainment Services | Sing It Entertainment",
  description:
    "Explore our full entertainment services catalog, from DJs and singers to aerial acts, show productions and specialty event experiences across the UK and internationally.",
  alternates: {
    canonical: "https://www.singitentertainment.com/services",
  },
};

export default function ServicesIndexPage() {
  return (
    <main className="services-index-page">
      <SiteHeader alwaysVisible />
      <section className="services-index-hero">
        <div className="container">
          <p className="eyebrow">WORLD-CLASS EVENT ENTERTAINMENT</p>
          <ScrollRevealHeading text="OUR SERVICES" />
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
