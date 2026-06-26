import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth-guard";
import { getSettings, importTestimonials } from "@/lib/content/store";
import { fetchGoogleReviews } from "@/lib/integrations/google";

export async function POST() {
  const auth = await requireApiAuth();
  if (auth) return auth;

  const settings = await getSettings();
  const result = await fetchGoogleReviews(
    settings.google.placeId,
    settings.google.minRating
  );

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const { added, testimonials } = await importTestimonials(
    result.reviews.map((r) => ({
      name: r.name,
      role: r.role,
      service: r.service,
      image: r.image,
      text: r.text,
      rating: r.rating,
      source: "google" as const,
      published: r.published,
    }))
  );

  return NextResponse.json({ added, testimonials });
}
