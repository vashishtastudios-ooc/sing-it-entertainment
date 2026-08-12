export type HomeSeo = {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  ogImageAlt: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  service: string;
  image: string;
  text: string;
  rating: number;
  source: "manual" | "google";
  order: number;
  published: boolean;
};

export type BlogStatus = "draft" | "published";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  /** Markdown body */
  body: string;
  tags: string[];
  author: string;
  status: BlogStatus;
  seoTitle: string;
  seoDescription: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SubscriberStatus = "subscribed" | "unsubscribed";

export type Subscriber = {
  id: string;
  email: string;
  name: string;
  source: string;
  status: SubscriberStatus;
  createdAt: string;
};

export type EmailSettings = {
  provider: "none" | "resend" | "mailchimp";
  fromName: string;
  fromEmail: string;
};

export type GoogleSettings = {
  /** Google Place ID used to pull reviews via the Places API */
  placeId: string;
  /** Minimum star rating to auto-import */
  minRating: number;
};

export type InstagramSettings = {
  enabled: boolean;
  username: string;
  /** How many posts to display on the site */
  limit: number;
};

export type Settings = {
  email: EmailSettings;
  google: GoogleSettings;
  instagram: InstagramSettings;
};

export type ContactStatus = "new" | "read" | "archived";

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  audience: string;
  actType: string;
  eventDate: string;
  location: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
};

export type ContentData = {
  seo: { home: HomeSeo };
  testimonials: Testimonial[];
  blog: BlogPost[];
  subscribers: Subscriber[];
  settings: Settings;
};
