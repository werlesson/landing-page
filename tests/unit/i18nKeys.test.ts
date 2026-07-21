import { describe, it, expect } from 'vitest'
import en from '../../locales/en.json'
import pt from '../../locales/pt.json'

/**
 * Locale parity gate for `locales/*.json` UI copy only.
 * Nuxt Content blog article bodies (single-locale-per-article) are content, not
 * UI copy, and are intentionally NOT covered here (RF-04 scope).
 */
type Json = string | number | boolean | null | Json[] | { [key: string]: Json }

/**
 * Recursively asserts that two locale values share the same structure:
 * identical value types, identical object key sets, and equal array lengths
 * (recursing into array elements so nested objects/arrays match too).
 */
function assertStructuralParity(a: Json, b: Json, path: string): void {
  const typeOf = (value: Json) =>
    Array.isArray(value) ? 'array' : value === null ? 'null' : typeof value

  const ta = typeOf(a)
  const tb = typeOf(b)
  expect(ta, `type mismatch at ${path}`).toBe(tb)

  if (Array.isArray(a) && Array.isArray(b)) {
    expect(a.length, `array length mismatch at ${path}`).toBe(b.length)
    for (let i = 0; i < a.length; i++) {
      assertStructuralParity(a[i]!, b[i]!, `${path}[${i}]`)
    }
    return
  }

  if (ta === 'object') {
    const ao = a as Record<string, Json>
    const bo = b as Record<string, Json>
    const aKeys = Object.keys(ao).sort()
    const bKeys = Object.keys(bo).sort()
    expect(aKeys, `key set mismatch at ${path}`).toEqual(bKeys)
    for (const key of aKeys) {
      assertStructuralParity(ao[key]!, bo[key]!, `${path}.${key}`)
    }
  }
}

const enRoot = en as unknown as Record<string, Json>
const ptRoot = pt as unknown as Record<string, Json>

describe('i18n locale parity', () => {
  it('PT has all top-level keys from EN', () => {
    for (const key of Object.keys(en)) {
      expect(Object.keys(pt)).toContain(key)
    }
  })

  it('EN has all top-level keys from PT', () => {
    for (const key of Object.keys(pt)) {
      expect(Object.keys(en)).toContain(key)
    }
  })

  it('EN and PT are structurally identical (keys + equal-length arrays)', () => {
    assertStructuralParity(enRoot, ptRoot, 'root')
  })
})

describe('hero section', () => {
  it('has no legacy typewriter role keys', () => {
    expect('role1' in en.hero).toBe(false)
    expect('role2' in en.hero).toBe(false)
    expect('role3' in en.hero).toBe(false)
    expect('role1' in pt.hero).toBe(false)
    expect('role2' in pt.hero).toBe(false)
    expect('role3' in pt.hero).toBe(false)
  })

  it('has a static positioning title in both locales', () => {
    expect(en.hero.title).toBe('Senior Software Engineer')
    expect(pt.hero.title).toBeTruthy()
  })

  it('has static subtitle and description in both locales', () => {
    expect(en.hero.subtitle).toBeTruthy()
    expect(en.hero.description).toBeTruthy()
    expect(pt.hero.subtitle).toBeTruthy()
    expect(pt.hero.description).toBeTruthy()
  })

  it('has a non-empty capabilities array with equal length in both locales', () => {
    expect(Array.isArray(en.hero.capabilities)).toBe(true)
    expect(Array.isArray(pt.hero.capabilities)).toBe(true)
    expect(en.hero.capabilities.length).toBeGreaterThan(0)
    expect(en.hero.capabilities.length).toBe(pt.hero.capabilities.length)
  })

  it('has CTA labels in both locales', () => {
    expect(en.hero.ctaCv).toBeTruthy()
    expect(en.hero.ctaProjects).toBeTruthy()
    expect(pt.hero.ctaCv).toBeTruthy()
    expect(pt.hero.ctaProjects).toBeTruthy()
  })

  it('exposes LinkedIn/GitHub/Email social labels + aria in both locales', () => {
    for (const social of [en.hero.social, pt.hero.social]) {
      expect(social.linkedin.label).toBeTruthy()
      expect(social.linkedin.aria).toBeTruthy()
      expect(social.github.label).toBeTruthy()
      expect(social.github.aria).toBeTruthy()
      expect(social.email.label).toBeTruthy()
      expect(social.email.aria).toBeTruthy()
    }
  })

  it('stat targets are positive numbers in both locales', () => {
    for (const targets of [en.hero.statTargets, pt.hero.statTargets]) {
      expect(targets.years).toBeGreaterThan(0)
      expect(targets.projects).toBeGreaterThan(0)
      expect(targets.saas).toBeGreaterThan(0)
    }
  })

  it('carries the canonical 6+ years / 20+ projects / 1 SaaS metrics', () => {
    expect(en.hero.statTargets.years).toBe(6)
    expect(en.hero.statTargets.projects).toBe(20)
    expect(en.hero.statTargets.saas).toBe(1)
    expect(pt.hero.statTargets.years).toBe(6)
    expect(pt.hero.statTargets.projects).toBe(20)
    expect(pt.hero.statTargets.saas).toBe(1)
  })
})

