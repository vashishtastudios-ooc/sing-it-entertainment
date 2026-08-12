"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/seo", label: "Homepage SEO" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/email", label: "Email Marketing" },
  { href: "/admin/instagram", label: "Instagram" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <nav className="adm-sidebar">
      <div className="adm-brand">
        Sing It <span>Admin</span>
      </div>
      {links.map((link) => {
        const active =
          link.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`adm-nav-link ${active ? "is-active" : ""}`}
          >
            {link.label}
          </Link>
        );
      })}
      <div className="adm-sidebar-foot">
        <button type="button" className="adm-nav-link" onClick={logout}>
          Log out
        </button>
      </div>
    </nav>
  );
}
