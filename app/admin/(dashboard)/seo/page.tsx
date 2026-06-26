import { getHomeSeo } from "@/lib/content/store";
import SeoForm from "./SeoForm";

export const dynamic = "force-dynamic";

export default async function SeoPage() {
  const seo = await getHomeSeo();

  return (
    <>
      <div className="adm-header">
        <div>
          <h1 className="adm-title">Homepage SEO</h1>
          <p className="adm-subtitle">
            Controls the title, description and social preview for your homepage.
          </p>
        </div>
      </div>
      <SeoForm initial={seo} />
    </>
  );
}
