import MagicBento from "./components/MagicBento";
import Image from "next/image";
import TestimonialsSlider from "./components/TestimonialsSlider";
import EventsCarousel from "./components/EventsCarousel";
import TalentGrid from "./components/TalentGrid";
import ScrollRevealHeading from "./components/ScrollRevealHeading";
import HeroVideoSequence from "./components/HeroVideoSequence";
import SiteHeader from "./components/SiteHeader";
import AboutStackingCards from "./components/AboutStackingCards";
import TalentStackingCards from "./components/TalentStackingCards";

const talentItems = [
  {
    title: "DJs",
    slug: "djs",
    image: "/images/services/dj.webp",
    text: "At the heart of every event is its vibe. Our diverse lineup of DJs, ranging from renowned names to the most skilled mixologists in the industry, ensures that the musical backdrop is expertly tailored to your events essence. Their extensive musical knowledge and creativity come together to craft an atmosphere that resonates with your vision and leaves a lasting impression.",
  },
  {
    title: "SINGERS",
    slug: "singers",
    image: "/images/services/singer.webp",
    text: "From the soothing melodies of acoustic and jazz to the soulful rhythms of disco and electronic beats, we offer an extensive selection of vocalists to match your preferences. Whether you're seeking an ambient background or an engaging interactive performance, our roster includes diverse talent to cater to every musical need.",
  },
  {
    title: "MUSICIANS",
    slug: "musicians",
    image: "/images/services/band.webp",
    text: "Discover a rich array of musical talent that will transform your event's ambiance. Our offerings encompass a diverse selection, ranging from enchanting Saxophonists, dynamic Electric Violinists, spirited Debke & Traditional Drummers, skilled Percussionists, soulful Guitarists, to elegant Harpists.",
  },
  {
    title: "DANCERS",
    slug: "dancers",
    image: "/images/services/dancer.webp",
    text: "Our diverse array of captivating performers includes enchanting Mirror Men, glamorous Show Girls, skillful Roller Skaters, mesmerizing Belly Dancers - all adorned in bespoke costumes. No matter the occasion, we have the perfect entertainment to elevate your event.",
  },
  {
    title: "MAGICIANS",
    slug: "magicians",
    image: "/images/services/magic.webp",
    text: "Experience the extraordinary with our captivating illusionists. Their mesmerizing close-up performances are guaranteed to leave your audience spellbound and awestruck. Get ready to witness gasps of astonishment as our talented illusionists weave magic right before your eyes.",
  },
  {
    title: "CIRCUS PERFORMERS",
    slug: "circus-performers",
    image: "/images/services/circus.webp",
    text: "Immerse yourself in the mesmerizing world of contortionists, be awed by the grace of aerial performers, feel the heat with our daring fire performers - an ensemble dedicated to thrilling and engaging you like never before.",
  },
];

const partnerLogos = [
  { name: "Hilton", src: "/images/logos/Hilton.webp" },
  { name: "Rothschild", src: "/images/logos/Rothschild.webp" },
  { name: "Eurovision", src: "/images/logos/Eurovision.webp" },
  { name: "BBC Music Introducing", src: "/images/logos/bbc2.webp" },
  { name: "OK Magazine", src: "/images/logos/okmag.webp" },
  { name: "Genting", src: "/images/logos/Genting.webp" },
  { name: "Sony", src: "/images/logos/Sony.webp" },
  { name: "BBC Radio", src: "/images/logos/bbc.webp" },
  { name: "Rosewood", src: "/images/logos/Rosewood.webp" },
  { name: "Ministry of Sound", src: "/images/logos/ministry.webp" },
  { name: "Soho House", src: "/images/logos/Soho.webp" },
  { name: "The Voice", src: "/images/logos/Voice.webp" },
];

const aboutCards = [
  { image: "/images/about-left.webp", title: "Team Story", description: "Built by professionals" },
  { image: "/images/about-right.webp", title: "Luxury Events", description: "Bespoke experiences" },
  { image: "/images/about1.webp", title: "Live Moments", description: "World-class delivery" },
  { image: "/images/aboutpage1.webp", title: "Roster", description: "Trusted artists" },
  { image: "/images/aboutpage2.webp", title: "Vision", description: "Tailored to every client" },
  { image: "/images/aboutpage3.webp", title: "Global Reach", description: "UK and internationally" },
];

