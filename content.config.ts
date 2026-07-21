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
  },
})
