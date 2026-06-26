"use client";

import { useState } from "react";
import type { InstagramSettings } from "@/lib/content/types";

export default function InstagramSettingsForm({
  initial,
  tokenConfigured,
}: {
  initial: InstagramSettings;
  tokenConfigured: boolean;
}) {
  const [form, setForm] = useState(initial);
  const [flash, setFlash] = useState<{ ok: boolean; msg: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFlash(null);
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ instagram: form }),
    });
    setSaving(false);
    setFlash(
      res.ok
        ? { ok: true, msg: "Instagram settings saved." }
        : { ok: false, msg: "Could not save settings." }
    );
  };

  const test = async () => {
    setTesting(true);
    setFlash(null);
    const res = await fetch("/api/admin/instagram/test", { method: "POST" });
    const data = await res.json().catch(() => ({}));
    setTesting(false);
    setFlash(
      res.ok
        ? { ok: true, msg: `Connected — found ${data.count} posts.` }
        : { ok: false, msg: data.error || "Connection failed." }
    );
  };

  return (
    <form className="adm-card" onSubmit={save}>
      <h3>Instagram connection</h3>
      <p style={{ color: "var(--adm-muted)", fontSize: 13, margin: "0 0 16px" }}>
        Shows your latest Instagram posts on the site via the Instagram Graph
        API.
        {tokenConfigured ? (
          <strong style={{ color: "#6ee7a0" }}> Access token detected.</strong>
        ) : (
          <strong style={{ color: "#ff9aab" }}>
            {" "}
            Set INSTAGRAM_ACCESS_TOKEN in your environment to connect.
          </strong>
        )}
      </p>

      {flash && (
        <div className={`adm-flash ${flash.ok ? "adm-flash--ok" : "adm-flash--err"}`}>
          {flash.msg}
        </div>
      )}

      <div className="adm-field">
        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="checkbox"
            checked={form.enabled}
            onChange={(e) =>
              setForm((f) => ({ ...f, enabled: e.target.checked }))
            }
          />
          Show Instagram feed on the website
        </label>
      </div>

      <div className="adm-row">
        <div className="adm-field">
          <label htmlFor="username">Instagram username</label>
          <input
            id="username"
            className="adm-input"
            value={form.username}
            onChange={(e) =>
              setForm((f) => ({ ...f, username: e.target.value }))
            }
            placeholder="singitentertainment"
          />
          <p className="adm-hint">Used for the “Follow us” link.</p>
        </div>
        <div className="adm-field">
          <label htmlFor="limit">Number of posts to show</label>
          <input
            id="limit"
            className="adm-input"
            type="number"
            min={1}
            max={24}
            value={form.limit}
            onChange={(e) =>
              setForm((f) => ({ ...f, limit: Number(e.target.value) }))
            }
          />
        </div>
      </div>

      <div className="adm-toolbar" style={{ marginBottom: 0 }}>
        <button type="submit" className="adm-btn" disabled={saving}>
          {saving ? "Saving…" : "Save Instagram settings"}
        </button>
        <button
          type="button"
          className="adm-btn adm-btn--ghost"
          onClick={test}
          disabled={testing}
        >
          {testing ? "Testing…" : "Test connection"}
        </button>
      </div>
    </form>
  );
}
