import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import {
  NARRATIVE_BLOCK_KEYS,
  selectNarrativeBlocks,
  normalizeGallery,
  findCaseStudyBySlug,
  validateProjectFrontmatter,
} from '../../app/composables/useProjectDetail'
import { partitionCaseStudies } from '../../app/composables/usePortfolioCatalog'
import en from '../../locales/en.json'

/**
 * Pure helpers for the `/projects/[slug]` detail JOIN + empty-safe render
 * (RF-03, RF-04, RF-06, RF-07, RF-10). No Nuxt runtime — node environment.
 */

const shippedIds = partitionCaseStudies(en.featuredProjects.projects).shipped.map((p) => p.id)
const contentDir = join(process.cwd(), 'content', 'projects')

function readFrontmatterSlug(filePath: string): string | undefined {
  const raw = readFileSync(filePath, 'utf8')
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw)
  if (!match) return undefined
  const slugLine = match[1]!.split(/\r?\n/).find((line) => line.startsWith('slug:'))
  if (!slugLine) return undefined
  return slugLine
    .replace(/^slug:\s*/, '')
    .replace(/^['"]|['"]$/g, '')
    .trim()
}

describe('selectNarrativeBlocks (RF-03)', () => {
  it('includes only present non-empty blocks in canonical order', () => {
    const blocks = selectNarrativeBlocks({
      results: 'done',
      problem: 'pain',
      description: 'overview',
      solution: '',
      challenges: '   ',
    })
    expect(blocks.map((b) => b.key)).toEqual(['description', 'problem', 'results'])
    expect(blocks.map((b) => b.value)).toEqual(['overview', 'pain', 'done'])
  })

  it('returns [] when every block is absent or blank', () => {
    expect(selectNarrativeBlocks({})).toEqual([])
    expect(selectNarrativeBlocks(null)).toEqual([])
    expect(selectNarrativeBlocks({ problem: '' })).toEqual([])
  })

  it('follows NARRATIVE_BLOCK_KEYS order for a full document', () => {
    const full = Object.fromEntries(NARRATIVE_BLOCK_KEYS.map((k) => [k, k]))
    expect(selectNarrativeBlocks(full).map((b) => b.key)).toEqual([...NARRATIVE_BLOCK_KEYS])
  })
})

describe('normalizeGallery (RF-04, UI-04)', () => {
  it('keeps entries with non-empty src and alt', () => {
    expect(
      normalizeGallery([
        { src: '/a.png', alt: 'A', caption: 'cap' },
        { src: '/b.png', alt: 'B' },
      ]),
    ).toEqual([
      { src: '/a.png', alt: 'A', caption: 'cap' },
      { src: '/b.png', alt: 'B' },
    ])
  })

  it('drops entries missing src or alt', () => {
    expect(
      normalizeGallery([
        { src: '/a.png', alt: '' },
        { src: '', alt: 'B' },
        { alt: 'C' },
        { src: '/d.png' },
        null,
        'x',
      ]),
    ).toEqual([])
  })

  it('returns [] for empty or non-array input', () => {
    expect(normalizeGallery([])).toEqual([])
    expect(normalizeGallery(undefined)).toEqual([])
    expect(normalizeGallery(null)).toEqual([])
    expect(normalizeGallery({})).toEqual([])
  })
})

describe('findCaseStudyBySlug (RF-10 join)', () => {
  const catalog = partitionCaseStudies(en.featuredProjects.projects).catalog

  it('returns card meta for a known slug (slug === id)', () => {
    const study = findCaseStudyBySlug(catalog, 'csv-view')
    expect(study?.id).toBe('csv-view')
    expect(study?.title).toBeTruthy()
    expect(study?.techStack?.length).toBeGreaterThan(0)
  })

  it('returns undefined for an unknown slug', () => {
    expect(findCaseStudyBySlug(catalog, 'no-such-project')).toBeUndefined()
    expect(findCaseStudyBySlug(catalog, '')).toBeUndefined()
    expect(findCaseStudyBySlug(catalog, null)).toBeUndefined()
    expect(findCaseStudyBySlug(undefined, 'csv-view')).toBeUndefined()
  })
})

describe('validateProjectFrontmatter (RF-06 / CT-02)', () => {
  it('accepts required slug + supported locale', () => {
    expect(validateProjectFrontmatter({ slug: 'eu-no-play', locale: 'pt' })).toEqual({
      valid: true,
      errors: [],
    })
    expect(validateProjectFrontmatter({ slug: 'eu-no-play', locale: 'en' }).valid).toBe(true)
  })

  it('requires slug and locale', () => {
    expect(validateProjectFrontmatter({}).errors).toEqual(
      expect.arrayContaining(['slug', 'locale']),
    )
    expect(validateProjectFrontmatter({ slug: '', locale: 'pt' }).errors).toContain('slug')
    expect(validateProjectFrontmatter({ slug: 'x', locale: '' }).errors).toContain('locale')
  })

  it('rejects unsupported locale', () => {
    const result = validateProjectFrontmatter({ slug: 'x', locale: 'es' })
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('locale')
  })
})

describe('projects collection migration (RF-07)', () => {
  it('ships one .pt.md and .en.md per shipped id with slug === id', () => {
    expect(shippedIds.length).toBeGreaterThan(0)
    for (const id of shippedIds) {
      for (const locale of ['pt', 'en'] as const) {
        const filePath = join(contentDir, `${id}.${locale}.md`)
        expect(existsSync(filePath), `missing ${id}.${locale}.md`).toBe(true)
        expect(readFrontmatterSlug(filePath)).toBe(id)
      }
    }
  })

  it('content/projects only contains the expected locale-paired files', () => {
    const files = readdirSync(contentDir)
      .filter((f) => f.endsWith('.md'))
      .sort()
    const expected = shippedIds.flatMap((id) => [`${id}.en.md`, `${id}.pt.md`]).sort()
    expect(files).toEqual(expected)
  })
})
