import type { Metadata } from "next";

export const SITE_URL = "https://www.singitentertainment.com";
export const SITE_NAME = "Sing It Entertainment";
export const DEFAULT_OG_IMAGE = "/images/hero-logo.jpeg";
export const UK_OPEN_GRAPH_LOCALE = "en_GB";

export const UK_SEO_KEYWORDS = [
  "entertainment agency UK",
  "event entertainment UK",
  "wedding entertainment UK",
  "corporate event entertainment UK",
  "restaurant entertainment UK",
  "hotel entertainment UK",
  "casino entertainment UK",
  "DJ hire UK",
  "live music hire UK",
  "private event entertainment",
  "outsourced entertainment management",
  "artist booking UK",
  "UK and worldwide entertainment",
];

export function pageUrl(path: string): string {
  if (path.startsWith("http")) return path;
  if (path === "/" || path === "") return SITE_URL;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

type BuildPageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
};

export function buildPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  keywords,
}: BuildPageMetadataOptions): Metadata {
  const url = pageUrl(path);
  const resolvedImageAlt = imageAlt ?? `${SITE_NAME} — bespoke entertainment across the UK & worldwide`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: UK_OPEN_GRAPH_LOCALE,
      type: "website",
      images: [
        {
          url: image,
          alt: resolvedImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EntertainmentBusiness",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/hero-logo.jpeg`,
  description:
    "Sing It Entertainment supplies world-class artists and outsourced entertainment management for weddings, corporate events, restaurants, hotels and casinos across the UK & worldwide.",
  areaServed: [
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Place", name: "Worldwide" },
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "GB",
  },
  telephone: "+44-7949-040404",
  email: "myevent@singit.uk.com",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+44-7949-040404",
      email: "myevent@singit.uk.com",
      areaServed: "GB",
      availableLanguage: "en",
    },
  ],
  sameAs: ["https://g.co/kgs/XtjAGQ"],
};
