"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export type EventCard = {
  id: number;
  mediaUrl: string;
  mediaType: "image" | "video";
  title: string;
};

type EventsCarouselProps = {
  cards: EventCard[];
};

export default function EventsCarousel({ cards }: EventsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragConstraint, setDragConstraint] = useState(0);

  useEffect(() => {
    const calculateConstraints = () => {
      if (!containerRef.current || !trackRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const trackWidth = trackRef.current.scrollWidth;
      setDragConstraint(containerWidth - trackWidth);
    };
    calculateConstraints();
    window.addEventListener("resize", calculateConstraints);
    return () => window.removeEventListener("resize", calculateConstraints);
  }, []);

  if (!cards.length) return null;

  return (
    <section className="w-full">
      <div className="w-full max-w-7xl mx-auto">
        <motion.div ref={containerRef} className="overflow-hidden cursor-grab rounded-3xl border border-[#27272f] bg-[#09090b]" whileTap={{ cursor: "grabbing" }}>
          <motion.div
            ref={trackRef}
            className="flex gap-6 p-6"
            drag="x"
            dragConstraints={{ right: 0, left: dragConstraint - 24 }}
            dragElastic={0.15}
          >
            {cards.map((card) => (
              <StoryCard key={card.id} card={card} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function StoryCard({ card }: { card: EventCard }) {
  return (
    <motion.div
      className="relative w-72 h-[31rem] md:w-80 md:h-[35rem] flex-shrink-0 rounded-2xl overflow-hidden border border-[#2b2b34] shadow-xl group bg-black"
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
    >
      {card.mediaType === "video" ? (
        <video
          src={card.mediaUrl}
          className="h-full w-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-105"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <Image
          src={card.mediaUrl}
          alt={card.title}
          fill
          sizes="(max-width: 768px) 72vw, 320px"
          className="object-cover pointer-events-none transition-transform duration-700 group-hover:scale-110"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
        <div className="h-full w-full rounded-2xl [background:radial-gradient(260px_circle_at_center,rgba(212,32,106,0.5)_0%,rgba(212,32,106,0.2)_35%,transparent_68%)] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] [-webkit-mask-composite:xor] p-[3px]" />
      </div>
      <div className="relative z-10 flex h-full items-end p-5">
        <div className="space-y-2">
          {card.mediaType === "video" ? (
            <span className="inline-flex rounded-full border border-[#f3377f]/50 bg-black/50 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-[#f3377f]">
              Reel
            </span>
          ) : null}
          <h4 className="text-white text-lg font-semibold tracking-wide">{card.title}</h4>
        </div>
      </div>
    </motion.div>
  );
}
