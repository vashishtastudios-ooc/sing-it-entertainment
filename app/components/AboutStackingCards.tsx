"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

export type AboutStackCard = {
  image: string;
  title: string;
  description: string;
};

interface AboutStackingCardsProps {
  cards: AboutStackCard[];
}

export default function AboutStackingCards({ cards }: AboutStackingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="about-stack-wrap">
      {cards.map((card, i) => {
        const targetScale = 1 - (cards.length - i) * 0.04;
        return (
          <StackCard
            key={`about-stack-${i}`}
            index={i}
            card={card}
            progress={scrollYProgress}
            range={[i * (1 / cards.length), 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}

interface StackCardProps {
  index: number;
  card: AboutStackCard;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

function StackCard({ index, card, progress, range, targetScale }: StackCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={cardRef} className="about-stack-card-shell">
      <motion.div
        className="about-stack-card"
        style={{ scale, top: `calc(10vh + ${index * 22}px)` }}
      >
        <div className="about-stack-card-media">
          <motion.div className="about-stack-card-img-wrap" style={{ scale: imageScale }}>
            <Image
              src={card.image}
              alt={card.title}
              fill
              sizes="(max-width: 768px) 90vw, 600px"
              className="about-stack-card-img"
            />
          </motion.div>
        </div>
        <div className="about-stack-card-copy">
          <h3 className="about-stack-card-title">{card.title}</h3>
          <p className="about-stack-card-desc">{card.description}</p>
        </div>
      </motion.div>
    </div>
  );
}
