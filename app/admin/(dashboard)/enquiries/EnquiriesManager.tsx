"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ContactStatus, ContactSubmission } from "@/lib/content/types";

const statusBadge: Record<ContactStatus, string> = {
  new: "adm-badge--green",
  read: "adm-badge--muted",
  archived: "adm-badge--muted",
};

export default function EnquiriesManager({
  initial,
}: {
  initial: ContactSubmission[];
}) {
  const router = useRouter();
  const [items, setItems] = useState(initial);

  const changeStatus = async (id: string, status: ContactStatus) => {
    setItems((list) =>
      list.map((x) => (x.id === id ? { ...x, status } : x))
    );
    await fetch("/api/admin/enquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    router.refresh();
  };

  const remove = async (item: ContactSubmission) => {
    if (!confirm(`Delete enquiry from ${item.name}?`)) return;
    await fetch(`/api/admin/enquiries?id=${item.id}`, { method: "DELETE" });
    setItems((list) => list.filter((x) => x.id !== item.id));
    router.refresh();
  };

  if (!items.length) {
    return (
      <div className="adm-card">
        <p>No enquiries yet. Submissions from the contact form will appear here.</p>
      </div>
    );
  }

  return (
    <div>
      {items.map((item) => (
        <div className="adm-card" key={item.id} style={{ marginBottom: 14 }}>
          <div className="adm-toolbar" style={{ marginBottom: 10 }}>
            <strong style={{ fontSize: 15 }}>{item.name}</strong>
            <span className={`adm-badge ${statusBadge[item.status]}`}>
              {item.status}
            </span>
            <span style={{ flex: 1 }} />
            <span style={{ color: "var(--adm-muted)", fontSize: 13 }}>
              {new Date(item.createdAt).toLocaleString("en-GB")}
            </span>
          </div>

          <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--adm-muted)" }}>
            {[
              item.email,
              item.audience,
              item.actType,
              item.eventDate,
              item.location,
            ]
              .filter(Boolean)
              .join("  ·  ")}
          </p>

          {item.message && (
            <div
              style={{
                whiteSpace: "pre-wrap",
                fontSize: 14,
                lineHeight: 1.6,
                background: "var(--adm-panel-2)",
                border: "1px solid var(--adm-border)",
                borderRadius: 8,
                padding: "10px 12px",
                marginBottom: 12,
              }}
            >
              {item.message}
            </div>
          )}

          <div className="adm-list-actions">
            <a
              className="adm-btn adm-btn--sm"
              href={`mailto:${item.email}?subject=${encodeURIComponent(
                "Re: your Sing It Entertainment enquiry"
              )}`}
            >
              Reply
            </a>
            {item.status !== "read" && (
              <button
                type="button"
                className="adm-btn adm-btn--ghost adm-btn--sm"
                onClick={() => changeStatus(item.id, "read")}
              >
                Mark read
              </button>
            )}
            {item.status !== "archived" && (
              <button
                type="button"
                className="adm-btn adm-btn--ghost adm-btn--sm"
                onClick={() => changeStatus(item.id, "archived")}
              >
                Archive
              </button>
            )}
            <button
              type="button"
              className="adm-btn adm-btn--danger adm-btn--sm"
              onClick={() => remove(item)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
