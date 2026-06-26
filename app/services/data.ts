export type ServicePageData = {
  slug: string;
  title: string;
  shortTitle: string;
  serviceType: string;
  heroImage: string;
  intro: string;
  bullets: string[];
  ukSeoTitle: string;
  ukSeoDescription: string;
  schemaDescription: string;
};

export const servicePages: ServicePageData[] = [
  {
    slug: "djs",
    title: "DJ Hire for Events & Venues",
    shortTitle: "DJs",
    serviceType: "DJ Hire",
    heroImage: "/images/services/dj.webp",
    intro:
      "At the heart of every event is its vibe. Our diverse lineup of DJs, ranging from renowned names to the most skilled mixologists in the industry, ensures that the musical backdrop is expertly tailored to your event's essence.",
    bullets: [
      "Corporate event DJs across the UK & worldwide",
      "Wedding, private party and luxury venue DJ bookings",
      "Curated music planning based on your audience and event format",
      "Professional setup coordination with your venue and production teams",
    ],
    ukSeoTitle: "DJ Hire UK | Event & Wedding DJs | Sing It Entertainment",
    ukSeoDescription:
      "Hire world-class DJs for weddings, corporate events and venues across the UK. From renowned names to expert mixologists — tailored to your event's vibe.",
    schemaDescription:
      "Professional DJ hire for weddings, corporate events and hospitality venues across the UK.",
  },
  {
    slug: "singers",
    title: "Singers & Vocalists for Hire",
    shortTitle: "Singers",
    serviceType: "Singer Hire",
    heroImage: "/images/services/singer.webp",
    intro:
      "From acoustic and jazz to disco and electronic, we offer an extensive selection of vocalists to match your preferences. Whether you need ambient background vocals or an engaging spotlight performance, we tailor each booking to your event.",
    bullets: [
      "Live singers for weddings, corporate functions and private events",
      "Styles including acoustic, jazz, pop, soul and disco",
      "Solo acts and collaborative performances with DJs or musicians",
      "Bookings across the UK & worldwide with full planning support",
    ],
    ukSeoTitle: "Singer Hire UK | Wedding & Event Vocalists | Sing It",
    ukSeoDescription:
      "Hire professional singers and vocalists for UK events — acoustic, jazz, soul, disco and electronic. Ambient sets or interactive live performances.",
    schemaDescription:
      "Professional singer hire for weddings, private events and corporate functions across the UK.",
  },
  {
    slug: "musicians",
    title: "Live Musicians for Hire",
    shortTitle: "Musicians",
    serviceType: "Live Musician Hire",
    heroImage: "/images/services/band.webp",
    intro:
      "Discover a rich array of musical talent including saxophonists, electric violinists, drummers, percussionists, guitarists and harpists. Our musicians are selected to elevate atmosphere and align with your event style.",
    bullets: [
      "Sax, violin, percussion and instrumental acts for events",
      "Day-to-evening transitions for luxury and corporate occasions",
      "Tailored line-ups for receptions, dinners and dancefloor moments",
      "Bookings across the UK & worldwide with full venue coordination",
    ],
    ukSeoTitle: "Live Musicians for Hire UK | Saxophonists, Violinists & More | Sing It",
    ukSeoDescription:
      "Hire live musicians across the UK — saxophonists, electric violinists, percussionists, guitarists and harpists to transform your event's atmosphere.",
    schemaDescription:
      "Live musician hire across the UK, including saxophonists, violinists, percussionists, guitarists and harpists.",
  },
  {
    slug: "dancers",
    title: "Dancers & Performers for Hire",
    shortTitle: "Dancers",
    serviceType: "Dancer Hire",
    heroImage: "/images/services/dancer.webp",
    intro:
      "Our diverse performers include Mirror Men, Show Girls, Roller Skaters and Belly Dancers in bespoke costumes. We design visual entertainment that fits your event concept and guest experience.",
    bullets: [
      "Professional dancers for corporate and private events across the UK and worldwide",
      "Themed performance concepts and bespoke costume styling",
      "Ambient, roaming and staged performance formats",
      "Trusted choreography and event flow coordination",
    ],
    ukSeoTitle: "Dancers & Performers for Hire UK | Show Girls, Belly Dancers | Sing It",
    ukSeoDescription:
      "Hire captivating dancers and performers for UK events — show girls, mirror men, roller skaters and belly dancers in bespoke costume.",
    schemaDescription:
      "Professional dancer and visual performer hire for events across the UK.",
  },
  {
    slug: "magicians",
    title: "Magicians & Illusionists for Hire",
    shortTitle: "Magicians",
    serviceType: "Magician Hire",
    heroImage: "/images/services/magic.webp",
    intro:
      "Experience captivating illusionists and close-up magic performances that leave guests genuinely amazed. Our magician bookings are planned to suit networking events, receptions and private celebrations.",
    bullets: [
      "Close-up and interactive magic for events across the UK & worldwide",
      "Corporate reception, wedding and private party formats",
      "Guest-engaging performances with premium event presentation",
      "Professional planning support from enquiry to delivery",
    ],
    ukSeoTitle: "Magician Hire UK | Close-Up & Illusion Acts | Sing It",
    ukSeoDescription:
      "Hire professional magicians and illusionists for UK events. Mesmerising close-up magic that leaves your guests spellbound.",
    schemaDescription:
      "Professional magician and illusion act hire for weddings, private events and corporate functions across the UK.",
  },
  {
    slug: "circus-performers",
    title: "Circus Performers for Hire",
    shortTitle: "Circus Performers",
    serviceType: "Circus Performer Hire",
    heroImage: "/images/services/circus.webp",
    intro:
      "From contortionists and aerial artists to fire performers, our circus acts are designed to create unforgettable visual impact. We tailor each booking to your venue, audience and event style.",
    bullets: [
      "Aerial, fire and specialty circus acts across the UK and worldwide",
      "Bespoke performance planning for luxury and branded experiences",
      "Safety-aware coordination with venues and production teams",
      "High-impact entertainment for private and corporate occasions",
    ],
    ukSeoTitle: "Circus Performers for Hire UK | Aerial, Fire & Contortion | Sing It",
    ukSeoDescription:
      "Hire circus performers across the UK — aerialists, fire performers and contortionists to thrill and engage your guests.",
    schemaDescription:
      "Circus performer hire across the UK, including aerial acts, fire performers and contortionists.",
  },
];

export const serviceSlugSet = new Set(servicePages.map((service) => service.slug));
