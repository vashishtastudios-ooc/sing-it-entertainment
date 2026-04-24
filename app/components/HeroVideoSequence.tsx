"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const AUTO_SCROLL_DELAY_MS = 4000;
const TRANSITION_DURATION_MS = 1000;
const WHEEL_COOLDOWN_MS = 150;

export default function HeroVideoSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAutoScrolledRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const lastWheelAtRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const [videoTwoSrc, setVideoTwoSrc] = useState("/videos/hero-2.mp4");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const secondPanelY = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const firstPanelScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const firstPanelOpacity = useTransform(scrollYProgress, [0.5, 0.95], [1, 0.4]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animateScrollTo = (targetY: number, duration = TRANSITION_DURATION_MS) => {
      if (isAnimatingRef.current) return;
      const startY = window.scrollY;
      const distance = targetY - startY;
      if (Math.abs(distance) < 2) return;

      isAnimatingRef.current = true;
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        window.scrollTo(0, startY + distance * easeInOutCubic(t));
        if (t < 1) {
          rafIdRef.current = window.requestAnimationFrame(step);
        } else {
          isAnimatingRef.current = false;
          rafIdRef.current = null;
          lastWheelAtRef.current = performance.now();
        }
      };

      rafIdRef.current = window.requestAnimationFrame(step);
    };

    const getHeroBounds = () => {
      const container = containerRef.current;
      if (!container) return null;
      const rect = container.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const bottom = top + container.offsetHeight - window.innerHeight;
      return { top, bottom };
    };

    const section = containerRef.current;

    const handleWheel = (event: WheelEvent) => {
      const bounds = getHeroBounds();
      if (!bounds) return;
      const currentY = window.scrollY;
      const inHero = currentY >= bounds.top - 2 && currentY <= bounds.bottom + 2;
      if (!inHero) return;

      if (isAnimatingRef.current) {
        event.preventDefault();
        return;
      }

      const now = performance.now();
      if (now - lastWheelAtRef.current < WHEEL_COOLDOWN_MS) {
        event.preventDefault();
        return;
      }

      const goingDown = event.deltaY > 0;
      const goingUp = event.deltaY < 0;

      if (goingDown && currentY < bounds.bottom - 4) {
        event.preventDefault();
        hasAutoScrolledRef.current = true;
        lastWheelAtRef.current = now;
        animateScrollTo(bounds.bottom);
      } else if (goingUp && currentY > bounds.top + 4) {
        event.preventDefault();
        hasAutoScrolledRef.current = true;
        lastWheelAtRef.current = now;
        animateScrollTo(bounds.top);
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (isAnimatingRef.current) return;
      const bounds = getHeroBounds();
      if (!bounds) return;
      const currentY = window.scrollY;
      const inHero = currentY >= bounds.top - 2 && currentY <= bounds.bottom + 2;
      if (!inHero) return;

      const downKeys = ["ArrowDown", "PageDown", " ", "Spacebar"];
      const upKeys = ["ArrowUp", "PageUp"];

      if (downKeys.includes(event.key) && currentY < bounds.bottom - 4) {
        event.preventDefault();
        hasAutoScrolledRef.current = true;
        animateScrollTo(bounds.bottom);
      } else if (upKeys.includes(event.key) && currentY > bounds.top + 4) {
        event.preventDefault();
        hasAutoScrolledRef.current = true;
        animateScrollTo(bounds.top);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };
    const handleTouchMove = (event: TouchEvent) => {
      const bounds = getHeroBounds();
      if (!bounds) return;
      const currentY = window.scrollY;
      const inHero = currentY >= bounds.top - 2 && currentY <= bounds.bottom + 2;
      if (!inHero) return;

      if (isAnimatingRef.current) {
        event.preventDefault();
        return;
      }
      const touchY = event.touches[0]?.clientY ?? touchStartY;
      const deltaY = touchStartY - touchY;
      if (Math.abs(deltaY) < 20) return;

      if (deltaY > 0 && currentY < bounds.bottom - 4) {
        event.preventDefault();
        hasAutoScrolledRef.current = true;
        animateScrollTo(bounds.bottom);
      } else if (deltaY < 0 && currentY > bounds.top + 4) {
        event.preventDefault();
        hasAutoScrolledRef.current = true;
        animateScrollTo(bounds.top);
      }
    };

    const target: HTMLElement = section ?? document.documentElement;
    target.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    window.addEventListener("keydown", handleKey);
    target.addEventListener("touchstart", handleTouchStart, { passive: true });
    target.addEventListener("touchmove", handleTouchMove, { passive: false });

    const timerId = window.setTimeout(() => {
      if (hasAutoScrolledRef.current) return;
      const bounds = getHeroBounds();
      if (!bounds) return;
      hasAutoScrolledRef.current = true;
      animateScrollTo(bounds.bottom, 1300);
    }, AUTO_SCROLL_DELAY_MS);

    return () => {
      window.clearTimeout(timerId);
      if (rafIdRef.current !== null) window.cancelAnimationFrame(rafIdRef.current);
      target.removeEventListener("wheel", handleWheel, { capture: true } as EventListenerOptions);
      window.removeEventListener("keydown", handleKey);
      target.removeEventListener("touchstart", handleTouchStart);
      target.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <section id="home" className="hero-vseq" ref={containerRef}>
      <div className="hero-vseq-sticky">
        <motion.div
          className="hero-vseq-panel hero-vseq-panel-one"
          style={{ scale: firstPanelScale, opacity: firstPanelOpacity }}
        >
          <video
            className="hero-vseq-video"
            src="/videos/hero-1.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="hero-vseq-overlay" />
          <div className="container hero-vseq-content">
            <p className="eyebrow">SING IT ENTERTAINMENT</p>
            <h1 className="hero-vseq-title">
              UNFORGETTABLE
              <br />
              EVENTS.
            </h1>
            <p className="hero-vseq-sub">World-class talent. UK &amp; UAE.</p>
            <Link href="/contact" className="hero-star-btn" aria-label="Get in touch">
              <span className="hero-star-sweep hero-star-sweep-top" />
              <span className="hero-star-sweep hero-star-sweep-bottom" />
              <span className="hero-star-inner">GET IN TOUCH</span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="hero-vseq-panel hero-vseq-panel-two"
          style={{ y: secondPanelY }}
        >
          <video
            className="hero-vseq-video"
            src={videoTwoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setVideoTwoSrc("/videos/hero-1.mp4")}
          />
          <div className="hero-vseq-overlay hero-vseq-overlay-strong" />
          <div className="container hero-vseq-content">
            <p className="eyebrow">MAKING MOMENTS UNFORGETTABLE</p>
            <h2 className="hero-vseq-title hero-vseq-title-secondary">
              YOUR GO-TO AGENCY
              <br />
              FOR EXCEPTIONAL
              <br />
              EVENTS.
            </h2>
            <p className="hero-vseq-sub">
              Corporate. Private. Public. World-class talent across the UK &amp; UAE.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
