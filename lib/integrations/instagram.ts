export type InstagramMedia = {
  id: string;
  caption: string;
  mediaType: string;
  mediaUrl: string;
  permalink: string;
};

export type InstagramResult =
  | { ok: true; media: InstagramMedia[] }
  | { ok: false; error: string };

/**
 * Fetch recent media via the Instagram Graph API.
 *
 * Requires a long-lived INSTAGRAM_ACCESS_TOKEN environment variable
 * (created through a Facebook/Instagram developer app).
 */
export async function fetchInstagramMedia(
  limit: number
): Promise<InstagramResult> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    return {
      ok: false,
      error:
        "INSTAGRAM_ACCESS_TOKEN is not set. Add a long-lived token to your environment to show the feed.",
    };
  }

  const url = new URL("https://graph.instagram.com/me/media");
  url.searchParams.set(
    "fields",
    "id,caption,media_type,media_url,permalink,thumbnail_url"
  );
  url.searchParams.set("limit", String(Math.max(1, Math.min(limit, 24))));
  url.searchParams.set("access_token", token);

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data.error) {
      return { ok: false, error: data.error.message || "Instagram API error." };
    }
    type RawMedia = {
      id: string;
      caption?: string;
      media_type: string;
      media_url?: string;
      thumbnail_url?: string;
      permalink: string;
    };
    const media: InstagramMedia[] = (data.data ?? []).map((m: RawMedia) => ({
      id: m.id,
      caption: m.caption ?? "",
      mediaType: m.media_type,
      mediaUrl:
        m.media_type === "VIDEO" ? m.thumbnail_url ?? m.media_url ?? "" : m.media_url ?? "",
      permalink: m.permalink,
    }));
    return { ok: true, media };
  } catch {
    return { ok: false, error: "Could not reach the Instagram API." };
  }
}
