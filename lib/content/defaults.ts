import { UK_SEO_KEYWORDS } from "@/lib/seo";
import type {
  BlogPost,
  HomeSeo,
  Settings,
  Subscriber,
  Testimonial,
} from "./types";

export const defaultHomeSeo: HomeSeo = {
  title:
    "Entertainment Agency UK | Weddings, Corporate & Venue Acts | Sing It",
  description:
    "UK entertainment agency supplying world-class DJs, singers, musicians & performers for weddings, corporate events and venues. Personally vetted talent, London & worldwide. Get a quote.",
  keywords: [...UK_SEO_KEYWORDS],
  ogImage: "/images/hero-logo.jpeg",
  ogImageAlt:
    "Sing It Entertainment — bespoke entertainment across the UK & worldwide",
};

export const defaultTestimonials: Testimonial[] = [
  {
    id: "seed-diane-mason",
    name: "DIANE MASON",
    role: "Private Birthday Client",
    service: "Singers & Live Sets",
    image: "/images/services/singer.webp",
    text: 'Well what can I say, you were brilliant! Thank you, Thank you, Thank you! You really did make my 60th Birthday Party at "Haywards" have the WOW factor! Everyone so enjoyed your singing and all the songs you sang. We danced all night long! You have a great voice and a lovely personality which comes across so freely, and its obvious you enjoy what you do.\n\nThank you again Haifa for making it a great night with lots of wonderful memories for me.',
    rating: 5,
    source: "manual",
    order: 0,
    published: true,
  },
  {
    id: "seed-sally-crane",
    name: "SALLY CRANE",
    role: "Wedding Client",
    service: "Bands, DJs & Vocalists",
    image: "/images/services/dj.webp",
    text: "We decided to ask Sing It to organise the entertainment for our wedding. Right from the beginning, their support, attention to detail, professionalism, and guidance have been second to none. They helped us through the entire journey, from inception to completion, even liaising with the venue and alleviating all the stress. The daytime went so smoothly, from the music played to the musician who performed it was perfect. Onto the evening and the band completely blew everyone away. Every artist from musicians, DJ's and singers were all excellent, playing the right music and keeping the guests on the dancefloor. Each and every one of them were amazing and I would thoroughly recommend Sing It and the team again to organise any upcoming event I plan in the future.",
    rating: 5,
    source: "manual",
    order: 1,
    published: true,
  },
  {
    id: "seed-helen-gould",
    name: "HELEN GOULD",
    role: "Wedding Client",
    service: "Live Vocal Performance",
    image: "/images/services/band.webp",
    text: "My husband-to-be and I first heard Haifa sing at a friend's birthday and we were so impressed that we decided to ask if she was available to sing at our wedding. Haifa is an exceptional talented lady with a beautiful singing voice. She was very easy to communicate with prior to the wedding and liaised with other artists to ensure that the music and singing at our wedding was seamless. My husband and I cannot thank her enough for making our wedding day so very special. I would highly recommend Haifa for her singing, her personality and her professionalism.",
    rating: 5,
    source: "manual",
    order: 2,
    published: true,
  },
  {
    id: "seed-amelia-carter",
    name: "AMELIA CARTER",
    role: "Corporate Events Manager",
    service: "DJ & Saxophone Set",
    image: "/images/services/dj.webp",
    text: "We booked Sing It for our end-of-year company celebration and the whole thing felt effortless from start to finish. The team understood our brief quickly, suggested the right combination of DJ and live sax, and got the tone exactly right for a mixed-age crowd. The energy built naturally through the night and people stayed on the dance floor much longer than we expected. Professional, polished, and genuinely lovely to work with.",
    rating: 5,
    source: "manual",
    order: 3,
    published: true,
  },
  {
    id: "seed-rania-khoury",
    name: "RANIA KHOURY",
    role: "Private Client",
    service: "Dancers & Show Performers",
    image: "/images/services/dancer.webp",
    text: "I wanted something elegant but exciting for my engagement party, and Sing It absolutely delivered. Every performer arrived on time, looked incredible, and knew exactly how to interact with guests without it ever feeling forced. The dancers created those wow moments everyone talks about, and the whole evening felt beautifully curated. I received messages for days asking who organized the entertainment.",
    rating: 5,
    source: "manual",
    order: 4,
    published: true,
  },
  {
    id: "seed-james-whitmore",
    name: "JAMES WHITMORE",
    role: "Luxury Venue Partner",
    service: "Magicians & Interactive Acts",
    image: "/images/services/magic.webp",
    text: "As a venue, we work with many suppliers, but Sing It stands out for reliability and quality. We brought them in for a high-profile client dinner and their close-up magician was a real highlight of the night. Guests were completely engaged between courses, and the feedback from the client was excellent. They are easy to coordinate with, clear in communication, and always deliver to a high standard.",
    rating: 5,
    source: "manual",
    order: 5,
    published: true,
  },
];

export const defaultBlog: BlogPost[] = [
  {
    id: "seed-welcome-post",
    title: "How to Choose the Right Entertainment for Your Event",
    slug: "how-to-choose-the-right-entertainment",
    excerpt:
      "From weddings to corporate galas, the right act sets the tone for the whole night. Here is how we help clients pick performers that match their vision.",
    coverImage: "/images/services/singer.webp",
    body: "## Start with the feeling, not the act\n\nBefore choosing a DJ, band, or solo vocalist, decide how you want guests to *feel* across the night. A relaxed drinks reception calls for a saxophonist or acoustic set, while a late-night celebration thrives on a high-energy DJ.\n\n## Match the act to the room\n\nVenue size, acoustics, and power supply all shape what is possible. Our team handles the technical side so you can focus on the experience.\n\n## Book early\n\nThe best performers get reserved months in advance, especially in peak wedding season. Reach out early to secure your first choice.\n\n> Need a hand? [Get in touch](/contact) and we'll build a bespoke recommendation.",
    tags: ["Planning", "Weddings"],
    author: "Sing It Entertainment",
    status: "published",
    seoTitle:
      "How to Choose the Right Entertainment for Your Event | Sing It",
    seoDescription:
      "A practical guide to choosing wedding and event entertainment — from matching the act to the room to booking the best performers early.",
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const defaultSubscribers: Subscriber[] = [];

export const defaultSettings: Settings = {
  email: {
    provider: "none",
    fromName: "Sing It Entertainment",
    fromEmail: "myevent@singit.uk.com",
  },
  google: {
    placeId: "",
    minRating: 4,
  },
  instagram: {
    enabled: false,
    username: "",
    limit: 8,
  },
};
