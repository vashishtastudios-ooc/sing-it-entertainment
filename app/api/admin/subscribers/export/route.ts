import { requireApiAuth } from "@/lib/auth-guard";
import { getSubscribers } from "@/lib/content/store";

function csvCell(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET() {
  const auth = await requireApiAuth();
  if (auth) return auth;

  const subscribers = await getSubscribers();
  const header = ["email", "name", "status", "source", "createdAt"];
  const rows = subscribers.map((s) =>
    [s.email, s.name, s.status, s.source, s.createdAt].map(csvCell).join(",")
  );
  const csv = [header.join(","), ...rows].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="subscribers-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
    },
  });
}
