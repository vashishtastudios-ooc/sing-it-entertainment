"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { ServiceCatalogItem } from "../services/catalog";

type ServicesMegaGridProps = {
  items: ServiceCatalogItem[];
};

export default function ServicesMegaGrid({ items }: ServicesMegaGridProps) {
  const getSpanClass = (index: number) => {
    const patternIndex = index % 4;
    if (patternIndex === 0) return "is-span-5";
    if (patternIndex === 1) return "is-span-7";
    if (patternIndex === 2) return "is-span-7";
    return "is-span-5";
  };

  return (
    <div className="services-condition-grid">
      {items.map((item, index) => (
        <motion.article
          key={item.title}
          className={`services-condition-card ${getSpanClass(index)}`}
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.45, delay: Math.min(index * 0.02, 0.2) }}
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="services-condition-media">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="services-condition-image"
            />
            <div className="services-condition-overlay" />
          </div>

          <div className="services-condition-caption">
            <div>
              <h3 className="services-condition-title">{item.title}</h3>
              <p className="services-condition-desc">{item.description}</p>
            </div>
            {item.slug ? (
              <Link
                href={`/services/${item.slug}`}
                className="services-condition-arrow"
                aria-label={`View ${item.title}`}
              >
                ↗
              </Link>
            ) : (
              <Link
                href={`/contact?service=${encodeURIComponent(item.title)}`}
                className="services-condition-arrow"
                aria-label={`Enquire for ${item.title}`}
              >
                ↗
              </Link>
            )}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
