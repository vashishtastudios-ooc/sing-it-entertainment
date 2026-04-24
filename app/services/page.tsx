import type { Metadata } from "next";
import Link from "next/link";
import { servicePages } from "./data";

export const metadata: Metadata = {
  title: "Entertainment Services UK | DJs, Singers, Musicians & More | Sing It",
  description:
    "Explore event entertainment services across the UK including DJs, singers, musicians, dancers, magicians and circus performers.",
  alternates: {
    canonical: "https://www.singitentertainment.com/services",
  },
};

export default function ServicesIndexPage() {
  return (
    <main className="service-page">
      <section className="service-details">
        <div className="container">
          <p className="eyebrow">UK EVENT ENTERTAINMENT</p>
          <h1>Our Services</h1>
          <p className="lead">
            Browse our premium service categories for corporate, private and wedding events across the UK.
          </p>
          <ul className="service-bullets">
            {servicePages.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="service-link">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
