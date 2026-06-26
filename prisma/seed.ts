import { PrismaClient } from "@prisma/client";
import {
  defaultBlog,
  defaultHomeSeo,
  defaultSettings,
  defaultTestimonials,
} from "../lib/content/defaults";

const prisma = new PrismaClient();

async function main() {
  // Singletons: homepage SEO + site settings
  await prisma.setting.upsert({
    where: { id: "home-seo" },
    create: { id: "home-seo", data: defaultHomeSeo },
    update: {},
  });
  await prisma.setting.upsert({
    where: { id: "site-settings" },
    create: { id: "site-settings", data: defaultSettings },
    update: {},
  });

  // Testimonials (only if the collection is empty)
  if ((await prisma.testimonial.count()) === 0) {
    await prisma.testimonial.createMany({
      data: defaultTestimonials.map((t, i) => ({
        name: t.name,
        role: t.role,
        service: t.service,
        image: t.image,
        text: t.text,
        rating: t.rating,
        source: t.source,
        order: i,
        published: t.published,
      })),
    });
    console.log(`Seeded ${defaultTestimonials.length} testimonials`);
  }

  // Blog (only if the collection is empty)
  if ((await prisma.blogPost.count()) === 0) {
    for (const p of defaultBlog) {
      await prisma.blogPost.create({
        data: {
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt,
          coverImage: p.coverImage,
          body: p.body,
          tags: p.tags,
          author: p.author,
          status: p.status,
          seoTitle: p.seoTitle,
          seoDescription: p.seoDescription,
          publishedAt: p.publishedAt ? new Date(p.publishedAt) : null,
        },
      });
    }
    console.log(`Seeded ${defaultBlog.length} blog post(s)`);
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
