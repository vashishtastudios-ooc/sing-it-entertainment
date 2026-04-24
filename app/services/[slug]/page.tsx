import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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

  const canonicalUrl = `https://www.singitentertainment.com/services/${service.slug}`;
  return {
    title: service.ukSeoTitle,
    description: service.ukSeoDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: service.ukSeoTitle,
      description: service.ukSeoDescription,
      url: canonicalUrl,
      type: "website",
      images: [service.heroImage],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicePages.find((item) => item.slug === slug);
  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.ukSeoDescription,
    provider: {
      "@type": "EntertainmentBusiness",
      name: "Sing It Entertainment",
      areaServed: "United Kingdom",
      url: "https://www.singitentertainment.com",
    },
    areaServed: "United Kingdom",
  };

  return (
    <main className="service-page">
      <section className="service-hero">
        <div className="container service-hero-layout">
          <div>
            <p className="eyebrow">UK EVENT ENTERTAINMENT</p>
            <h1>{service.title}</h1>
            <p className="lead">{service.intro}</p>
            <div className="service-actions">
              <a href="mailto:myevent@singit.uk.com" className="cta">
                Enquire Now
              </a>
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
