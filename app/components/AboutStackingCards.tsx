"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export type AboutStackCard = {
  image: string;
  title: string;
  description: string;
};

interface AboutStackingCardsProps {
  cards: AboutStackCard[];
}

export default function AboutStackingCards({ cards }: AboutStackingCardsProps) {
  return (
    <div className="about-mobile-showcase">
      {cards.map((card, index) => (
        <motion.article
          key={`about-mobile-${card.title}-${index}`}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: Math.min(index * 0.04, 0.2) }}
          viewport={{ once: true, amount: 0.2 }}
          className={`about-mobile-card ${index % 2 === 0 ? "is-left" : "is-right"}`}
        >
          <div className="about-mobile-card-media">
            <Image
              src={card.image}
              alt={card.title}
              fill
              sizes="(max-width: 980px) 100vw, 480px"
              className="about-mobile-card-img"
            />
            <div className="about-mobile-card-overlay" />
          </div>

          <div className="about-mobile-card-copy">
            <h3 className="about-mobile-card-title">{card.title}</h3>
            <p className="about-mobile-card-desc">{card.description}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
