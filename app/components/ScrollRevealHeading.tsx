"use client";

import { useEffect, useRef, useState } from "react";

type ScrollRevealHeadingProps = {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export default function ScrollRevealHeading({
  text,
  as = "h2",
  className = "",
}: ScrollRevealHeadingProps) {
  const Comp = as;
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.35 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Comp
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={`scroll-reveal-heading ${visible ? "is-visible" : ""} ${className}`}
    >
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="scroll-reveal-char"
          style={{ transitionDelay: `${i * 16}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Comp>
  );
}
