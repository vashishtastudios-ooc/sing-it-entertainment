"use client";

import { useState } from "react";
import type { GoogleSettings } from "@/lib/content/types";

export default function GoogleSettingsForm({
  initial,
  apiKeyConfigured,
}: {
  initial: GoogleSettings;
  apiKeyConfigured: boolean;
}) {
  const [form, setForm] = useState(initial);
  const [flash, setFlash] = useState<{ ok: boolean; msg: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFlash(null);
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ google: form }),
    });
    setSaving(false);
    setFlash(
      res.ok
        ? { ok: true, msg: "Google settings saved." }
        : { ok: false, msg: "Could not save settings." }
    );
  };

  return (
    <form className="adm-card" onSubmit={save} style={{ marginTop: 8 }}>
      <h3>Google reviews connection</h3>
      <p style={{ color: "var(--adm-muted)", fontSize: 13, margin: "0 0 16px" }}>
        Pulls reviews from your Google Business Profile via the Places API.
        {apiKeyConfigured ? (
          <strong style={{ color: "#6ee7a0" }}> API key detected.</strong>
        ) : (
          <strong style={{ color: "#ff9aab" }}>
            {" "}
            Set GOOGLE_PLACES_API_KEY in your environment to enable importing.
          </strong>
        )}
      </p>

      {flash && (
        <div className={`adm-flash ${flash.ok ? "adm-flash--ok" : "adm-flash--err"}`}>
          {flash.msg}
        </div>
      )}

      <div className="adm-row">
        <div className="adm-field">
          <label htmlFor="placeId">Google Place ID</label>
          <input
            id="placeId"
            className="adm-input"
            value={form.placeId}
            onChange={(e) => setForm((f) => ({ ...f, placeId: e.target.value }))}
            placeholder="ChIJ…"
          />
          <p className="adm-hint">
            Find yours at developers.google.com/maps place-id finder.
          </p>
        </div>
        <div className="adm-field">
          <label htmlFor="minRating">Minimum rating to import</label>
          <select
            id="minRating"
            className="adm-select"
            value={form.minRating}
            onChange={(e) =>
              setForm((f) => ({ ...f, minRating: Number(e.target.value) }))
            }
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n}+ stars
              </option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="adm-btn" disabled={saving}>
        {saving ? "Saving…" : "Save Google settings"}
      </button>
    </form>
  );
}
