"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SiteHeader from "./SiteHeader";

const eventTypes = [
  { id: "djs", label: "DJs", display: "DJs 🎧" },
  { id: "singers", label: "Singers", display: "Singers 🎤" },
  { id: "musicians", label: "Musicians", display: "Musicians 🎻" },
  { id: "dancers", label: "Dancers", display: "Dancers 💃" },
  { id: "magicians", label: "Magicians", display: "Magicians 🎩" },
  { id: "circus-performers", label: "Circus Performers", display: "Circus Performers 🎪" },
];

const audienceTypes = [
  { id: "venue", label: "I am a venue" },
  { id: "private-client", label: "I am a private client" },
];

export default function ContactPageContent() {
  const searchParams = useSearchParams();
  const [activeAudience, setActiveAudience] = useState<string>("");
  const [activeType, setActiveType] = useState<string>("");
  const [visionText, setVisionText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const getPrefillMessage = (serviceLabel: string) =>
    `I'm interested in booking ${serviceLabel} for my event.`;
  const getAudiencePrefillMessage = (audienceLabel: string) =>
    `I'm interested in learning more about your ${audienceLabel.toLowerCase()} services.`;

  useEffect(() => {
    const audienceParam = searchParams.get("audience");
    if (audienceParam) {
      const audienceMatch = audienceTypes.find((a) => a.id === audienceParam);
      if (audienceMatch) {
        setActiveAudience(audienceMatch.id);
        if (!searchParams.get("service")) {
          setVisionText(getAudiencePrefillMessage(audienceMatch.label));
        }
      }
    }

    const serviceParam = searchParams.get("service");
    if (!serviceParam) return;
    const match = eventTypes.find(
      (chip) => chip.label.toLowerCase() === serviceParam.toLowerCase()
    );
    if (match) {
      setActiveType(match.id);
      setVisionText(getPrefillMessage(match.label));
    }
  }, [searchParams]);

  return (
    <main className="contactx-page">
      <SiteHeader alwaysVisible />

      <section className="contactx-hero">
        <div className="container contactx-hero-content">
          <div className="contactx-badge">
            <span className="contactx-dot" />
            Let&apos;s Make Magic
          </div>
          <h1 className="contactx-title">
            YOUR EVENT
            <span>STARTS HERE</span>
          </h1>
          <p className="contactx-subline">
            Share your vision and we&apos;ll shape a premium entertainment
            experience across the UAE and UK.
          </p>
          <div className="contactx-trust-pills">
            <span className="contactx-trust-pill">UAE &amp; UK</span>
            <span className="contactx-trust-pill">25+ years</span>
            <span className="contactx-trust-pill">Bespoke experiences</span>
            <span className="contactx-trust-pill">Reply within 24h</span>
          </div>
        </div>
      </section>

      <section className="contactx-body container">
        <p className="contactx-label">Reach us directly</p>
        <div className="contactx-reach-grid">
          <a
            className="contactx-reach-card"
            href="https://wa.me/447949040404"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="contactx-reach-glow" />
            <div className="contactx-reach-top">
              <span className="contactx-icon-box">WA</span>
              <span className="contactx-arrow">↗</span>
            </div>
            <p className="contactx-reach-name">WhatsApp</p>
            <p className="contactx-reach-value">+44 7949 040 404</p>
          </a>

          <a className="contactx-reach-card" href="mailto:myevent@singit.uk.com">
            <div className="contactx-reach-glow" />
            <div className="contactx-reach-top">
              <span className="contactx-icon-box">@</span>
              <span className="contactx-arrow">↗</span>
            </div>
            <p className="contactx-reach-name">Email</p>
            <p className="contactx-reach-value">myevent@singit.uk.com</p>
          </a>
        </div>

        <p className="contactx-label">Or send us a brief</p>
        <form
          className="contactx-form-card"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="contactx-form-header">
            <div>
              <h2>Book your act</h2>
              <p>Fill in the details below and we&apos;ll come back to you with tailored options.</p>
            </div>
          </div>

          {/* Name + Email */}
          <div className="contactx-grid-two">
            <div className="contactx-field">
              <label className="contactx-field-label" htmlFor="cx-name">Your name</label>
              <input id="cx-name" className="contactx-input" placeholder="e.g. Sarah Khan" required />
            </div>
            <div className="contactx-field">
              <label className="contactx-field-label" htmlFor="cx-email">Email address</label>
              <input id="cx-email" className="contactx-input" type="email" placeholder="you@example.com" required />
            </div>
          </div>

          {/* Audience type */}
          <div className="contactx-chip-section">
            <p className="contactx-chip-label">Who are you?</p>
            <div className="contactx-audience-grid">
              {audienceTypes.map((audience) => (
                <button
                  type="button"
                  key={audience.id}
                  className={`contactx-chip ${activeAudience === audience.id ? "is-active" : ""}`}
                  onClick={() => {
                    setActiveAudience(audience.id);
                    if (!activeType) {
                      setVisionText(getAudiencePrefillMessage(audience.label));
                    }
                  }}
                >
                  {audience.label}
                </button>
              ))}
            </div>
          </div>

          {/* Act type */}
          <div className="contactx-chip-section">
            <p className="contactx-chip-label">What type of act are you looking for?</p>
            <div className="contactx-chip-grid">
              {eventTypes.map((chip) => (
                <button
                  type="button"
                  key={chip.id}
                  className={`contactx-chip ${activeType === chip.id ? "is-active" : ""}`}
                  onClick={() => {
                    setActiveType(chip.id);
                    setVisionText(getPrefillMessage(chip.label));
                  }}
                >
                  {chip.display}
                </button>
              ))}
            </div>
          </div>

          {/* Date + Location */}
          <div className="contactx-grid-two">
            <div className="contactx-field">
              <label className="contactx-field-label" htmlFor="cx-date">Event date</label>
              <input id="cx-date" className="contactx-input" type="date" />
            </div>
            <div className="contactx-field">
              <label className="contactx-field-label" htmlFor="cx-location">Location / venue</label>
              <input id="cx-location" className="contactx-input" placeholder="e.g. Dubai, London…" />
            </div>
          </div>

          {/* Vision */}
          <div className="contactx-field" style={{ marginBottom: 0 }}>
            <label className="contactx-field-label" htmlFor="cx-vision">Tell us your vision</label>
            <textarea
              id="cx-vision"
              className="contactx-textarea"
              placeholder="Describe your event, guest count, atmosphere, any specific requests…"
              value={visionText}
              onChange={(e) => setVisionText(e.target.value)}
            />
          </div>

          <p className="contactx-note">
            Your details are kept strictly confidential and used only to prepare your proposal.
          </p>

          <button
            type="submit"
            className={`contactx-submit ${submitted ? "is-success" : ""}`}
            disabled={submitted}
          >
            {submitted ? "✓ Sent — we'll be in touch soon" : "Send Brief"}
          </button>
        </form>
      </section>

      <footer className="contactx-footer">
        <div className="container contactx-footer-row">
          <p className="contactx-brand">© Sing It Entertainment</p>
          <div className="contactx-socials">
            <a href="#" aria-label="LinkedIn" className="contactx-social">in</a>
            <a href="https://www.facebook.com/singitentertainment" aria-label="Facebook" className="contactx-social">f</a>
            <a href="https://www.instagram.com/singitentertainment/" aria-label="Instagram" className="contactx-social">ig</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
