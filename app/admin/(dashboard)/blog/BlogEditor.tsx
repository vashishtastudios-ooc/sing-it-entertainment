"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/lib/content/types";

type Props = { post?: BlogPost };

const empty: Omit<BlogPost, "id" | "createdAt" | "updatedAt" | "publishedAt"> = {
  title: "",
  slug: "",
  excerpt: "",
  coverImage: "",
  body: "",
  tags: [],
  author: "Sing It Entertainment",
  status: "draft",
  seoTitle: "",
  seoDescription: "",
};

export default function BlogEditor({ post }: Props) {
  const router = useRouter();
  const isEdit = Boolean(post);
  const [form, setForm] = useState({
    ...empty,
    ...post,
  });
  const [tags, setTags] = useState((post?.tags ?? []).join(", "));
  const [flash, setFlash] = useState<{ ok: boolean; msg: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const update = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = async (status: "draft" | "published") => {
    setSaving(true);
    setFlash(null);
    const payload = {
      ...form,
      status,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      ...(post ? { id: post.id } : {}),
    };
    const res = await fetch("/api/admin/blog", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      router.push("/admin/blog");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setFlash({ ok: false, msg: data.error || "Could not save the post." });
    }
  };

  return (
    <>
      <div className="adm-header">
        <div>
          <h1 className="adm-title">{isEdit ? "Edit post" : "New post"}</h1>
          <p className="adm-subtitle">
            Write in Markdown — headings, lists, links and quotes are supported.
          </p>
        </div>
      </div>

      {flash && (
        <div className={`adm-flash ${flash.ok ? "adm-flash--ok" : "adm-flash--err"}`}>
          {flash.msg}
        </div>
      )}

      <div className="adm-card">
        <div className="adm-field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            className="adm-input"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
          />
        </div>

        <div className="adm-row">
          <div className="adm-field">
            <label htmlFor="slug">URL slug</label>
            <input
              id="slug"
              className="adm-input"
              value={form.slug}
              onChange={(e) => update("slug", e.target.value)}
              placeholder="auto-generated from title"
            />
            <p className="adm-hint">Leave blank to generate from the title.</p>
          </div>
          <div className="adm-field">
            <label htmlFor="author">Author</label>
            <input
              id="author"
              className="adm-input"
              value={form.author}
              onChange={(e) => update("author", e.target.value)}
            />
          </div>
        </div>

        <div className="adm-field">
          <label htmlFor="coverImage">Cover image</label>
          <input
            id="coverImage"
            className="adm-input"
            value={form.coverImage}
            onChange={(e) => update("coverImage", e.target.value)}
            placeholder="/images/blog/my-post.webp or https://…"
          />
        </div>

        <div className="adm-field">
          <label htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            className="adm-textarea"
            style={{ minHeight: 70 }}
            value={form.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
          />
          <p className="adm-hint">Short summary shown on the blog listing.</p>
        </div>

        <div className="adm-field">
          <label htmlFor="body">Content (Markdown)</label>
          <textarea
            id="body"
            className="adm-textarea"
            style={{ minHeight: 320, fontFamily: "ui-monospace, monospace" }}
            value={form.body}
            onChange={(e) => update("body", e.target.value)}
          />
        </div>

        <div className="adm-field">
          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            className="adm-input"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Weddings, Planning"
          />
          <p className="adm-hint">Comma-separated.</p>
        </div>
      </div>

      <div className="adm-card" style={{ marginTop: 18 }}>
        <h3>SEO</h3>
        <div className="adm-field">
          <label htmlFor="seoTitle">SEO title</label>
          <input
            id="seoTitle"
            className="adm-input"
            value={form.seoTitle}
            onChange={(e) => update("seoTitle", e.target.value)}
            placeholder="Defaults to the post title"
          />
        </div>
        <div className="adm-field">
          <label htmlFor="seoDescription">SEO description</label>
          <textarea
            id="seoDescription"
            className="adm-textarea"
            style={{ minHeight: 70 }}
            value={form.seoDescription}
            onChange={(e) => update("seoDescription", e.target.value)}
            placeholder="Defaults to the excerpt"
          />
        </div>
      </div>

      <div className="adm-toolbar" style={{ marginTop: 20 }}>
        <button
          type="button"
          className="adm-btn"
          onClick={() => submit("published")}
          disabled={saving || !form.title.trim()}
        >
          {saving ? "Saving…" : "Publish"}
        </button>
        <button
          type="button"
          className="adm-btn adm-btn--ghost"
          onClick={() => submit("draft")}
          disabled={saving || !form.title.trim()}
        >
          Save as draft
        </button>
        <button
          type="button"
          className="adm-btn adm-btn--ghost"
          onClick={() => router.push("/admin/blog")}
        >
          Cancel
        </button>
      </div>
    </>
  );
}
