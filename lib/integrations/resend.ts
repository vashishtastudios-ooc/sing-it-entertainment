export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

export type SendEmailResult =
  | { ok: true; id: string | null; skipped?: boolean }
  | { ok: false; error: string };

/**
 * Send an email via the Resend HTTP API (no SDK dependency).
 *
 * Requires:
 *  - RESEND_API_KEY      — your Resend API key
 *  - CONTACT_FROM_EMAIL  — a verified sender, e.g. "Sing It <noreply@yourdomain.com>".
 *    You can reuse a domain already verified in another Resend project.
 *
 * If these are not configured the call is a graceful no-op (returns skipped:true)
 * so the surrounding request still succeeds.
 */
export async function sendEmail(
  input: SendEmailInput
): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    return { ok: true, id: null, skipped: true };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: Array.isArray(input.to) ? input.to : [input.to],
        subject: input.subject,
        html: input.html,
        ...(input.replyTo ? { reply_to: input.replyTo } : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return { ok: false, error: `Resend ${res.status}: ${detail.slice(0, 200)}` };
    }

    const data = (await res.json().catch(() => ({}))) as { id?: string };
    return { ok: true, id: data.id ?? null };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Failed to send email",
    };
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildContactEmailHtml(fields: {
  name: string;
  email: string;
  audience: string;
  actType: string;
  eventDate: string;
  location: string;
  message: string;
}): string {
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:6px 12px;color:#888;font-size:13px;">${label}</td><td style="padding:6px 12px;font-size:14px;color:#111;">${escapeHtml(
          value
        )}</td></tr>`
      : "";

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;">
    <h2 style="color:#d4206a;margin:0 0 4px;">New enquiry — Sing It Entertainment</h2>
    <p style="color:#666;font-size:13px;margin:0 0 16px;">A new brief was submitted through the website contact form.</p>
    <table style="width:100%;border-collapse:collapse;background:#fafafa;border:1px solid #eee;border-radius:8px;">
      ${row("Name", fields.name)}
      ${row("Email", fields.email)}
      ${row("Who they are", fields.audience)}
      ${row("Act type", fields.actType)}
      ${row("Event date", fields.eventDate)}
      ${row("Location", fields.location)}
    </table>
    ${
      fields.message
        ? `<p style="margin:16px 0 6px;color:#888;font-size:13px;">Message</p>
           <div style="white-space:pre-wrap;font-size:14px;line-height:1.6;color:#111;background:#fff;border:1px solid #eee;border-radius:8px;padding:12px 14px;">${escapeHtml(
             fields.message
           )}</div>`
        : ""
    }
    <p style="margin-top:18px;color:#999;font-size:12px;">Reply directly to this email to respond to ${escapeHtml(
      fields.name
    )}.</p>
  </div>`;
}
