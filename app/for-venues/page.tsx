import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Outsourced Entertainment Management for Restaurants, Hotels & Casinos | Sing It Entertainment",
  description:
    "Sing It Entertainment manages your complete entertainment schedule — artist bookings, scheduling, cancellations and in-house sound — within your existing budget. UK and international.",
};

const services = [
  {
    title: "Full Schedule Management",
    body: "We build and manage your entire weekly entertainment programme — artist selection, bookings, scheduling and performance briefs. You approve the plan. We handle the rest.",
    icon: "📋",
  },
  {
    title: "Cancellation & Sickness Cover",
    body: "Last-minute problems are our problem, not yours. We manage all cover and replacements so your entertainment never lets your guests down.",
    icon: "🔄",
  },
  {
    title: "In-House Sound Systems",
    body: "We bring professional sound equipment to every venue we work with. No equipment hire costs. No technical stress. Just great sound.",
    icon: "🔊",
  },
  {
    title: "Budget-Friendly Model",
    body: "We work within your existing entertainment budget — whether that's £250 per performance for an independent restaurant or a full weekly programme for a casino or hotel group.",
    icon: "💷",
  },
];

const venueTypes = [
  {
    title: "Restaurants",
    body: "We specialise in independent restaurants and restaurant groups looking to add or improve live entertainment. We work within typical restaurant entertainment budgets and manage everything from a single venue or across a full multi-site group. UK and internationally.",
  },
  {
    title: "Hotels",
    body: "From lobby entertainment to bar and restaurant programmes, we manage artist bookings and weekly schedules across single and multi-site hotel properties. Our in-house sound systems remove the need for any audio infrastructure investment. We work with global hotel brands and independent boutique properties alike.",
  },
  {
    title: "Casinos",
    body: "We have extensive experience working with casino entertainment programmes across the UK and internationally. We currently work with Genting Casinos and Metropolitan Casinos and understand the specific artist and scheduling requirements of the casino environment.",
  },
];

export default function ForVenuesPage() {
  return (
    <main className="for-venues-page">
      <SiteHeader alwaysVisible />

      {/* Hero */}
      <section className="fv-hero">
        <div className="container fv-hero-inner">
          <p className="eyebrow">FOR VENUES &amp; HOSPITALITY</p>
          <h1 className="fv-hero-title">
            YOUR VENUE.<br />
            <span>OUR ENTERTAINMENT.</span>
          </h1>
          <p className="fv-hero-sub">
            We manage your complete entertainment schedule so you don&apos;t have to.
          </p>
          <p className="fv-hero-body">
            From weekly artist bookings and scheduling to last-minute cancellations, sickness cover and in-house sound systems — Sing It runs the entire operation seamlessly, within your existing budget. Serving venues across the UK and internationally.
          </p>
          <div className="fv-hero-ctas">
            <a href="mailto:myevent@singit.uk.com" className="cta">Get in Touch</a>
            <a href="tel:+447949040404" className="ghost-link">+44 7949 040 404</a>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="fv-section">
        <div className="container fv-two-col">
          <div>
            <p className="eyebrow">THE PROBLEM WE SOLVE</p>
            <h2 className="fv-heading">
              Entertainment is essential.<br />
              <span>Managing it doesn&apos;t have to be your problem.</span>
            </h2>
          </div>
          <div>
            <p className="lead">
              Restaurants, hotels and casinos know that live entertainment drives footfall, increases spend per head and keeps guests coming back. But sourcing artists, managing schedules, covering last-minute cancellations and dealing with no-shows takes time and resource most venues simply don&apos;t have.
            </p>
            <p className="lead">
              Historically, using an agency has been expensive — pricing most independent venues out entirely. We built Sing It to change that.
            </p>
            <p className="lead">
              We work within your existing entertainment budget. Our model means you benefit from preferential artist rates — built from consistent, high-volume bookings — that you simply cannot access on your own.
            </p>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="fv-section fv-section--dark">
        <div className="container">
          <p className="eyebrow">WHAT WE DO</p>
          <h2 className="fv-heading fv-heading--center">Everything managed. Nothing missed.</h2>
          <div className="fv-services-grid">
            {services.map((s) => (
              <div key={s.title} className="fv-service-card">
                <span className="fv-service-icon">{s.icon}</span>
                <h3 className="fv-service-title">{s.title}</h3>
                <p className="fv-service-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Track record */}
      <section className="fv-section">
        <div className="container fv-two-col">
          <div>
            <p className="eyebrow">TRACK RECORD</p>
            <h2 className="fv-heading">Trusted by the best in hospitality.</h2>
          </div>
          <div>
            <p className="lead">
              We currently manage entertainment programmes for Funky Collective across five venues and Tiger Bay International across multiple sites. We work with Genting Casinos and Metropolitan Casinos across the UK, and supply artists internationally for Hilton, Rosewood, Soho House, BBC, Eurovision and Sony.
            </p>
            <p className="lead">
              We have taken independent restaurants from zero live music presence to fully established entertainment destinations — venues that people travel to specifically because of the atmosphere we have helped create. Whether you operate one venue or a group of ten, we build a programme that works for your business and your guests.
            </p>
          </div>
        </div>
      </section>

      {/* Venue types */}
      <section className="fv-section fv-section--dark">
        <div className="container">
          <p className="eyebrow">WHO WE WORK WITH</p>
          <h2 className="fv-heading fv-heading--center">Built for every type of hospitality venue.</h2>
          <div className="fv-venue-grid">
            {venueTypes.map((v) => (
              <div key={v.title} className="fv-venue-card">
                <h3 className="fv-venue-title">{v.title}</h3>
                <p className="fv-venue-body">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="fv-cta-section">
        <div className="container fv-cta-inner">
          <h2 className="fv-cta-title">Ready to hand over your entertainment?</h2>
          <p className="fv-cta-sub">
            Get in touch for a no-obligation conversation about what Sing It Entertainment can do for your venue.
          </p>
          <div className="fv-cta-contacts">
            <a href="tel:+447949040404" className="fv-cta-link">+44 7949 040 404</a>
            <a href="mailto:myevent@singit.uk.com" className="fv-cta-link">myevent@singit.uk.com</a>
          </div>
          <a href="mailto:myevent@singit.uk.com" className="cta" style={{ marginTop: "24px", display: "inline-block" }}>
            Get in Touch
          </a>
          <p className="fv-cta-note">Serving restaurants, hotels and casinos across the UK and internationally.</p>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <p>© 2026 Sing It Events Ltd. &nbsp;|&nbsp; <Link href="/">singitentertainment.com</Link></p>
        </div>
      </footer>
    </main>
  );
}
