import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth-guard";
import {
  deleteContactSubmission,
  getContactSubmissions,
  setContactStatus,
} from "@/lib/content/store";
import type { ContactStatus } from "@/lib/content/types";

export async function GET() {
  const auth = await requireApiAuth();
  if (auth) return auth;
  return NextResponse.json(await getContactSubmissions());
}

export async function PATCH(request: Request) {
  const auth = await requireApiAuth();
  if (auth) return auth;

  const body = await request.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : "";
  const status = body?.status as ContactStatus;
  if (!id || !["new", "read", "archived"].includes(status)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await setContactStatus(id, status);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const auth = await requireApiAuth();
  if (auth) return auth;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await deleteContactSubmission(id);
  return NextResponse.json({ ok: true });
}
