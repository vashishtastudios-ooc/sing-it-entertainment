import type {
  BlogPost as PrismaBlogPost,
  Subscriber as PrismaSubscriber,
  Testimonial as PrismaTestimonial,
} from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/markdown";
import {
  defaultHomeSeo,
  defaultSettings,
} from "./defaults";
import type {
  BlogPost,
  HomeSeo,
  Settings,
  Subscriber,
  SubscriberStatus,
  Testimonial,
} from "./types";

const SEO_KEY = "home-seo";
const SETTINGS_KEY = "site-settings";

/* ---------------- Mappers ---------------- */

function mapTestimonial(t: PrismaTestimonial): Testimonial {
  return {
    id: t.id,
    name: t.name,
    role: t.role,
    service: t.service,
    image: t.image,
    text: t.text,
    rating: t.rating,
    source: t.source === "google" ? "google" : "manual",
    order: t.order,
    published: t.published,
  };
}

function mapBlogPost(p: PrismaBlogPost): BlogPost {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    coverImage: p.coverImage,
    body: p.body,
    tags: p.tags,
    author: p.author,
    status: p.status === "published" ? "published" : "draft",
    seoTitle: p.seoTitle,
    seoDescription: p.seoDescription,
    publishedAt: p.publishedAt ? p.publishedAt.toISOString() : null,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

function mapSubscriber(s: PrismaSubscriber): Subscriber {
  return {
    id: s.id,
    email: s.email,
    name: s.name,
    source: s.source,
    status: s.status === "unsubscribed" ? "unsubscribed" : "subscribed",
    createdAt: s.createdAt.toISOString(),
  };
}

/* ---------------- SEO ---------------- */

export async function getHomeSeo(): Promise<HomeSeo> {
  const row = await prisma.setting.findUnique({ where: { id: SEO_KEY } });
  const stored = (row?.data as Partial<HomeSeo> | undefined) ?? {};
  return { ...defaultHomeSeo, ...stored };
}

export async function saveHomeSeo(seo: HomeSeo): Promise<HomeSeo> {
  await prisma.setting.upsert({
    where: { id: SEO_KEY },
    create: { id: SEO_KEY, data: seo },
    update: { data: seo },
  });
  return seo;
}

/* ---------------- Testimonials ---------------- */

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  return rows.map(mapTestimonial);
}

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  const rows = await prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
  return rows.map(mapTestimonial);
}

/** Full replace — used by the "Save all" testimonials editor. */
export async function saveTestimonials(
  items: Testimonial[]
): Promise<Testimonial[]> {
  await prisma.$transaction([
    prisma.testimonial.deleteMany({}),
    prisma.testimonial.createMany({
      data: items.map((t, i) => ({
        name: t.name ?? "",
        role: t.role ?? "",
        service: t.service ?? "",
        image: t.image || "/images/hero-logo.jpeg",
        text: t.text ?? "",
        rating: typeof t.rating === "number" ? t.rating : 5,
        source: t.source === "google" ? "google" : "manual",
        order: i,
        published: t.published !== false,
      })),
    }),
  ]);
  return getTestimonials();
}

/** Append-only import that skips reviews already present (matched by content). */
export async function importTestimonials(
  incoming: Omit<Testimonial, "order" | "id">[]
): Promise<{ added: number; testimonials: Testimonial[] }> {
  const existing = await prisma.testimonial.findMany();
  const existingKeys = new Set(
    existing.map((t) => `${t.name}::${t.text.slice(0, 60)}`.toLowerCase())
  );

  const fresh = incoming.filter(
    (r) => !existingKeys.has(`${r.name}::${r.text.slice(0, 60)}`.toLowerCase())
  );

  if (fresh.length > 0) {
    const baseOrder = existing.length;
    await prisma.testimonial.createMany({
      data: fresh.map((r, i) => ({
        name: r.name,
        role: r.role,
        service: r.service,
        image: r.image,
        text: r.text,
        rating: r.rating,
        source: "google",
        order: baseOrder + i,
        published: r.published,
      })),
    });
  }

  return { added: fresh.length, testimonials: await getTestimonials() };
}

/* ---------------- Blog ---------------- */

