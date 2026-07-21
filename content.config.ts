import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// Blog collection schema (RF-31, RF-35).
// Articles are authored in a single locale, declared via the required `locale`
// frontmatter field. Any article missing a required field — including `locale`
// — fails validation and is excluded from the collection.
export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        summary: z.string().optional(),
        date: z.date(),
        slug: z.string(),
        tags: z.array(z.string()).default([]),
        locale: z.enum(['pt', 'en']),
        draft: z.boolean().default(false),
      }),
    }),
    // Projects collection schema (RF-06, CT-02).
    // HYBRID data model: card-facing metadata (status, title, image, tags,
    // techStack, liveUrl, repoUrl) stays in the i18n `featuredProjects.projects[]`
    // catalog and is read via `usePortfolioCatalog()`. This collection holds ONLY
    // the long-form narrative (six optional frontmatter blocks) and the photo
    // gallery. One markdown file per project per locale, keyed by a `slug` shared
    // across locales (slug === the project's id), resolved by
    // `.where('slug').where('locale').first()`.
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        slug: z.string(),
        locale: z.enum(['pt', 'en']),
        // Narrative blocks — optional, empty-safe, rendered per-block via v-if (RF-03).
        description: z.string().optional(),
        problem: z.string().optional(),
        solution: z.string().optional(),
        architecture: z.string().optional(),
        challenges: z.string().optional(),
        results: z.string().optional(),
        // Photo gallery (M-01) — `alt` required (UI-04), `caption` optional,
        // empty/absent array renders no gallery block (RF-04).
        gallery: z
          .array(
            z.object({
              src: z.string(),
              alt: z.string(),
              caption: z.string().optional(),
            }),
          )
          .default([]),
      }),
    }),
  },
})
