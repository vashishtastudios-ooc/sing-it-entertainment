import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import { getBlogPostBySlug, getPublishedBlogPosts } from "@/lib/content/store";
import { buildPageMetadata } from "@/lib/seo";
import { renderMarkdown } from "@/lib/markdown";
import "../blog.css";

export const dynamic = "force-dynamic";

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post || post.status !== "published") {
    return { title: "Post not found | Sing It Entertainment" };
  }
  return buildPageMetadata({
    title: post.seoTitle || `${post.title} | Sing It Entertainment`,
    description: post.seoDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverImage || undefined,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post || post.status !== "published") notFound();

  const html = renderMarkdown(post.body);

  return (
    <main className="blog-page">
      <SiteHeader alwaysVisible />
      <article className="container blog-article">
        <div className="blog-article-head">
          <Link href="/blog" className="blog-back">
            ← Back to blog
          </Link>
          <h1>{post.title}</h1>
          <p className="blog-article-meta">
            {formatDate(post.publishedAt)} · {post.author}
          </p>
        </div>

        {post.coverImage && (
          <div className="blog-article-cover">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 800px) 100vw, 760px"
              priority
            />
          </div>
        )}

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </main>
  );
}
