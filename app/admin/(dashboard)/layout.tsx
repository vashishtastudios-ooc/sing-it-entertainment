import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth-guard";
import AdminNav from "../AdminNav";
import "../admin.css";

export const metadata: Metadata = {
  title: "Admin — Sing It Entertainment",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="adm-body">
      <div className="adm-shell">
        <AdminNav />
        <main className="adm-main">{children}</main>
      </div>
    </div>
  );
}
