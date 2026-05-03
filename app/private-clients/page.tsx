import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import { servicePages } from "../services/data";

export const metadata: Metadata = {
  title: "Private & Corporate Event Entertainment | Sing It Entertainment",
  description:
    "Book world-class DJs, singers, musicians, dancers, magicians and circus performers for weddings, private celebrations and corporate events across the UK and internationally.",
};

export default function PrivateClientsPage() {
  return (
    <main className="private-clients-page">
      <SiteHeader alwaysVisible />

      <section className="pc-hero">
        <div className="container pc-hero-inner">
          <p className="eyebrow">FOR PRIVATE & CORPORATE CLIENTS</p>
          <h1 className="pc-hero-title">
            YOUR EVENT.<br />
            <span>WORLD-CLASS TALENT.</span>
          </h1>
          <p className="pc-hero-sub">
            We supply unforgettable entertainment for weddings, private celebrations,
            corporate events and luxury occasions.
          </p>
          <p className="pc-hero-body">
            From headline vocalists and live bands to DJs, dancers, magicians and circus
            performers, we match the right talent to your brief, budget and vision.
            Every artist is personally vetted by our team.
          </p>
          <Link href="/contact?audience=private-client" className="cta">
            Plan My Event
          </Link>
        </div>
      </section>

      <section className="pc-section pc-section--dark">
        <div className="container">
          <p className="eyebrow">OUR PRIVATE EVENT SERVICES</p>
          <h2 className="pc-heading">Choose the right entertainment for your event</h2>
          <div className="pc-services-grid">
            {servicePages.map((service) => (
              <article key={service.slug} className="pc-service-card">
                <div className="pc-service-media">
                  <Image
                    src={service.heroImage}
                    alt={service.shortTitle}
                    fill
                    sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    className="pc-service-image"
                  />
                  <div className="pc-service-overlay" />
                </div>
                <div className="pc-service-content">
                  <h3 className="pc-service-title">{service.shortTitle}</h3>
                  <p className="pc-service-text">{service.intro}</p>
                  <Link href={`/services/${service.slug}`} className="ghost-link">
                    View Service
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pc-section">
        <div className="container pc-two-col">
          <div>
            <p className="eyebrow">WHY CLIENTS BOOK WITH US</p>
            <h2 className="pc-heading">Premium entertainment. Seamlessly delivered.</h2>
          </div>
          <div>
            <p className="lead">
              We work closely with private and corporate clients to build bespoke entertainment
              lineups that match your event atmosphere and audience.
            </p>
            <p className="lead">
              Whether you are planning a wedding, luxury birthday, brand activation or company
              celebration, our team handles talent sourcing, coordination and event flow so you
              can focus on your guests.
            </p>
            <p className="lead">
              Based in the UK and working internationally, we deliver exceptional experiences with
              trusted artists and flawless execution.
            </p>
          </div>
        </div>
      </section>

      <section className="pc-cta">
        <div className="container pc-cta-inner">
          <h2 className="pc-cta-title">Ready to book your entertainment?</h2>
          <p className="pc-cta-sub">
            Tell us your event details and we&apos;ll build the perfect talent lineup.
          </p>
          <div className="pc-cta-actions">
            <Link href="/contact?audience=private-client" className="cta">
              Enquire Now
            </Link>
            <a href="tel:+447949040404" className="ghost-link">
              +44 7949 040 404
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
