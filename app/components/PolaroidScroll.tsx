"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Polaroid = {
  src: string;
  caption: string;
  rotate: number;
};

const rotates = [-5, 3, -2, 4, -4, 2, -3, 5];
const captions = [
  "The doors open, hearts race.",
  "A hush falls over the room.",
  "First spotlight. First heartbeat.",
  "The rhythm takes the floor.",
  "Glances turn into smiles.",
  "Voices rise with the chorus.",
  "Every frame feels cinematic.",
  "Moments become memories.",
  "Backstage buzz, quiet confidence.",
  "Curtains breathe before the drop.",
  "Soundcheck turns into magic.",
  "A perfect cue, right on time.",
  "The night finds its pulse.",
  "Neon reflections, soft laughter.",
  "The crowd leans in closer.",
  "Champagne and city lights.",
  "Hands up, worries down.",
  "Another chorus, even louder.",
  "A dancefloor in full bloom.",
  "Stories told through movement.",
  "Every artist in sync.",
  "Every guest part of the show.",
  "From spark to spectacle.",
  "Bespoke moments, beautifully staged.",
  "Music wrapping every corner.",
  "A standing ovation in motion.",
  "The camera catches the feeling.",
  "Sound, light, and wonder.",
  "A chapter of pure energy.",
  "Golden hour turns electric.",
  "Drums, strings, and applause.",
  "The room glows in rhythm.",
  "A toast to unforgettable nights.",
  "Late-night magic, still rising.",
  "Encore echoes through the hall.",
  "One more song. One more smile.",
  "The final beat lands softly.",
  "Lights dim, hearts stay full.",
  "The night lingers in memory.",
  "Until the next celebration.",
];

const polaroids: Polaroid[] = Array.from({ length: 40 }, (_, i) => ({
  src: `/images/gallery/gallery-${i + 1}.webp`,
  caption: captions[i % captions.length],
  rotate: rotates[i % rotates.length],
}));

export default function PolaroidScroll() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      const track = trackRef.current;
      if (!el || !track) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // translate the track from 0 to -(trackWidth - viewportWidth)
  const trackWidth = trackRef.current?.scrollWidth ?? 0;
  const viewportWidth = wrapperRef.current?.clientWidth ?? 0;
  const maxTranslate = Math.max(trackWidth - viewportWidth, 0);
  const x = -progress * maxTranslate;

  return (
    <section
      ref={wrapperRef}
      className="relative w-full bg-[#f4efe6] dark:bg-[#0b0b0b]"
      style={{ height: "320vh" }}
      aria-label="Polaroid film strip"
    >
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        {/* film perforations top */}
        <div className="pointer-events-none absolute inset-x-0 top-6 flex h-6 gap-3 px-6 opacity-70">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={`t-${i}`}
              className="h-full flex-1 rounded-[3px] bg-black/80 dark:bg-white/20"
            />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex h-6 gap-3 px-6 opacity-70">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={`b-${i}`}
              className="h-full flex-1 rounded-[3px] bg-black/80 dark:bg-white/20"
            />
          ))}
        </div>

        {/* film body */}
        <div className="relative w-full bg-neutral-900 py-20 dark:bg-neutral-950">
          <div
            ref={trackRef}
            className="flex items-center gap-10 px-[20vw] will-change-transform"
            style={{
              transform: `translate3d(${x}px, 0, 0)`,
              transition: "transform 120ms linear",
            }}
          >
            {polaroids.map((p, i) => (
              <figure
                key={i}
                className="shrink-0 rounded-sm bg-white p-4 pb-14 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
                style={{
                  transform: `rotate(${p.rotate}deg)`,
                  width: "clamp(220px, 22vw, 340px)",
                }}
              >
                <div className="relative aspect-square w-full overflow-hidden bg-neutral-200">
                  <Image
                    src={p.src}
                    alt={p.caption}
                    fill
                    sizes="(max-width: 768px) 220px, (max-width: 1200px) 22vw, 340px"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <figcaption
                  className="polaroid-caption mt-4 text-center font-[cursive] text-lg text-neutral-800"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  {p.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          {/* scroll hint */}
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/60">
            scroll →
          </div>
        </div>
      </div>
    </section>
  );
}
