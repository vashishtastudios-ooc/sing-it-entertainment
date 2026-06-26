import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth-guard";
import { getSettings } from "@/lib/content/store";
import { fetchInstagramMedia } from "@/lib/integrations/instagram";

export async function POST() {
  const auth = await requireApiAuth();
  if (auth) return auth;

  const settings = await getSettings();
  const result = await fetchInstagramMedia(settings.instagram.limit);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ count: result.media.length });
}
