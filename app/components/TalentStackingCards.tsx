"use client";

import { useRef, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

export type TalentStackItem = {
  title: string;
  slug: string;
  image: string;
  text: string;
};

interface TalentStackingCardsProps {
  items: TalentStackItem[];
}

export default function TalentStackingCards({ items }: TalentStackingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="about-stack-wrap talent-stack-wrap">
      {items.map((item, i) => {
        const targetScale = 1 - (items.length - i) * 0.04;
        return (
          <TalentStackCard
            key={`talent-stack-${item.slug}`}
            index={i}
            item={item}
            progress={scrollYProgress}
            range={[i * (1 / items.length), 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}

interface TalentStackCardProps {
  index: number;
  item: TalentStackItem;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

function TalentStackCard({ index, item, progress, range, targetScale }: TalentStackCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  const updateSpotlight = (element: HTMLElement, clientX: number, clientY: number) => {
    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxDistance = Math.hypot(centerX, centerY);
    const distance = Math.hypot(x - centerX, y - centerY);
    const proximity = Math.max(0, 1 - distance / maxDistance);

    element.style.setProperty("--mx", `${x}px`);
    element.style.setProperty("--my", `${y}px`);
    element.style.setProperty("--spotlight", proximity.toFixed(3));
    element.style.setProperty("--cursor-flow", "1");
  };

  const handlePointerDown = (e: PointerEvent<HTMLElement>) => {
    updateSpotlight(e.currentTarget, e.clientX, e.clientY);
  };

  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    updateSpotlight(e.currentTarget, e.clientX, e.clientY);
  };

  const handlePointerLeave = (e: PointerEvent<HTMLElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--spotlight", "0");
    card.style.setProperty("--cursor-flow", "0");
  };

  return (
    <div ref={cardRef} className="about-stack-card-shell">
      <motion.div
        className="about-stack-card talent-stack-card talent-card-spotlight"
        style={{ scale, top: `calc(10vh + ${index * 22}px)` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerLeave}
        onPointerCancel={handlePointerLeave}
        onPointerLeave={handlePointerLeave}
      >
        <div className="about-stack-card-media">
          <motion.div className="about-stack-card-img-wrap" style={{ scale: imageScale }}>
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 90vw, 600px"
              className="about-stack-card-img"
            />
          </motion.div>
        </div>
        <div className="about-stack-card-copy">
          <h3 className="about-stack-card-title">{item.title}</h3>
          <p className="about-stack-card-desc">{item.text}</p>
          <Link href={`/services/${item.slug}`} className="talent-stack-link">
            View Service
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