describe('about section', () => {
  it('exposes a non-empty bio in both locales', () => {
    expect(en.about.bio.trim().length).toBeGreaterThan(0)
    expect(pt.about.bio.trim().length).toBeGreaterThan(0)
  })

  it('uses a section badge distinct from the hero job title', () => {
    expect(en.about.badge).toBe('About')
    expect(pt.about.badge).toBe('Sobre')
    expect(en.about.badge).not.toBe(en.hero.title)
    expect(pt.about.badge).not.toBe(pt.hero.title)
  })

  it('exposes compact About sub-block labels in both locales', () => {
    expect(en.about.capabilitiesLabel).toBeTruthy()
    expect(en.about.principlesLabel).toBeTruthy()
    expect(pt.about.capabilitiesLabel).toBeTruthy()
    expect(pt.about.principlesLabel).toBeTruthy()
  })

  it('has at least 3 timeline entries with equal length across locales', () => {
    expect(en.about.timeline.length).toBeGreaterThanOrEqual(3)
    expect(en.about.timeline.length).toBe(pt.about.timeline.length)
  })

  it('each timeline entry has year, title, description and tech', () => {
    for (const entry of en.about.timeline) {
      expect(entry.year).toBeTruthy()
      expect(entry.title).toBeTruthy()
      expect(entry.description).toBeTruthy()
      expect(Array.isArray(entry.tech)).toBe(true)
    }
  })
})

describe('new section namespaces', () => {
  it('impact metrics are present and equal-length across locales', () => {
    expect(Array.isArray(en.impact.metrics)).toBe(true)
    expect(en.impact.metrics.length).toBeGreaterThan(0)
    expect(en.impact.metrics.length).toBe(pt.impact.metrics.length)
  })

  it('whatIDo renders six cards, equal-length across locales', () => {
    expect(en.whatIDo.cards.length).toBe(6)
    expect(en.whatIDo.cards.length).toBe(pt.whatIDo.cards.length)
    for (const card of en.whatIDo.cards) {
      expect(card.title).toBeTruthy()
      expect(card.description).toBeTruthy()
    }
  })

  it('principles items are present and equal-length across locales', () => {
    expect(en.principles.items.length).toBeGreaterThan(0)
    expect(en.principles.items.length).toBe(pt.principles.items.length)
  })

  it('featuredProjects catalog is present and equal-length across locales', () => {
    expect(Array.isArray(en.featuredProjects.projects)).toBe(true)
    expect(en.featuredProjects.projects.length).toBeGreaterThan(0)
    expect(en.featuredProjects.projects.length).toBe(pt.featuredProjects.projects.length)
  })

  it('each project carries an id and a shipped|building status', () => {
    for (const project of en.featuredProjects.projects) {
      expect(project.id).toBeTruthy()
      expect(['shipped', 'building']).toContain(project.status)
    }
  })

  it('experience entries are present and equal-length across locales', () => {
    expect(Array.isArray(en.experience.entries)).toBe(true)
    expect(en.experience.entries.length).toBe(pt.experience.entries.length)
  })

  it('currentlyBuilding namespace is present in both locales', () => {
    expect(en.currentlyBuilding.title).toBeTruthy()
    expect(pt.currentlyBuilding.title).toBeTruthy()
  })

  it('blog namespace is present in both locales', () => {
    expect(en.blog.title).toBeTruthy()
    expect(pt.blog.title).toBeTruthy()
  })
})

describe('nav and stack', () => {
  it('exposes the new nav labels in both locales', () => {
    for (const nav of [en.nav, pt.nav]) {
      expect(nav.impact).toBeTruthy()
      expect(nav.whatIDo).toBeTruthy()
      expect(nav.principles).toBeTruthy()
      expect(nav.projects).toBeTruthy()
      expect(nav.career).toBeTruthy()
      expect(nav.experience).toBeTruthy()
      expect(nav.building).toBeTruthy()
      expect(nav.blog).toBeTruthy()
    }
  })

  it('stack groups include the additive Tools group in both locales', () => {
    expect(en.stack.groups.tools).toBeTruthy()
    expect(pt.stack.groups.tools).toBeTruthy()
  })
})

describe('contact section', () => {
  it('exposes a conversational CTA in both locales', () => {
    expect(en.contact.cta).toBe("Let's connect")
    expect(pt.contact.cta).toBe('Vamos conversar?')
  })

  it('exposes location context in both locales', () => {
    expect(en.contact.location).toContain('UTC-3')
    expect(pt.contact.location).toContain('UTC-3')
  })

  it('uses a presentation tone in the subtitle — not active job-seeking phrasing', () => {
    expect(pt.contact.subtitle).not.toMatch(/estou aberto/i)
    expect(en.contact.subtitle).not.toMatch(/i'm open to/i)
  })

  it('uses the recruiter-facing gmail address in both locales', () => {
    expect(en.contact.social.email.handle).toContain('werlessono')
    expect(en.contact.social.email.handle).toContain('gmail.com')
    expect(pt.contact.social.email.handle).toContain('werlessono')
    expect(pt.contact.social.email.handle).toContain('gmail.com')
  })

  it('social handles are defined in both locales', () => {
    for (const social of [en.contact.social, pt.contact.social]) {
      expect(social.github.handle).toBeTruthy()
      expect(social.linkedin.handle).toBeTruthy()
      expect(social.email.handle).toBeTruthy()
    }
  })
})

describe('project section', () => {
  it('tech tags are non-empty arrays in both locales', () => {
    expect(en.project.euNoPlay.tags.length).toBeGreaterThan(0)
    expect(pt.project.euNoPlay.tags.length).toBeGreaterThan(0)
  })
})
