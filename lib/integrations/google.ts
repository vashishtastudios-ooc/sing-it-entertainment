import type { Testimonial } from "@/lib/content/types";

type GoogleReview = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description?: string;
  profile_photo_url?: string;
  time?: number;
};

export type GoogleImportResult =
  | { ok: true; reviews: Omit<Testimonial, "order">[] }
  | { ok: false; error: string };

/**
 * Fetch reviews from the Google Places API (Place Details endpoint).
 *
 * Requires:
 *  - GOOGLE_PLACES_API_KEY environment variable
 *  - a Place ID configured in admin settings
 *
 * The Places API returns up to 5 of the most relevant reviews.
 */
export async function fetchGoogleReviews(
  placeId: string,
  minRating: number
): Promise<GoogleImportResult> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      error:
        "GOOGLE_PLACES_API_KEY is not set. Add it to your environment to import reviews.",
    };
  }
  if (!placeId) {
    return {
      ok: false,
      error: "No Google Place ID configured. Add one in the settings below.",
    };
  }

  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/details/json"
  );
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "reviews,rating,name");
  url.searchParams.set("reviews_sort", "newest");
  url.searchParams.set("key", apiKey);

  let data: {
    status: string;
    error_message?: string;
    result?: { reviews?: GoogleReview[] };
  };
  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    data = await res.json();
  } catch {
    return { ok: false, error: "Could not reach the Google Places API." };
  }

  if (data.status !== "OK") {
    return {
      ok: false,
      error: data.error_message || `Google API error: ${data.status}`,
    };
  }

  const reviews = (data.result?.reviews ?? [])
    .filter((r) => r.rating >= minRating && r.text?.trim())
    .map((r): Omit<Testimonial, "order"> => ({
      id: `google-${r.time ?? r.author_name}`.replace(/[^a-z0-9-]/gi, "-"),
      name: r.author_name.toUpperCase(),
      role: "Google Review",
      service: r.relative_time_description || "Verified Google Review",
      image: r.profile_photo_url || "/images/hero-logo.jpeg",
      text: r.text,
      rating: r.rating,
      source: "google",
      published: true,
    }));

  return { ok: true, reviews };
}
