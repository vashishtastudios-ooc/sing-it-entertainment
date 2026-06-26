"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Testimonial } from "@/lib/content/types";

function blank(): Testimonial {
  return {
    id: `t-${Date.now()}`,
    name: "",
    role: "",
    service: "",
    image: "/images/hero-logo.jpeg",
    text: "",
    rating: 5,
    source: "manual",
    order: 0,
    published: true,
  };
}

export default function TestimonialsManager({
  initial,
}: {
  initial: Testimonial[];
}) {
  const router = useRouter();
  const [items, setItems] = useState<Testimonial[]>(initial);
  const [flash, setFlash] = useState<{ ok: boolean; msg: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [importing, setImporting] = useState(false);

  const patch = (id: string, key: keyof Testimonial, value: unknown) =>
    setItems((list) =>
      list.map((t) => (t.id === id ? { ...t, [key]: value } : t))
    );

  const remove = (id: string) =>
    setItems((list) => list.filter((t) => t.id !== id));

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    setItems((list) => {
      const next = [...list];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const save = async () => {
    setSaving(true);
    setFlash(null);
    const res = await fetch("/api/admin/testimonials", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items),
    });
    setSaving(false);
    if (res.ok) {
      setItems(await res.json());
      setFlash({ ok: true, msg: "Testimonials saved." });
      router.refresh();
    } else {
      setFlash({ ok: false, msg: "Could not save testimonials." });
    }
  };

  const importGoogle = async () => {
    setImporting(true);
    setFlash(null);
    const res = await fetch("/api/admin/testimonials/import-google", {
      method: "POST",
    });
    setImporting(false);
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setItems(data.testimonials);
      setFlash({
        ok: true,
        msg:
          data.added > 0
            ? `Imported ${data.added} new Google review(s).`
            : "No new Google reviews found.",
      });
      router.refresh();
    } else {
      setFlash({ ok: false, msg: data.error || "Google import failed." });
    }
  };

  return (
    <>
      {flash && (
        <div className={`adm-flash ${flash.ok ? "adm-flash--ok" : "adm-flash--err"}`}>
          {flash.msg}
        </div>
      )}

      <div className="adm-toolbar">
        <button type="button" className="adm-btn" onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Save all"}
        </button>
        <button
          type="button"
          className="adm-btn adm-btn--ghost"
          onClick={() => setItems((l) => [...l, blank()])}
        >
          + Add testimonial
        </button>
        <button
          type="button"
          className="adm-btn adm-btn--ghost"
          onClick={importGoogle}
          disabled={importing}
        >
          {importing ? "Importing…" : "Import from Google"}
        </button>
      </div>

      {items.length === 0 && (
        <div className="adm-card">
          <p>No testimonials yet. Add one or import from Google.</p>
        </div>
      )}

      {items.map((t, index) => (
        <div className="adm-card" key={t.id} style={{ marginBottom: 16 }}>
          <div className="adm-toolbar" style={{ marginBottom: 12 }}>
            <span
              className={`adm-badge ${
                t.source === "google" ? "adm-badge--green" : "adm-badge--muted"
              }`}
            >
              {t.source === "google" ? "Google" : "Manual"}
            </span>
            <label
              style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 13 }}
            >
              <input
                type="checkbox"
                checked={t.published}
                onChange={(e) => patch(t.id, "published", e.target.checked)}
              />
              Published
            </label>
            <span style={{ flex: 1 }} />
            <button
              type="button"
              className="adm-btn adm-btn--ghost adm-btn--sm"
              onClick={() => move(index, -1)}
              disabled={index === 0}
            >
              ↑
            </button>
            <button
              type="button"
              className="adm-btn adm-btn--ghost adm-btn--sm"
              onClick={() => move(index, 1)}
              disabled={index === items.length - 1}
            >
              ↓
            </button>
            <button
              type="button"
              className="adm-btn adm-btn--danger adm-btn--sm"
              onClick={() => remove(t.id)}
            >
              Delete
            </button>
          </div>

          <div className="adm-row">
            <div className="adm-field">
              <label>Name</label>
              <input
                className="adm-input"
                value={t.name}
                onChange={(e) => patch(t.id, "name", e.target.value)}
              />
            </div>
            <div className="adm-field">
              <label>Role / client type</label>
              <input
                className="adm-input"
                value={t.role}
                onChange={(e) => patch(t.id, "role", e.target.value)}
              />
            </div>
          </div>

          <div className="adm-row">
            <div className="adm-field">
              <label>Service / tag</label>
              <input
                className="adm-input"
                value={t.service}
                onChange={(e) => patch(t.id, "service", e.target.value)}
              />
            </div>
            <div className="adm-field">
              <label>Image path</label>
              <input
                className="adm-input"
                value={t.image}
                onChange={(e) => patch(t.id, "image", e.target.value)}
              />
            </div>
          </div>

          <div className="adm-field">
            <label>Quote</label>
            <textarea
              className="adm-textarea"
              value={t.text}
              onChange={(e) => patch(t.id, "text", e.target.value)}
            />
          </div>
        </div>
      ))}
    </>
  );
}