const testimonials = [
  {
    name: "DIANE MASON",
    role: "Private Birthday Client",
    service: "Singers & Live Sets",
    image: "/images/services/singer.webp",
    text: "Well what can I say, you were brilliant! Thank you, Thank you, Thank you! You really did make my 60th Birthday Party at \"Haywards\" have the WOW factor! Everyone so enjoyed your singing and all the songs you sang. We danced all night long! You have a great voice and a lovely personality which comes across so freely, and its obvious you enjoy what you do.\n\nThank you again Haifa for making it a great night with lots of wonderful memories for me.",
  },
  {
    name: "SALLY CRANE",
    role: "Wedding Client",
    service: "Bands, DJs & Vocalists",
    image: "/images/services/dj.webp",
    text: "We decided to ask Sing It to organise the entertainment for our wedding. Right from the beginning, their support, attention to detail, professionalism, and guidance have been second to none. They helped us through the entire journey, from inception to completion, even liaising with the venue and alleviating all the stress. The daytime went so smoothly, from the music played to the musician who performed it was perfect. Onto the evening and the band completely blew everyone away. Every artist from musicians, DJ's and singers were all excellent, playing the right music and keeping the guests on the dancefloor. Each and every one of them were amazing and I would thoroughly recommend Sing It and the team again to organise any upcoming event I plan in the future.",
  },
  {
    name: "HELEN GOULD",
    role: "Wedding Client",
    service: "Live Vocal Performance",
    image: "/images/services/band.webp",
    text: "My husband-to-be and I first heard Haifa sing at a friend's birthday and we were so impressed that we decided to ask if she was available to sing at our wedding. Haifa is an exceptional talented lady with a beautiful singing voice. She was very easy to communicate with prior to the wedding and liaised with other artists to ensure that the music and singing at our wedding was seamless. My husband and I cannot thank her enough for making our wedding day so very special. I would highly recommend Haifa for her singing, her personality and her professionalism.",
  },
  {
    name: "AMELIA CARTER",
    role: "Corporate Events Manager",
    service: "DJ & Saxophone Set",
    image: "/images/services/dj.webp",
    text: "We booked Sing It for our end-of-year company celebration and the whole thing felt effortless from start to finish. The team understood our brief quickly, suggested the right combination of DJ and live sax, and got the tone exactly right for a mixed-age crowd. The energy built naturally through the night and people stayed on the dance floor much longer than we expected. Professional, polished, and genuinely lovely to work with.",
  },
  {
    name: "RANIA KHOURY",
    role: "Private Client",
    service: "Dancers & Show Performers",
    image: "/images/services/dancer.webp",
    text: "I wanted something elegant but exciting for my engagement party, and Sing It absolutely delivered. Every performer arrived on time, looked incredible, and knew exactly how to interact with guests without it ever feeling forced. The dancers created those wow moments everyone talks about, and the whole evening felt beautifully curated. I received messages for days asking who organized the entertainment.",
  },
  {
    name: "JAMES WHITMORE",
    role: "Luxury Venue Partner",
    service: "Magicians & Interactive Acts",
    image: "/images/services/magic.webp",
    text: "As a venue, we work with many suppliers, but Sing It stands out for reliability and quality. We brought them in for a high-profile client dinner and their close-up magician was a real highlight of the night. Guests were completely engaged between courses, and the feedback from the client was excellent. They are easy to coordinate with, clear in communication, and always deliver to a high standard.",
  },
];

const eventCards = [
  { id: 1, mediaUrl: "/videos/events/reel-1.mp4", mediaType: "video" as const, title: "Live Reel 1" },
  { id: 2, mediaUrl: "/videos/events/reel-2.mp4", mediaType: "video" as const, title: "Live Reel 2" },
  { id: 3, mediaUrl: "/videos/events/reel-3.mp4", mediaType: "video" as const, title: "Live Reel 3" },
  { id: 4, mediaUrl: "/videos/events/reel-4.mp4", mediaType: "video" as const, title: "Live Reel 4" },
  ...Array.from({ length: 24 }, (_, i) => ({
    id: i + 5,
    mediaUrl: `/images/gallery/gallery-${i + 1}.webp`,
    mediaType: "image" as const,
    title: `Event ${i + 1}`,
  })),
];

