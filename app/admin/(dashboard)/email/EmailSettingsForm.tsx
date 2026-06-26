"use client";

import { useState } from "react";
import type { EmailSettings } from "@/lib/content/types";

export default function EmailSettingsForm({
  initial,
  resendConfigured,
  mailchimpConfigured,
}: {
  initial: EmailSettings;
  resendConfigured: boolean;
  mailchimpConfigured: boolean;
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
      body: JSON.stringify({ email: form }),
    });
    setSaving(false);
    setFlash(
      res.ok
        ? { ok: true, msg: "Email settings saved." }
        : { ok: false, msg: "Could not save settings." }
    );
  };

  return (
    <form className="adm-card" onSubmit={save}>
      <h3>Sending provider</h3>
      <p style={{ color: "var(--adm-muted)", fontSize: 13, margin: "0 0 16px" }}>
        Connect a provider to send campaigns. Add the API key to your environment
        (RESEND_API_KEY or MAILCHIMP_API_KEY).
      </p>

      {flash && (
        <div className={`adm-flash ${flash.ok ? "adm-flash--ok" : "adm-flash--err"}`}>
          {flash.msg}
        </div>
      )}

      <div className="adm-field">
        <label htmlFor="provider">Provider</label>
        <select
          id="provider"
          className="adm-select"
          value={form.provider}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              provider: e.target.value as EmailSettings["provider"],
            }))
          }
        >
          <option value="none">None (collect subscribers only)</option>
          <option value="resend">
            Resend {resendConfigured ? "(key detected)" : "(no key)"}
          </option>
          <option value="mailchimp">
            Mailchimp {mailchimpConfigured ? "(key detected)" : "(no key)"}
          </option>
        </select>
      </div>

      <div className="adm-row">
        <div className="adm-field">
          <label htmlFor="fromName">From name</label>
          <input
            id="fromName"
            className="adm-input"
            value={form.fromName}
            onChange={(e) => setForm((f) => ({ ...f, fromName: e.target.value }))}
          />
        </div>
        <div className="adm-field">
          <label htmlFor="fromEmail">From email</label>
          <input
            id="fromEmail"
            className="adm-input"
            type="email"
            value={form.fromEmail}
            onChange={(e) => setForm((f) => ({ ...f, fromEmail: e.target.value }))}
          />
        </div>
      </div>

      <button type="submit" className="adm-btn" disabled={saving}>
        {saving ? "Saving…" : "Save email settings"}
      </button>
    </form>
  );
}
