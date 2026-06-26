import { getSettings } from "@/lib/content/store";
import { fetchInstagramMedia } from "@/lib/integrations/instagram";
import ScrollRevealHeading from "./ScrollRevealHeading";

export default async function InstagramFeed() {
  const settings = await getSettings();
  if (!settings.instagram.enabled) return null;

  const result = await fetchInstagramMedia(settings.instagram.limit);
  if (!result.ok || result.media.length === 0) return null;

  const username = settings.instagram.username;

  return (
    <section id="instagram" className="instagram">
      <div className="container">
        <p className="eyebrow">FOLLOW THE JOURNEY</p>
        <ScrollRevealHeading text="ON INSTAGRAM" />
        <div className="instagram-grid">
          {result.media.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-tile"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.mediaUrl} alt={post.caption.slice(0, 120) || "Instagram post"} loading="lazy" />
            </a>
          ))}
        </div>
        {username && (
          <a
            href={`https://instagram.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ghost-link"
          >
            @{username}
          </a>
        )}
      </div>
    </section>
  );
}
