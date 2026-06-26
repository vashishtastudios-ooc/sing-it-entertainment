import { getSettings, getSubscribers } from "@/lib/content/store";
import SubscribersManager from "./SubscribersManager";
import EmailSettingsForm from "./EmailSettingsForm";

export const dynamic = "force-dynamic";

export default async function EmailPage() {
  const [subscribers, settings] = await Promise.all([
    getSubscribers(),
    getSettings(),
  ]);

  return (
    <>
      <div className="adm-header">
        <div>
          <h1 className="adm-title">Email Marketing</h1>
          <p className="adm-subtitle">
            Grow and manage your mailing list, then connect a provider to send
            campaigns.
          </p>
        </div>
      </div>

      <EmailSettingsForm
        initial={settings.email}
        resendConfigured={Boolean(process.env.RESEND_API_KEY)}
        mailchimpConfigured={Boolean(process.env.MAILCHIMP_API_KEY)}
      />

      <h2 className="adm-title" style={{ fontSize: 18, margin: "28px 0 14px" }}>
        Subscribers
      </h2>
      <SubscribersManager initial={subscribers} />
    </>
  );
}
