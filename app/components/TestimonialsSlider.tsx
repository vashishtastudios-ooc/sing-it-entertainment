"use client";

import { useState } from "react";
import Image from "next/image";

export type TestimonialItem = {
  name: string;
  role: string;
  service: string;
  image: string;
  text: string;
};

type TestimonialsSliderProps = {
  items: TestimonialItem[];
};

export default function TestimonialsSlider({ items }: TestimonialsSliderProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const prev = () => {
    setDirection("prev");
    setIndex((current) => (current - 1 + items.length) % items.length);
  };

  const next = () => {
    setDirection("next");
    setIndex((current) => (current + 1) % items.length);
  };

  const goTo = (itemIndex: number) => {
    if (itemIndex === index) return;
    setDirection(itemIndex > index ? "next" : "prev");
    setIndex(itemIndex);
  };

  if (!items.length) return null;

  return (
    <div className="testimonial-slider-wrap">
      <article
        key={index}
        className={`testimonial-card testimonial-single ${
          direction === "next" ? "testimonial-enter-next" : "testimonial-enter-prev"
        }`}
      >
        <div className="testimonial-media">
          <Image
            src={items[index].image}
            alt={`${items[index].name} event`}
            fill
            sizes="(max-width: 760px) 100vw, 340px"
            className="testimonial-media-image"
          />
          <div className="testimonial-media-overlay" />
          <span className="testimonial-media-tag">{items[index].service}</span>
        </div>

        <div className="testimonial-content">
          <span className="testimonial-quote-mark" aria-hidden="true">
            &ldquo;
          </span>
          <p>{items[index].text}</p>
          <div className="testimonial-meta">
            <h3>{items[index].name}</h3>
            <span>{items[index].role}</span>
          </div>
        </div>
      </article>

      <div className="testimonial-nav">
        <button type="button" className="testimonial-nav-btn" onClick={prev} aria-label="Previous testimonial">
          Previous
        </button>
        <span className="testimonial-count">
          {index + 1} / {items.length}
        </span>
        <button type="button" className="testimonial-nav-btn" onClick={next} aria-label="Next testimonial">
          Next
        </button>
      </div>

      <div className="testimonial-thumb-row" aria-label="Select testimonial">
        {items.map((item, itemIndex) => (
          <button
            key={item.name}
            type="button"
            className={`testimonial-thumb ${itemIndex === index ? "is-active" : ""}`}
            onClick={() => goTo(itemIndex)}
            aria-label={`View testimonial from ${item.name}`}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="56px"
              className="testimonial-thumb-image"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
