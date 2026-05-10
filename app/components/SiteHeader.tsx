"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { servicePages } from "../services/data";

export default function SiteHeader({ alwaysVisible = false }: { alwaysVisible?: boolean }) {
  const [isVisible, setIsVisible] = useState(alwaysVisible);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className={`top-nav top-nav--reveal ${isVisible ? "is-visible" : "is-hidden"} ${isMenuOpen ? "is-menu-open" : ""}`}>
        <div className="container nav-inner">
          <Link href="/" className="logo" onClick={closeMenu}>
            <img
              src="/images/logos/sing-it-logo-excon-trans.webp"
              alt="SING IT"
              width={140}
              height={46}
              className="logo-image"
            />
          </Link>

          <nav className="simple-links" aria-label="Primary navigation">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/for-venues">For Venues</Link>
            <Link href="/private-clients">Private Clients</Link>
            <div className="nav-services-menu">
              <Link href="/services">Services</Link>
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

          <button
            type="button"
            className={`mobile-nav-toggle ${isMenuOpen ? "is-open" : ""}`}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="mobile-nav-bar mobile-nav-bar-1" />
            <span className="mobile-nav-bar mobile-nav-bar-2" />
            <span className="mobile-nav-bar mobile-nav-bar-3" />
          </button>
        </div>
      </header>

      <div
        id="mobile-nav-drawer"
        className={`mobile-nav-drawer ${isMenuOpen ? "is-open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <button
          type="button"
          className="mobile-nav-backdrop"
          aria-label="Close menu"
          tabIndex={isMenuOpen ? 0 : -1}
          onClick={closeMenu}
        />
        <nav className="mobile-nav-panel" aria-label="Mobile navigation">
          <div className="mobile-nav-body">
            <button
              type="button"
              className="mobile-nav-close-btn"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
              Close
            </button>
            <div className="mobile-nav-list">
              <Link href="/" className="mobile-nav-link" onClick={closeMenu}>Home</Link>
              <Link href="/about" className="mobile-nav-link" onClick={closeMenu}>About</Link>
              <Link href="/for-venues" className="mobile-nav-link" onClick={closeMenu}>For Venues</Link>
              <Link href="/private-clients" className="mobile-nav-link" onClick={closeMenu}>Private Clients</Link>
              <Link href="/services" className="mobile-nav-link" onClick={closeMenu}>Services</Link>
              <div className="mobile-nav-services">
                {servicePages.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="mobile-nav-sublink"
                    onClick={closeMenu}
                  >
                    {service.shortTitle}
                  </Link>
                ))}
              </div>
              <Link href="/contact" className="mobile-nav-cta" onClick={closeMenu}>Contact</Link>
            </div>
          </div>
          <div className="mobile-nav-footer">
            <a href="tel:+447949040404" className="mobile-nav-foot-link" onClick={closeMenu}>
              +44 7949 040 404
            </a>
            <a href="mailto:myevent@singit.uk.com" className="mobile-nav-foot-link" onClick={closeMenu}>
              myevent@singit.uk.com
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
