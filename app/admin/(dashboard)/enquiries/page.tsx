import { getContactSubmissions } from "@/lib/content/store";
import EnquiriesManager from "./EnquiriesManager";

export const dynamic = "force-dynamic";

export default async function EnquiriesPage() {
  const items = await getContactSubmissions();
  const newCount = items.filter((i) => i.status === "new").length;

  return (
    <>
      <div className="adm-header">
        <div>
          <h1 className="adm-title">Enquiries</h1>
          <p className="adm-subtitle">
            Every contact-form submission is saved here{" "}
            {newCount > 0 ? `— ${newCount} new` : ""}.
          </p>
        </div>
      </div>
      <EnquiriesManager initial={items} />
    </>
  );
}
