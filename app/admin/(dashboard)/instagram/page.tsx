import { getSettings } from "@/lib/content/store";
import InstagramSettingsForm from "./InstagramSettingsForm";

export const dynamic = "force-dynamic";

export default async function InstagramPage() {
  const settings = await getSettings();

  return (
    <>
      <div className="adm-header">
        <div>
          <h1 className="adm-title">Instagram</h1>
          <p className="adm-subtitle">
            Connect your Instagram account to display a live feed on the site.
          </p>
        </div>
      </div>

      <InstagramSettingsForm
        initial={settings.instagram}
        tokenConfigured={Boolean(process.env.INSTAGRAM_ACCESS_TOKEN)}
      />
    </>
  );
}