export default function Home() {
  return (
    <main className="site-shell">
      <SiteHeader />

      <HeroVideoSequence />

      <section id="about" className="about">
        <div className="container">
          <div className="about-layout">
            <div className="about-copy">
              <p className="eyebrow">WHO ARE WE</p>
              <ScrollRevealHeading text="ABOUT US" />
              <p className="lead">
                Sing It Entertainment is an entertainment agency built by entertainment professionals — and that is the edge that sets us apart.
              </p>
              <p className="lead">
                Founded by Haifa Jordan, a professional vocalist with over 25 years of experience performing at events across the UK, Middle East and internationally, Sing It operates across two core areas.
              </p>
              <p className="lead">
                For venues and hospitality businesses, we offer a fully outsourced entertainment management service — taking over your complete entertainment schedule so your team can focus on running the business. For private and corporate clients, we supply world-class talent for weddings, milestone celebrations, corporate events, product launches and private parties. Every artist on our roster is personally vetted.
              </p>
              <p className="lead">
                Our clients include Genting Casinos, Metropolitan Casinos, Hilton, Rosewood, Soho House, BBC, Eurovision, Sony and many more across the UK and internationally.
              </p>
              <a href="#contact" className="ghost-link">
                FIND OUT MORE
              </a>
            </div>
            <div className="about-bento about-bento--desktop">
              <MagicBento
                cards={aboutCards}
                textAutoHide
                enableStars
                enableSpotlight
                enableBorderGlow
                enableTilt={false}
                enableMagnetism={false}
                clickEffect
                spotlightRadius={380}
                particleCount={12}
                glowColor="212, 32, 106"
                disableAnimations={false}
              />
            </div>
            <div className="about-bento about-bento--mobile">
              <AboutStackingCards cards={aboutCards} />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="container">
          <p className="eyebrow">FOR PRIVATE &amp; CORPORATE EVENTS</p>
          <ScrollRevealHeading text="OUR TALENT" />
          <p className="lead" style={{ maxWidth: "780px", marginBottom: "8px" }}>
            For over 25 years, Sing It Entertainment has been supplying world-class artists to weddings, private celebrations, corporate events, product launches and public performances across the UK and internationally. Every artist on our roster is personally vetted. We work with your budget, your brief and your vision to deliver something truly unforgettable.
          </p>
          <a href="#contact" className="ghost-link">
            FIND OUT MORE
          </a>
          <div className="talent-desktop">
            <TalentGrid items={talentItems} />
          </div>
          <div className="talent-mobile">
            <TalentStackingCards items={talentItems} />
          </div>
        </div>
      </section>

      <section id="partners" className="partners">
        <div className="container">
          <p className="eyebrow">WHO WE WORK WITH</p>
          <ScrollRevealHeading text="OUR PARTNERS" />
          <p className="lead" style={{ maxWidth: "780px", marginBottom: "32px" }}>
            From independent restaurants and casino groups to global hotel brands and private clients — Sing It Entertainment has built a reputation for excellence across the UK and internationally.
          </p>
          <div className="partners-logo-grid" aria-label="Partner logo grid">
            {partnerLogos.map((logo) => (
              <div className="partner-logo-item" key={logo.name}>
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={170}
                  height={74}
                  className="partner-logo-image"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials">
        <div className="container">
          <p className="eyebrow">WHAT THEY SAY</p>
          <ScrollRevealHeading text="WHAT OUR CLIENTS SAY" />
          <TestimonialsSlider items={testimonials} />
        </div>
      </section>

      <section id="events" className="events">
        <div className="container">
          <ScrollRevealHeading text="FROM OUR EVENTS" />
          <EventsCarousel cards={eventCards} />
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <p className="eyebrow">LETS CHAT</p>
          <ScrollRevealHeading text="CONTACT US" />
          <div className="contact-lines">
            <a href="tel:+447949040404">+44 7949 040 404</a>
            <a href="mailto:myevent@singit.uk.com">myevent@singit.uk.com</a>
          </div>
          <a href="mailto:myevent@singit.uk.com" className="cta">
            GET IN TOUCH
          </a>
        </div>
      </section>
      <footer className="site-footer">
        <div className="container">
          <p>© 2026 Sing It Events Ltd.</p>
        </div>
      </footer>
    </main>
  );
}
