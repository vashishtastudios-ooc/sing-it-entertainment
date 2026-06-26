import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth-guard";
import { getSettings, saveSettings } from "@/lib/content/store";
import type { Settings } from "@/lib/content/types";

export async function GET() {
  const auth = await requireApiAuth();
  if (auth) return auth;
  return NextResponse.json(await getSettings());
}

/** Partial update — merges the provided section(s) into existing settings. */
export async function PUT(request: Request) {
  const auth = await requireApiAuth();
  if (auth) return auth;

  const body = (await request.json().catch(() => null)) as Partial<Settings> | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const current = await getSettings();
  const next: Settings = {
    email: { ...current.email, ...body.email },
    google: { ...current.google, ...body.google },
    instagram: { ...current.instagram, ...body.instagram },
  };

  await saveSettings(next);
  return NextResponse.json(next);
}
