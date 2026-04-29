"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { servicePages } from "../services/data";

export default function SiteHeader({ alwaysVisible = false }: { alwaysVisible?: boolean }) {
  const [isVisible, setIsVisible] = useState(alwaysVisible);

  useEffect(() => {
    if (alwaysVisible) return;
    if (typeof window === "undefined") return;

    const updateVisibility = () => {
      const threshold = window.innerHeight * 0.6;
      setIsVisible(window.scrollY > threshold);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, [alwaysVisible]);

  return (
    <header className={`top-nav top-nav--reveal ${isVisible ? "is-visible" : "is-hidden"}`}>
      <div className="container nav-inner">
        <Link href="/" className="logo">
          <img
            src="/images/logos/sing-it-logo-excon-trans.webp"
            alt="SING IT"
            width={140}
            height={46}
            className="logo-image"
          />
        </Link>
        <nav className="simple-links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/for-venues">For Venues</Link>
          <div className="nav-services-menu">
            <a href="#services">Services</a>
            <div className="nav-services-dropdown">
              {servicePages.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} className="nav-services-item">
                  {service.shortTitle}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
