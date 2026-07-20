import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import en from '../../locales/en.json'
import pt from '../../locales/pt.json'

/**
 * Composition, navigation and hero gates (RF-01, RF-05, RF-06).
 *
 * These assertions read the source of truth as text (staying in the `node`
 * Vitest environment — no Vue transform / DOM) rather than rendering the SFCs:
 *  - the eleven-section order composed by `app/pages/index.vue` (RF-01),
 *  - that every `navItems` hash in `app/layouts/default.vue` resolves to a
 *    rendered section `id` (RF-05),
 *  - that the on-page Blog teaser caps at ≤4 items and links to `/blog` (RF-01),
 *  - that the hero title equals "Senior Software Engineer" (EN) with PT parity
 *    from the locale catalog (RF-06).
 */
const root = process.cwd()
const read = (rel: string): string => readFileSync(resolve(root, rel), 'utf8')

const SECTIONS_DIR = 'app/components/sections'

// The confirmed eleven-section order (RF-01).
const EXPECTED_ORDER = [
  'HeroSection',
  'AboutSection',
  'ImpactSection',
  'WhatIDoSection',
  'PrinciplesSection',
  'FeaturedProjectsSection',
  'ExperienceSection',
  'StackSection',
  'CurrentlyBuildingSection',
  'BlogSection',
  'ContactSection',
] as const

// --- Parse the composition template of index.vue ---------------------------
const indexSrc = read('app/pages/index.vue')
const templateBlock = indexSrc.match(/<template>([\s\S]*?)<\/template>/)?.[1] ?? ''
const renderedOrder = [...templateBlock.matchAll(/<([A-Z][A-Za-z0-9]*Section)\b/g)].map((m) => m[1])

// --- Parse the header navItems config of default.vue -----------------------
const layoutSrc = read('app/layouts/default.vue')
const navBlock = layoutSrc.match(/const navItems\s*=\s*\[([\s\S]*?)\]\s*as const/)?.[1] ?? ''
const navHashes = [...navBlock.matchAll(/hash:\s*'([^']+)'/g)].map((m) => m[1])

// --- Resolve the static section `id` of each rendered component ------------
function sectionId(component: string): string | null {
  const src = read(`${SECTIONS_DIR}/${component}.vue`)
  return src.match(/<section\b[^>]*?\bid="([^"]+)"/)?.[1] ?? null
}
const renderedIds = new Set(renderedOrder.map((c) => sectionId(c)).filter(Boolean) as string[])

describe('section composition order (RF-01)', () => {
  it('renders exactly the eleven sections in the confirmed order', () => {
    expect(renderedOrder).toEqual([...EXPECTED_ORDER])
  })

  it('renders exactly eleven sections — no more, no fewer', () => {
    expect(renderedOrder).toHaveLength(11)
  })
})

describe('header navigation anchors (RF-05)', () => {
  it('exposes a non-empty navItems config', () => {
    expect(navHashes.length).toBeGreaterThan(0)
  })

  it('every nav hash resolves to a rendered section id', () => {
    for (const hash of navHashes) {
      expect(renderedIds.has(hash), `nav hash #${hash} has no matching rendered section id`).toBe(
        true,
      )
    }
  })

  it('every nav hash has a matching locale label key in both locales', () => {
    const navLabels = [...navBlock.matchAll(/labelKey:\s*'nav\.([^']+)'/g)].map((m) => m[1])
    for (const key of navLabels) {
      expect((en.nav as Record<string, unknown>)[key], `en.nav.${key} missing`).toBeTruthy()
      expect((pt.nav as Record<string, unknown>)[key], `pt.nav.${key} missing`).toBeTruthy()
    }
  })
})

describe('blog teaser (RF-01)', () => {
  const blogSrc = read(`${SECTIONS_DIR}/BlogSection.vue`)

  it('caps the teaser at ≤4 latest articles', () => {
    const limit = Number(blogSrc.match(/\.limit\(\s*(\d+)\s*\)/)?.[1])
    expect(Number.isNaN(limit)).toBe(false)
    expect(limit).toBeGreaterThan(0)
    expect(limit).toBeLessThanOrEqual(4)
  })

  it('links to the /blog index route', () => {
    expect(blogSrc).toMatch(/localePath\(\s*'\/blog'\s*\)/)
  })
})

describe('hero title (RF-06)', () => {
  it('equals "Senior Software Engineer" in EN', () => {
    expect(en.hero.title).toBe('Senior Software Engineer')
  })

  it('has a non-empty PT parity title', () => {
    expect(typeof pt.hero.title).toBe('string')
    expect(pt.hero.title.trim().length).toBeGreaterThan(0)
  })

  it('does not use the forbidden positioning phrases (UI-07)', () => {
    for (const title of [en.hero.title, pt.hero.title]) {
      expect(title).not.toMatch(/frontend developer/i)
      expect(title).not.toMatch(/full[-\s]?stack developer/i)
    }
  })
})