export async function getBlogPosts(): Promise<BlogPost[]> {
  const rows = await prisma.blogPost.findMany({
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });
  return rows.map(mapBlogPost);
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const rows = await prisma.blogPost.findMany({
    where: { status: "published" },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });
  return rows.map(mapBlogPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const row = await prisma.blogPost.findUnique({ where: { slug } });
  return row ? mapBlogPost(row) : null;
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const row = await prisma.blogPost.findUnique({ where: { id } });
  return row ? mapBlogPost(row) : null;
}

async function uniqueSlug(base: string, ignoreId?: string): Promise<string> {
  const root = base || "post";
  let candidate = root;
  let n = 2;
  // Loop until we find a slug not used by another post.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await prisma.blogPost.findUnique({
      where: { slug: candidate },
    });
    if (!existing || existing.id === ignoreId) return candidate;
    candidate = `${root}-${n++}`;
  }
}

type BlogInput = {
  title: string;
  slug?: string;
  excerpt?: string;
  coverImage?: string;
  body?: string;
  tags?: string[];
  author?: string;
  status?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export async function createBlogPost(input: BlogInput): Promise<BlogPost> {
  const status = input.status === "published" ? "published" : "draft";
  const slug = await uniqueSlug(slugify(input.slug || input.title));
  const row = await prisma.blogPost.create({
    data: {
      title: input.title.trim(),
      slug,
      excerpt: input.excerpt ?? "",
      coverImage: input.coverImage ?? "",
      body: input.body ?? "",
      tags: Array.isArray(input.tags) ? input.tags : [],
      author: input.author || "Sing It Entertainment",
      status,
      seoTitle: input.seoTitle ?? "",
      seoDescription: input.seoDescription ?? "",
      publishedAt: status === "published" ? new Date() : null,
    },
  });
  return mapBlogPost(row);
}

export async function updateBlogPost(
  id: string,
  input: BlogInput
): Promise<BlogPost | null> {
  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) return null;

  const status = input.status === "published" ? "published" : "draft";
  const slug = await uniqueSlug(
    slugify(input.slug || input.title || existing.title),
    id
  );

  const row = await prisma.blogPost.update({
    where: { id },
    data: {
      title: (input.title ?? existing.title).trim(),
      slug,
      excerpt: input.excerpt ?? existing.excerpt,
      coverImage: input.coverImage ?? existing.coverImage,
      body: input.body ?? existing.body,
      tags: Array.isArray(input.tags) ? input.tags : existing.tags,
      author: input.author || existing.author,
      status,
      seoTitle: input.seoTitle ?? existing.seoTitle,
      seoDescription: input.seoDescription ?? existing.seoDescription,
      publishedAt:
        status === "published" ? existing.publishedAt ?? new Date() : null,
    },
  });
  return mapBlogPost(row);
}

export async function deleteBlogPost(id: string): Promise<void> {
  await prisma.blogPost.deleteMany({ where: { id } });
}

/* ---------------- Subscribers ---------------- */

export async function getSubscribers(): Promise<Subscriber[]> {
  const rows = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });
  return rows.map(mapSubscriber);
}

export async function getSubscriberByEmail(
  email: string
): Promise<Subscriber | null> {
  const row = await prisma.subscriber.findUnique({ where: { email } });
  return row ? mapSubscriber(row) : null;
}

export async function addSubscriber(input: {
  email: string;
  name?: string;
  source?: string;
}): Promise<Subscriber> {
  const row = await prisma.subscriber.create({
    data: {
      email: input.email,
      name: input.name ?? "",
      source: input.source ?? "website",
      status: "subscribed",
    },
  });
  return mapSubscriber(row);
}

export async function setSubscriberStatus(
  email: string,
  status: SubscriberStatus
): Promise<void> {
  await prisma.subscriber.update({ where: { email }, data: { status } });
}

export async function deleteSubscriber(id: string): Promise<void> {
  await prisma.subscriber.deleteMany({ where: { id } });
}

/* ---------------- Settings ---------------- */

export async function getSettings(): Promise<Settings> {
  const row = await prisma.setting.findUnique({ where: { id: SETTINGS_KEY } });
  const stored = (row?.data as Partial<Settings> | undefined) ?? {};
  return {
    email: { ...defaultSettings.email, ...stored.email },
    google: { ...defaultSettings.google, ...stored.google },
    instagram: { ...defaultSettings.instagram, ...stored.instagram },
  };
}

export async function saveSettings(settings: Settings): Promise<Settings> {
  await prisma.setting.upsert({
    where: { id: SETTINGS_KEY },
    create: { id: SETTINGS_KEY, data: settings },
    update: { data: settings },
  });
  return settings;
}
