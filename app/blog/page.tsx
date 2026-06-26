import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import { getPublishedBlogPosts } from "@/lib/content/store";
import { buildPageMetadata } from "@/lib/seo";
import "./blog.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog | Event & Entertainment Insights | Sing It Entertainment",
  description:
    "News, tips and inspiration on event entertainment — from choosing the right act to planning unforgettable weddings and corporate events.",
  path: "/blog",
});

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogIndexPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <main className="blog-page">
      <SiteHeader alwaysVisible />
      <div className="container">
        <header className="blog-hero">
          <p className="eyebrow">THE JOURNAL</p>
          <h1>Sing It Blog</h1>
          <p>
            Insights, tips and stories from the world of live entertainment and
            events.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="blog-empty">No articles published yet. Check back soon.</p>
        ) : (
          <div className="blog-grid">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="blog-card"
              >
                <div className="blog-card-media">
                  <Image
                    src={post.coverImage || "/images/hero-logo.jpeg"}
                    alt={post.title}
                    fill
                    sizes="(max-width: 760px) 100vw, 360px"
                  />
                </div>
                <div className="blog-card-body">
                  {post.tags.length > 0 && (
                    <div className="blog-card-tags">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span className="blog-tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <span className="blog-card-meta">
                    {formatDate(post.publishedAt)} · {post.author}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
