import { NextResponse } from "next/server";
import {
  addSubscriber,
  getSubscriberByEmail,
  setSubscriberStatus,
} from "@/lib/content/store";
import { isValidEmail } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email =
    typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const existing = await getSubscriberByEmail(email);
  if (existing) {
    if (existing.status === "unsubscribed") {
      await setSubscriberStatus(email, "subscribed");
    }
    return NextResponse.json({ ok: true, message: "You're already on the list." });
  }

  await addSubscriber({
    email,
    name: typeof body?.name === "string" ? body.name.trim().slice(0, 120) : "",
    source: typeof body?.source === "string" ? body.source.slice(0, 60) : "website",
  });

  return NextResponse.json({ ok: true, message: "Thanks for subscribing!" });
}
