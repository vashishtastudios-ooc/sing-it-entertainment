import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth-guard";
import { getTestimonials, saveTestimonials } from "@/lib/content/store";
import type { Testimonial } from "@/lib/content/types";

export async function GET() {
  const auth = await requireApiAuth();
  if (auth) return auth;
  return NextResponse.json(await getTestimonials());
}

/** Replace the full testimonial list (handles add / edit / delete / reorder). */
export async function PUT(request: Request) {
  const auth = await requireApiAuth();
  if (auth) return auth;

  const body = (await request.json().catch(() => null)) as
    | Testimonial[]
    | null;
  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "Expected an array" }, { status: 400 });
  }

  const normalized: Testimonial[] = body.map((t, i) => ({
    id: t.id || `t-${Date.now()}-${i}`,
    name: t.name ?? "",
    role: t.role ?? "",
    service: t.service ?? "",
    image: t.image || "/images/hero-logo.jpeg",
    text: t.text ?? "",
    rating: typeof t.rating === "number" ? t.rating : 5,
    source: t.source === "google" ? "google" : "manual",
    order: i,
    published: t.published !== false,
  }));

  await saveTestimonials(normalized);
  return NextResponse.json(normalized);
}
