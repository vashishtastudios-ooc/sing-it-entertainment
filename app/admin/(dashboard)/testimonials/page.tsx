import { getSettings, getTestimonials } from "@/lib/content/store";
import TestimonialsManager from "./TestimonialsManager";
import GoogleSettingsForm from "./GoogleSettingsForm";

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const [items, settings] = await Promise.all([
    getTestimonials(),
    getSettings(),
  ]);

  return (
    <>
      <div className="adm-header">
        <div>
          <h1 className="adm-title">Testimonials</h1>
          <p className="adm-subtitle">
            Manage the reviews shown on your homepage. Remember to “Save all”.
          </p>
        </div>
      </div>

      <GoogleSettingsForm
        initial={settings.google}
        apiKeyConfigured={Boolean(process.env.GOOGLE_PLACES_API_KEY)}
      />

      <h2 className="adm-title" style={{ fontSize: 18, margin: "28px 0 14px" }}>
        Reviews
      </h2>
      <TestimonialsManager initial={items} />
    </>
  );
}
