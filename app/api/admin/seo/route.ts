import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth-guard";
import { getHomeSeo, saveHomeSeo } from "@/lib/content/store";
import type { HomeSeo } from "@/lib/content/types";

export async function GET() {
  const auth = await requireApiAuth();
  if (auth) return auth;
  return NextResponse.json(await getHomeSeo());
}

export async function PUT(request: Request) {
  const auth = await requireApiAuth();
  if (auth) return auth;

  const body = (await request.json().catch(() => null)) as Partial<HomeSeo> | null;
  if (!body || typeof body.title !== "string") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const current = await getHomeSeo();
  const next: HomeSeo = {
    title: body.title ?? current.title,
    description: body.description ?? current.description,
    keywords: Array.isArray(body.keywords) ? body.keywords : current.keywords,
    ogImage: body.ogImage ?? current.ogImage,
    ogImageAlt: body.ogImageAlt ?? current.ogImageAlt,
  };

  await saveHomeSeo(next);
  return NextResponse.json(next);
}
