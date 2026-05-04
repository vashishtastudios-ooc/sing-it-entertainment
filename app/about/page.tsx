import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AboutParallaxScene from "../components/AboutParallaxScene";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "About Us | Sing It Entertainment",
  description:
    "Learn about Sing It Entertainment, our story, and the experience behind our bespoke event entertainment services across the UK & Worldwide.",
  alternates: {
    canonical: "https://www.singitentertainment.com/about",
  },
};

export default function AboutPage() {
  return (
    <main className="aboutx-page">
      <SiteHeader alwaysVisible />
      <AboutParallaxScene />

      <section className="aboutx-hero">
        <div className="container aboutx-hero-grid">
          <article className="aboutx-panel">
            <p className="eyebrow">ABOUT US</p>
            <h1>
              WELCOME TO
              <br />
              SING IT
              <br />
              ENTERTAINMENT
            </h1>
            <p className="lead">
              An entertainment agency like no other providing a bespoke service
              to each and every client. We represent a talent pool of incredible
              artists performers from around the world ready to bring your event
              to life. Our team of industry professionals know exactly how to
              support you in creating the perfect event!
            </p>
          </article>
          <article className="aboutx-image-panel">
            <Image
              src="/images/hero-logo.jpeg"
              alt="Sing It Entertainment - Bespoke Entertainment"
              fill
              sizes="(max-width: 980px) 100vw, 45vw"
              className="aboutx-img"
              priority
            />
          </article>
        </div>
      </section>

      <section className="aboutx-story">
        <div className="container aboutx-story-grid">
          <article className="aboutx-image-panel">
            <Image
              src="/images/about-right.jpg"
              alt="The story behind Sing It"
              fill
              sizes="(max-width: 980px) 100vw, 45vw"
              className="aboutx-img"
            />
          </article>
          <article className="aboutx-panel">
            <p className="eyebrow">OUR STORY</p>
            <h2>
              THE STORY
              <br />
              BEHIND
              <br />
              SING IT
            </h2>
            <p className="lead">
              Birthed in the UK Sing it Entertainment has grown from strength to
              strength each and every year since its&apos; incorporation in 2018. A
              business built on a life long passion of working in entertainment,
              our Director Haifa Jordan, an artist herself, saw a gap in the
              market for an agency with a difference with artists that wanted
              strong and reliable representation to clients that wanted the
              assurance it brings working with an agency to deliver quality
              entertainment.
            </p>
            <p className="lead">
              With contacts to talent spanning over 25 years, every artist on the
              sing it roster is vetted personally which leads to a talent pool and
              network in the UK like no other. We simply offer everything and
              anything needed to host fabulous events. From sound &amp; lighting to
              the unique artists themselves the Sing it team have been able to
              deliver a bespoke and niche service to their clients time and time
              again, which is why our clients return becoming very much part of
              what we call the Sing It family.
            </p>
          </article>
        </div>
      </section>

      <section className="aboutx-founder">
        <div className="container aboutx-founder-grid">
          <article className="aboutx-panel">
            <p className="eyebrow">MEET ME</p>
            <h2>
              HI THERE,
              <br />I&apos;M HAIFA
            </h2>
            <p className="eyebrow">ME, MYSELF &amp; I</p>
            <p className="lead">
              Hi I&apos;m Haifa Jordan, the Director of Sing It, I&apos;ve worked in the
              entertainment industry for the majority of my life. With a huge
              passion for our industry building my whole life around
              entertainment, its personal and it shows!
            </p>
            <p className="lead">
              With over 25 years of experience both in front of the cameras and
              behind the scenes, I have built a roster of talent through my
              reputation in music and my own personal contacts and experience.
              Artists want to work with Sing It, meaning you the client get the
              best out of them. With 10 years as a touring Solo artist signed to
              various record labels, the first at just 17 I know exactly how to
              find and nurture exceptional talent and pass my experience down to
              my team managing to infect them with the same passion and dedication
              to the business. A pop idol and X Factor semi-finalist myself with a
              track record of success Sing It is a client focused agency like no
              other.
            </p>
            <Link href="/contact" className="cta">
              Get In Touch
            </Link>
          </article>
          <article className="aboutx-image-panel">
            <Image
              src="/images/about-left.jpg"
              alt="Haifa Jordan - Director of Sing It"
              fill
              sizes="(max-width: 980px) 100vw, 42vw"
              className="aboutx-img"
            />
          </article>
        </div>
      </section>
    </main>
  );
}
