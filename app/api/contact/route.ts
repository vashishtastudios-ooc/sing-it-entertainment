import { NextResponse } from "next/server";
import { createContactSubmission } from "@/lib/content/store";
import { buildContactEmailHtml, sendEmail } from "@/lib/integrations/resend";
import { isValidEmail } from "@/lib/validation";

const NOTIFY_TO = process.env.CONTACT_NOTIFY_EMAIL || "myevent@singit.uk.com";

function str(value: unknown, max = 2000): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const name = str(body?.name, 120);
  const email = str(body?.email, 254).toLowerCase();
  const audience = str(body?.audience, 60);
  const actType = str(body?.actType, 60);
  const eventDate = str(body?.eventDate, 40);
  const location = str(body?.location, 160);
  const message = str(body?.message, 4000);

  if (!name) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // Always persist the enquiry first so nothing is lost, even if email fails.
  const submission = await createContactSubmission({
    name,
    email,
    audience,
    actType,
    eventDate,
    location,
    message,
  });

  // Fire the notification email (non-blocking for the user's success state).
  const emailResult = await sendEmail({
    to: NOTIFY_TO,
    replyTo: email,
    subject: `New enquiry from ${name}${actType ? ` — ${actType}` : ""}`,
    html: buildContactEmailHtml({
      name,
      email,
      audience,
      actType,
      eventDate,
      location,
      message,
    }),
  });

  if (!emailResult.ok) {
    console.error("Contact notification email failed:", emailResult.error);
  }

  return NextResponse.json({ ok: true, id: submission.id });
}
