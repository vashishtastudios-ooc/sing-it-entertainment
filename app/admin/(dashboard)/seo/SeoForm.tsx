"use client";

import { useState } from "react";
import type { HomeSeo } from "@/lib/content/types";

export default function SeoForm({ initial }: { initial: HomeSeo }) {
  const [form, setForm] = useState<HomeSeo>(initial);
  const [keywords, setKeywords] = useState(initial.keywords.join(", "));
  const [flash, setFlash] = useState<{ ok: boolean; msg: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const update = (key: keyof HomeSeo, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFlash(null);
    const payload: HomeSeo = {
      ...form,
      keywords: keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
    };
    const res = await fetch("/api/admin/seo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    setFlash(
      res.ok
        ? { ok: true, msg: "Homepage SEO saved." }
        : { ok: false, msg: "Could not save. Try again." }
    );
  };

  return (
    <form onSubmit={save}>
      {flash && (
        <div className={`adm-flash ${flash.ok ? "adm-flash--ok" : "adm-flash--err"}`}>
          {flash.msg}
        </div>
      )}

      <div className="adm-card">
        <div className="adm-field">
          <label htmlFor="title">Meta title</label>
          <input
            id="title"
            className="adm-input"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            maxLength={70}
          />
          <p className="adm-hint">{form.title.length}/70 characters recommended</p>
        </div>

        <div className="adm-field">
          <label htmlFor="description">Meta description</label>
          <textarea
            id="description"
            className="adm-textarea"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            maxLength={180}
          />
          <p className="adm-hint">
            {form.description.length}/160 characters recommended
          </p>
        </div>

        <div className="adm-field">
          <label htmlFor="keywords">Keywords</label>
          <textarea
            id="keywords"
            className="adm-textarea"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <p className="adm-hint">Comma-separated list.</p>
        </div>

        <div className="adm-row">
          <div className="adm-field">
            <label htmlFor="ogImage">Social share image (OG image)</label>
            <input
              id="ogImage"
              className="adm-input"
              value={form.ogImage}
              onChange={(e) => update("ogImage", e.target.value)}
              placeholder="/images/hero-logo.jpeg"
            />
            <p className="adm-hint">Path or full URL.</p>
          </div>
          <div className="adm-field">
            <label htmlFor="ogImageAlt">Image alt text</label>
            <input
              id="ogImageAlt"
              className="adm-input"
              value={form.ogImageAlt}
              onChange={(e) => update("ogImageAlt", e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="adm-btn" disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
