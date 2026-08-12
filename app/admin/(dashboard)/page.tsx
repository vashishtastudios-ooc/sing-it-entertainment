import Link from "next/link";
import {
  countNewContactSubmissions,
  getBlogPosts,
  getContactSubmissions,
  getSubscribers,
  getTestimonials,
} from "@/lib/content/store";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [posts, testimonials, subscribers, enquiries, newEnquiries] =
    await Promise.all([
      getBlogPosts(),
      getTestimonials(),
      getSubscribers(),
      getContactSubmissions(),
      countNewContactSubmissions(),
    ]);

  const publishedPosts = posts.filter((p) => p.status === "published").length;
  const activeSubs = subscribers.filter((s) => s.status === "subscribed").length;

  return (
    <>
      <div className="adm-header">
        <div>
          <h1 className="adm-title">Dashboard</h1>
          <p className="adm-subtitle">
            Manage your website content, marketing and integrations.
          </p>
        </div>
      </div>

      <div className="adm-grid adm-grid--cards">
        <div className="adm-card">
          <p>Enquiries</p>
          <div className="adm-card-stat">{enquiries.length}</div>
          <p>{newEnquiries} new</p>
        </div>
        <div className="adm-card">
          <p>Blog posts</p>
          <div className="adm-card-stat">{posts.length}</div>
          <p>{publishedPosts} published</p>
        </div>
        <div className="adm-card">
          <p>Testimonials</p>
          <div className="adm-card-stat">{testimonials.length}</div>
          <p>{testimonials.filter((t) => t.published).length} live</p>
        </div>
        <div className="adm-card">
          <p>Subscribers</p>
          <div className="adm-card-stat">{activeSubs}</div>
          <p>{subscribers.length} total</p>
        </div>
      </div>

      <h2 className="adm-title" style={{ fontSize: 20, margin: "36px 0 16px" }}>
        Quick actions
      </h2>
      <div className="adm-grid adm-grid--cards">
        <Link href="/admin/enquiries" className="adm-card">
          <h3>View enquiries</h3>
          <p>Read and manage contact-form submissions.</p>
        </Link>
        <Link href="/admin/seo" className="adm-card">
          <h3>Edit homepage SEO</h3>
          <p>Title, description, keywords & social preview image.</p>
        </Link>
        <Link href="/admin/blog/new" className="adm-card">
          <h3>Write a blog post</h3>
          <p>Publish news and articles with full SEO control.</p>
        </Link>
        <Link href="/admin/testimonials" className="adm-card">
          <h3>Manage testimonials</h3>
          <p>Add reviews or import them from Google.</p>
        </Link>
        <Link href="/admin/email" className="adm-card">
          <h3>Email marketing</h3>
          <p>View subscribers and export your mailing list.</p>
        </Link>
        <Link href="/admin/instagram" className="adm-card">
          <h3>Instagram feed</h3>
          <p>Connect your account to show recent posts.</p>
        </Link>
      </div>
    </>
  );
}
