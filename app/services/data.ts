export type ServicePageData = {
  slug: string;
  title: string;
  shortTitle: string;
  heroImage: string;
  intro: string;
  bullets: string[];
  ukSeoTitle: string;
  ukSeoDescription: string;
};

export const servicePages: ServicePageData[] = [
  {
    slug: "djs",
    title: "DJs for Hire in the UK",
    shortTitle: "DJs",
    heroImage: "/images/services/dj.webp",
    intro:
      "At the heart of every event is its vibe. Our diverse lineup of DJs, ranging from renowned names to the most skilled mixologists in the industry, ensures that the musical backdrop is expertly tailored to your event's essence.",
    bullets: [
      "Corporate event DJs across London and the UK",
      "Wedding, private party and luxury venue DJ bookings",
      "Curated music planning based on your audience and event format",
      "Professional setup coordination with your venue and production teams",
    ],
    ukSeoTitle: "DJs for Hire UK | Corporate & Luxury Event DJs | Sing It Entertainment",
    ukSeoDescription:
      "Book professional DJs for corporate events, weddings and private parties across the UK. Sing It Entertainment provides experienced event DJs tailored to your audience and venue.",
  },
  {
    slug: "singers",
    title: "Singers for Events in the UK",
    shortTitle: "Singers",
    heroImage: "/images/services/singer.webp",
    intro:
      "From acoustic and jazz to disco and electronic, we offer an extensive selection of vocalists to match your preferences. Whether you need ambient background vocals or an engaging spotlight performance, we tailor each booking to your event.",
    bullets: [
      "Live singers for weddings, corporate functions and private events",
      "Styles including acoustic, jazz, pop, soul and disco",
      "Solo acts and collaborative performances with DJs or musicians",
      "UK-wide bookings with experienced event planning support",
    ],
    ukSeoTitle: "Singers for Hire UK | Wedding & Corporate Event Vocalists | Sing It",
    ukSeoDescription:
      "Hire professional singers for weddings, corporate events and private parties in the UK. Choose from acoustic, jazz, pop and more with tailored live entertainment.",
  },
  {
    slug: "musicians",
    title: "Live Musicians for UK Events",
    shortTitle: "Musicians",
    heroImage: "/images/services/band.webp",
    intro:
      "Discover a rich array of musical talent including saxophonists, electric violinists, drummers, percussionists, guitarists and harpists. Our musicians are selected to elevate atmosphere and align with your event style.",
    bullets: [
      "Sax, violin, percussion and instrumental acts for events",
      "Day-to-evening transitions for luxury and corporate occasions",
      "Tailored line-ups for receptions, dinners and dancefloor moments",
      "Reliable UK booking support with venue coordination",
    ],
    ukSeoTitle: "Musicians for Hire UK | Live Event Musicians | Sing It Entertainment",
    ukSeoDescription:
      "Book live musicians for events across the UK, including saxophonists, violinists, drummers and more. Premium entertainment tailored to weddings and corporate functions.",
  },
  {
    slug: "dancers",
    title: "Dancers for Hire in the UK",
    shortTitle: "Dancers",
    heroImage: "/images/services/dancer.webp",
    intro:
      "Our diverse performers include Mirror Men, Show Girls, Roller Skaters and Belly Dancers in bespoke costumes. We design visual entertainment that fits your event concept and guest experience.",
    bullets: [
      "Professional dancers for corporate and private UK events",
      "Themed performance concepts and bespoke costume styling",
      "Ambient, roaming and staged performance formats",
      "Trusted choreography and event flow coordination",
    ],
    ukSeoTitle: "Dancers for Hire UK | Event Dancers & Show Performers | Sing It",
    ukSeoDescription:
      "Hire professional dancers for events in the UK, from themed performers to bespoke stage and roaming acts. Ideal for luxury parties and corporate entertainment.",
  },
  {
    slug: "magicians",
    title: "Magicians for UK Events",
    shortTitle: "Magicians",
    heroImage: "/images/services/magic.webp",
    intro:
      "Experience captivating illusionists and close-up magic performances that leave guests genuinely amazed. Our magician bookings are planned to suit networking events, receptions and private celebrations.",
    bullets: [
      "Close-up and interactive magic for UK events",
      "Corporate reception, wedding and private party formats",
      "Guest-engaging performances with premium event presentation",
      "Professional planning support from enquiry to delivery",
    ],
    ukSeoTitle: "Magicians for Hire UK | Close-Up Event Magicians | Sing It Entertainment",
    ukSeoDescription:
      "Book skilled magicians for corporate events, weddings and private parties across the UK. Premium close-up and interactive magic tailored to your guests.",
  },
  {
    slug: "circus-performers",
    title: "Circus Performers for Hire in the UK",
    shortTitle: "Circus Performers",
    heroImage: "/images/services/circus.webp",
    intro:
      "From contortionists and aerial artists to fire performers, our circus acts are designed to create unforgettable visual impact. We tailor each booking to your venue, audience and event style.",
    bullets: [
      "Aerial, fire and specialty circus acts for UK events",
      "Bespoke performance planning for luxury and branded experiences",
      "Safety-aware coordination with venues and production teams",
      "High-impact entertainment for private and corporate occasions",
    ],
    ukSeoTitle: "Circus Performers for Hire UK | Aerial & Fire Acts | Sing It Entertainment",
    ukSeoDescription:
      "Hire circus performers in the UK including aerial artists, fire acts and specialty performers for corporate events, private celebrations and luxury experiences.",
  },
];

export const serviceSlugSet = new Set(servicePages.map((service) => service.slug));
