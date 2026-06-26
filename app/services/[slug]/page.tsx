import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { servicePages } from "../data";

type ServicePageParams = {
  slug: string;
};

type ServicePageProps = {
  params: Promise<ServicePageParams>;
};

export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicePages.find((item) => item.slug === slug);
  if (!service) {
    return {
      title: "Service Not Found | Sing It Entertainment",
    };
  }

  const canonicalUrl = `/services/${service.slug}`;
  return buildPageMetadata({
    title: service.ukSeoTitle,
    description: service.ukSeoDescription,
    path: canonicalUrl,
    image: service.heroImage,
    imageAlt: `${service.shortTitle} entertainment — ${service.ukSeoTitle}`,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicePages.find((item) => item.slug === slug);
  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.serviceType,
    provider: {
      "@type": "Organization",
      name: "Sing It Entertainment",
      url: "https://www.singitentertainment.com",
    },
    areaServed: { "@type": "Country", name: "United Kingdom" },
    description: service.schemaDescription,
  };

  return (
    <main className="service-page">
      <section className="service-hero">
        <div className="container service-hero-layout">
          <div>
            <p className="eyebrow">WORLD-CLASS EVENT ENTERTAINMENT</p>
            <h1>{service.title}</h1>
            <p className="lead">{service.intro}</p>
            <div className="service-actions">
              <Link
                href={`/contact?service=${encodeURIComponent(service.shortTitle)}`}
                className="cta"
              >
                Enquire Now
              </Link>
              <Link href="/" className="ghost-link">
                Back to Home
              </Link>
            </div>
          </div>
          <div className="service-hero-image-wrap">
            <Image src={service.heroImage} alt={service.shortTitle} fill sizes="(max-width: 980px) 100vw, 42vw" className="service-hero-image" />
          </div>
        </div>
      </section>

      <section className="service-details">
        <div className="container">
          <h2>Why Choose Our {service.shortTitle}</h2>
          <ul className="service-bullets">
            {service.bullets.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
