"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Subscriber } from "@/lib/content/types";

export default function SubscribersManager({
  initial,
}: {
  initial: Subscriber[];
}) {
  const router = useRouter();
  const [subs, setSubs] = useState(initial);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [flash, setFlash] = useState<{ ok: boolean; msg: string } | null>(null);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    setFlash(null);
    const res = await fetch("/api/admin/subscribers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setSubs((s) => [data, ...s]);
      setEmail("");
      setName("");
      router.refresh();
    } else {
      setFlash({ ok: false, msg: data.error || "Could not add subscriber." });
    }
  };

  const remove = async (sub: Subscriber) => {
    if (!confirm(`Remove ${sub.email}?`)) return;
    const res = await fetch(`/api/admin/subscribers?id=${sub.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setSubs((s) => s.filter((x) => x.id !== sub.id));
      router.refresh();
    }
  };

  return (
    <>
      {flash && (
        <div className={`adm-flash ${flash.ok ? "adm-flash--ok" : "adm-flash--err"}`}>
          {flash.msg}
        </div>
      )}

      <form className="adm-card" onSubmit={add} style={{ marginBottom: 20 }}>
        <h3>Add subscriber</h3>
        <div className="adm-row">
          <div className="adm-field" style={{ marginBottom: 0 }}>
            <label>Email</label>
            <input
              className="adm-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="adm-field" style={{ marginBottom: 0 }}>
            <label>Name (optional)</label>
            <input
              className="adm-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="adm-btn" style={{ marginTop: 16 }}>
          Add
        </button>
      </form>

      <div className="adm-toolbar">
        <strong>{subs.length} subscribers</strong>
        <span style={{ flex: 1 }} />
        <a
          className="adm-btn adm-btn--ghost"
          href="/api/admin/subscribers/export"
        >
          Export CSV
        </a>
      </div>

      {subs.length === 0 ? (
        <div className="adm-card">
          <p>No subscribers yet.</p>
        </div>
      ) : (
        <table className="adm-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Status</th>
              <th>Source</th>
              <th>Joined</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {subs.map((s) => (
              <tr key={s.id}>
                <td>{s.email}</td>
                <td>{s.name || "—"}</td>
                <td>
                  <span
                    className={`adm-badge ${
                      s.status === "subscribed"
                        ? "adm-badge--green"
                        : "adm-badge--muted"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td>{s.source}</td>
                <td>{new Date(s.createdAt).toLocaleDateString("en-GB")}</td>
                <td>
                  <button
                    type="button"
                    className="adm-btn adm-btn--danger adm-btn--sm"
                    onClick={() => remove(s)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
