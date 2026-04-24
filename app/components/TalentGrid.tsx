"use client";

import Image from "next/image";
import Link from "next/link";

type TalentItem = {
  title: string;
  slug: string;
  image: string;
  text: string;
};

type TalentGridProps = {
  items: TalentItem[];
};

export default function TalentGrid({ items }: TalentGridProps) {
  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxDistance = Math.hypot(centerX, centerY);
    const distance = Math.hypot(x - centerX, y - centerY);
    const proximity = Math.max(0, 1 - distance / maxDistance);

    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
    card.style.setProperty("--spotlight", proximity.toFixed(3));
    card.style.setProperty("--cursor-flow", "1");
  };

  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--cursor-flow", "1");
  };

  const handleLeave = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--spotlight", "0");
    card.style.setProperty("--cursor-flow", "0");
  };

  return (
    <div className="talent-grid">
      {items.map((item) => (
        <article
          key={item.title}
          className="talent-card-text talent-card-spotlight"
          onMouseEnter={handleEnter}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          <div className="talent-image-wrap">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 760px) 100vw, (max-width: 980px) 50vw, 33vw"
              className="talent-image"
            />
            <div className="talent-image-overlay" />
          </div>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <Link href={`/services/${item.slug}`} className="service-link">
            View Service
          </Link>
        </article>
      ))}
    </div>
  );
}
