import Link from "next/link";
import { getBlogPosts } from "@/lib/content/store";
import BlogList from "./BlogList";

export const dynamic = "force-dynamic";

export default async function BlogAdminPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <div className="adm-header">
        <div>
          <h1 className="adm-title">Blog</h1>
          <p className="adm-subtitle">Create and manage your articles.</p>
        </div>
        <Link href="/admin/blog/new" className="adm-btn">
          + New post
        </Link>
      </div>
      <BlogList initial={posts} />
    </>
  );
}
