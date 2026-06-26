"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/lib/content/types";

export default function BlogList({ initial }: { initial: BlogPost[] }) {
  const router = useRouter();
  const [posts, setPosts] = useState(initial);
  const [busy, setBusy] = useState<string | null>(null);

  const remove = async (post: BlogPost) => {
    if (!confirm(`Delete “${post.title}”? This cannot be undone.`)) return;
    setBusy(post.id);
    const res = await fetch(`/api/admin/blog?id=${post.id}`, {
      method: "DELETE",
    });
    setBusy(null);
    if (res.ok) {
      setPosts((p) => p.filter((x) => x.id !== post.id));
      router.refresh();
    }
  };

  if (!posts.length) {
    return (
      <div className="adm-card">
        <p>No posts yet. Create your first article.</p>
      </div>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <div className="adm-list-item" key={post.id}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="adm-thumb"
            src={post.coverImage || "/images/hero-logo.jpeg"}
            alt=""
          />
          <div className="adm-list-body">
            <h3>{post.title}</h3>
            <p className="adm-meta">
              <span
                className={`adm-badge ${
                  post.status === "published"
                    ? "adm-badge--green"
                    : "adm-badge--muted"
                }`}
              >
                {post.status}
              </span>{" "}
              /{post.slug}
            </p>
            <p className="adm-excerpt">{post.excerpt}</p>
          </div>
          <div className="adm-list-actions">
            <Link
              className="adm-btn adm-btn--ghost adm-btn--sm"
              href={`/admin/blog/${post.id}`}
            >
              Edit
            </Link>
            <button
              type="button"
              className="adm-btn adm-btn--danger adm-btn--sm"
              onClick={() => remove(post)}
              disabled={busy === post.id}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
