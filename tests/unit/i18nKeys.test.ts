import { describe, it, expect } from 'vitest'
import en from '../../locales/en.json'
import pt from '../../locales/pt.json'

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
})

describe('hero section', () => {
  it('has all three typewriter roles in EN', () => {
    expect(en.hero.role1).toBeTruthy()
    expect(en.hero.role2).toBeTruthy()
    expect(en.hero.role3).toBeTruthy()
  })

  it('has all three typewriter roles in PT', () => {
    expect(pt.hero.role1).toBeTruthy()
    expect(pt.hero.role2).toBeTruthy()
    expect(pt.hero.role3).toBeTruthy()
  })

  it('has CTA labels in both locales', () => {
    expect(en.hero.ctaCv).toBeTruthy()
    expect(en.hero.ctaProjects).toBeTruthy()
    expect(pt.hero.ctaCv).toBeTruthy()
    expect(pt.hero.ctaProjects).toBeTruthy()
  })

  it('stat targets are positive numbers in EN', () => {
    expect(en.hero.statTargets.years).toBeGreaterThan(0)
    expect(en.hero.statTargets.projects).toBeGreaterThan(0)
    expect(en.hero.statTargets.commits).toBeGreaterThan(0)
  })
})

describe('about timeline', () => {
  it('has at least 3 entries in EN', () => {
    expect(Array.isArray(en.about.timeline)).toBe(true)
    expect(en.about.timeline.length).toBeGreaterThanOrEqual(3)
  })

  it('has at least 3 entries in PT', () => {
    expect(Array.isArray(pt.about.timeline)).toBe(true)
    expect(pt.about.timeline.length).toBeGreaterThanOrEqual(3)
  })

  it('each timeline entry has year, title, description and tech', () => {
    for (const entry of en.about.timeline) {
      expect(entry.year).toBeTruthy()
      expect(entry.title).toBeTruthy()
      expect(entry.description).toBeTruthy()
      expect(Array.isArray(entry.tech)).toBe(true)
    }
  })

  it('EN and PT timelines have the same number of entries', () => {
    expect(en.about.timeline.length).toBe(pt.about.timeline.length)
  })
})

describe('project section', () => {
  it('tech tags are non-empty arrays in both locales', () => {
    expect(Array.isArray(en.project.euNoPlay.tags)).toBe(true)
    expect(en.project.euNoPlay.tags.length).toBeGreaterThan(0)
    expect(Array.isArray(pt.project.euNoPlay.tags)).toBe(true)
    expect(pt.project.euNoPlay.tags.length).toBeGreaterThan(0)
  })

  it('CTA label is defined in both locales', () => {
    expect(en.project.euNoPlay.cta).toBeTruthy()
    expect(pt.project.euNoPlay.cta).toBeTruthy()
  })
})

describe('contact section', () => {
  it('social handles are defined in EN', () => {
    expect(en.contact.social.github.handle).toBeTruthy()
    expect(en.contact.social.linkedin.handle).toBeTruthy()
    expect(en.contact.social.email.handle).toBeTruthy()
  })

  it('social handles are defined in PT', () => {
    expect(pt.contact.social.github.handle).toBeTruthy()
    expect(pt.contact.social.linkedin.handle).toBeTruthy()
    expect(pt.contact.social.email.handle).toBeTruthy()
  })
})
