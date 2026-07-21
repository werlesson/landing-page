import { describe, it, expect } from 'vitest'
import {
  normalizeCaseStudies,
  partitionCaseStudies,
} from '../../app/composables/usePortfolioCatalog'
import { normalizeExperienceEntries } from '../../app/composables/useExperience'
import en from '../../locales/en.json'
import pt from '../../locales/pt.json'

/**
 * Catalog partition & empty-safe gate (RF-19, RF-24, RF-25, RF-26, RF-29, RF-30).
 *
 * Tests the pure filter/getter logic (the composables' exported functions) over
 * the shipped locale catalog — no Nuxt runtime, no DOM. A duplicated id across
 * the shipped/building partition or a missing `businessImpact` field turns this
 * suite red; placeholder / partial data must never throw.
 */
const catalogRaw = en.featuredProjects.projects
const experienceRaw = en.experience.entries

describe('project catalog partition (RF-19, RF-29, RF-30)', () => {
  const { catalog, shipped, building } = partitionCaseStudies(catalogRaw)

  it('shipped and building partitions are mutually exclusive by id', () => {
    const shippedIds = new Set(shipped.map((p) => p.id))
    const buildingIds = new Set(building.map((p) => p.id))
    for (const id of shippedIds) {
      expect(buildingIds.has(id), `id "${id}" appears in both partitions`).toBe(false)
    }
    for (const id of buildingIds) {
      expect(shippedIds.has(id), `id "${id}" appears in both partitions`).toBe(false)
    }
  })

  it('the two partitions together account for the whole catalog', () => {
    expect(shipped.length + building.length).toBe(catalog.length)
  })

  it('every catalog id is unique (de-duplicated by id)', () => {
    const ids = catalog.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('renders the three shipped case studies', () => {
    expect(shipped.map((p) => p.id).sort()).toEqual(['bolao-copa', 'csv-view', 'eu-no-play'].sort())
  })

  it('renders an empty building set for now', () => {
    expect(building.map((p) => p.id)).toEqual([])
  })

  it('every project carries a shipped|building status', () => {
    for (const project of catalog) {
      expect(['shipped', 'building']).toContain(project.status)
    }
  })
})

describe('case-study normalizer is empty-safe (RF-24)', () => {
  it('does not throw on the placeholder locale catalog', () => {
    expect(() => normalizeCaseStudies(catalogRaw)).not.toThrow()
  })

  it('keeps card metadata for shipped projects (narrative lives in content collection)', () => {
    const csvView = normalizeCaseStudies(catalogRaw).find((p) => p.id === 'csv-view')
    expect(csvView).toBeDefined()
    expect(csvView?.title).toBeTruthy()
    expect(csvView?.techStack?.length).toBeGreaterThan(0)
    expect(csvView?.liveUrl).toBeTruthy()
    // Narrative prose migrated to content/projects — absent from i18n catalog.
    expect(csvView?.problem).toBeUndefined()
    expect(csvView?.solution).toBeUndefined()
    expect(csvView?.results).toBeUndefined()
  })

  it('maps empty prose blocks to undefined so renderers can omit them', () => {
    const normalized = normalizeCaseStudies([
      {
        id: 'shell',
        status: 'shipped',
        title: 'Shell',
        problem: '',
        solution: '',
        results: '',
      },
    ])
    expect(normalized[0]?.problem).toBeUndefined()
    expect(normalized[0]?.solution).toBeUndefined()
    expect(normalized[0]?.results).toBeUndefined()
  })

  it('keeps a repoUrl only when present (RF-22)', () => {
    const catalog = normalizeCaseStudies(catalogRaw)
    const withRepo = catalog.find((p) => p.id === 'csv-view')
    const withoutRepo = catalog.find((p) => p.id === 'eu-no-play')
    expect(withRepo?.repoUrl).toBeTruthy()
    expect(withoutRepo?.repoUrl).toBeUndefined()
  })

  it('returns an empty array on malformed / missing input without throwing', () => {
    expect(normalizeCaseStudies(null)).toEqual([])
    expect(normalizeCaseStudies(undefined)).toEqual([])
    expect(normalizeCaseStudies('nope')).toEqual([])
    expect(normalizeCaseStudies([{}, null, 'x', { id: '' }])).toEqual([])
  })

  it('accepts vue-i18n object-shaped arrays (numeric keys)', () => {
    const asObject = {
      0: { id: 'a', status: 'shipped', title: 'A', tags: { 0: 'Vue' } },
      1: { id: 'b', status: 'building', title: 'B' },
    }
    const catalog = normalizeCaseStudies(asObject)
    expect(catalog.map((p) => p.id)).toEqual(['a', 'b'])
    expect(catalog[0]?.tags).toEqual(['Vue'])
  })

  it('de-duplicates ids across statuses, keeping the first occurrence', () => {
    const raw = [
      { id: 'dup', status: 'shipped', title: 'First' },
      { id: 'dup', status: 'building', title: 'Second' },
    ]
    const { catalog, shipped, building } = partitionCaseStudies(raw)
    expect(catalog).toHaveLength(1)
    expect(catalog[0]?.title).toBe('First')
    expect(shipped).toHaveLength(1)
    expect(building).toHaveLength(0)
  })

  it('locale parity: pt catalog partitions identically by id', () => {
    const enPart = partitionCaseStudies(en.featuredProjects.projects)
    const ptPart = partitionCaseStudies(pt.featuredProjects.projects)
    expect(ptPart.shipped.map((p) => p.id)).toEqual(enPart.shipped.map((p) => p.id))
    expect(ptPart.building.map((p) => p.id)).toEqual(enPart.building.map((p) => p.id))
  })
})

describe('experience entries (RF-25, RF-26)', () => {
  it('each raw entry declares six fields incl. a distinct businessImpact', () => {
    for (const raw of experienceRaw) {
      const entry = raw as Record<string, unknown>
      expect(entry).toHaveProperty('company')
      expect(entry).toHaveProperty('role')
      expect(entry).toHaveProperty('period')
      expect(entry).toHaveProperty('responsibilities')
      expect(entry).toHaveProperty('technologies')
      // businessImpact is a distinct field, never merged into responsibilities.
      expect(entry).toHaveProperty('businessImpact')
      expect('responsibilities' in entry && 'businessImpact' in entry).toBe(true)
    }
  })

  it('normalizer yields the six fields with correct shapes', () => {
    for (const entry of normalizeExperienceEntries(experienceRaw)) {
      expect(typeof entry.company).toBe('string')
      expect(typeof entry.role).toBe('string')
      expect(typeof entry.period).toBe('string')
      expect(Array.isArray(entry.responsibilities)).toBe(true)
      expect(Array.isArray(entry.technologies)).toBe(true)
      expect(typeof entry.businessImpact).toBe('string')
    }
  })

  it('is empty-safe on partial / malformed entries (RF-25)', () => {
    const out = normalizeExperienceEntries([{}, { company: 'Acme' }, null, 'x'])
    expect(out).toHaveLength(4)
    expect(out[1]?.company).toBe('Acme')
    expect(out[1]?.businessImpact).toBe('')
    expect(out[0]?.responsibilities).toEqual([])
    expect(() => normalizeExperienceEntries(null)).not.toThrow()
    expect(normalizeExperienceEntries(null)).toEqual([])
  })
})
