import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth-guard";
import {
  addSubscriber,
  deleteSubscriber,
  getSubscriberByEmail,
  getSubscribers,
} from "@/lib/content/store";
import { isValidEmail } from "@/lib/validation";

export async function GET() {
  const auth = await requireApiAuth();
  if (auth) return auth;
  return NextResponse.json(await getSubscribers());
}

export async function POST(request: Request) {
  const auth = await requireApiAuth();
  if (auth) return auth;

  const body = await request.json().catch(() => null);
  const email =
    typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (await getSubscriberByEmail(email)) {
    return NextResponse.json(
      { error: "That email is already subscribed." },
      { status: 409 }
    );
  }

  const subscriber = await addSubscriber({
    email,
    name: typeof body?.name === "string" ? body.name.trim() : "",
    source: "admin",
  });
  return NextResponse.json(subscriber, { status: 201 });
}

export async function DELETE(request: Request) {
  const auth = await requireApiAuth();
  if (auth) return auth;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await deleteSubscriber(id);
  return NextResponse.json({ ok: true });
}
