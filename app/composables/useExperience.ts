import type { ExperienceEntry } from '~/types/portfolio'

// Read/normalize surface over the `experience.entries` locale array (RF-25,
// RF-26). Entries are empty-safe: real copy is deferred TBD (M-04) so partial
// or empty entries must render without throwing. `businessImpact` is kept as a
// distinct field, never merged into `responsibilities` (RF-26).

function asString(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

/** vue-i18n sometimes exposes JSON arrays as objects with numeric keys. */
function asList(raw: unknown): unknown[] {
  if (Array.isArray(raw)) {
    return raw
  }
  if (raw && typeof raw === 'object') {
    return Object.values(raw as Record<string, unknown>)
  }
  return []
}

function asStringArray(value: unknown): string[] {
  return asList(value).filter((v): v is string => typeof v === 'string')
}

/** Coerce a raw locale-array into typed, empty-safe `ExperienceEntry` records. */
export function normalizeExperienceEntries(raw: unknown): ExperienceEntry[] {
  return asList(raw).map((entry) => {
    const o = entry && typeof entry === 'object' ? (entry as Record<string, unknown>) : {}
    return {
      company: asString(o.company),
      role: asString(o.role),
      period: asString(o.period),
      responsibilities: asStringArray(o.responsibilities),
      technologies: asStringArray(o.technologies),
      businessImpact: asString(o.businessImpact),
    }
  })
}

function resolveMessage(t: (key: string) => string, key: string): string {
  const value = t(key)
  return value === key ? '' : value
}

function resolveMessageList(t: (key: string) => string, baseKey: string, max = 24): string[] {
  const out: string[] = []
  for (let i = 0; i < max; i++) {
    const value = resolveMessage(t, `${baseKey}.${i}`)
    if (!value) {
      break
    }
    out.push(value)
  }
  return out
}

/** Reactive experience entries sourced from the active-locale message tree. */
export function useExperience() {
  // Nested objects inside i18n arrays are resolved via `t('experience.entries.${i}.…')`
  // — same pattern as WhatIDo/Impact (plain getLocaleMessage props are empty).
  const { locale, messages, getLocaleMessage, t } = useI18n()

  const entries = computed(() => {
    void messages.value[locale.value]
    const tree = getLocaleMessage(locale.value) as {
      experience?: { entries?: unknown }
    }
    const list = asList(tree.experience?.entries)
    const raw = Array.from({ length: list.length }, (_, i) => {
      const base = `experience.entries.${i}`
      return {
        company: resolveMessage(t, `${base}.company`),
        role: resolveMessage(t, `${base}.role`),
        period: resolveMessage(t, `${base}.period`),
        responsibilities: resolveMessageList(t, `${base}.responsibilities`),
        technologies: resolveMessageList(t, `${base}.technologies`),
        businessImpact: resolveMessage(t, `${base}.businessImpact`),
      }
    })
    return normalizeExperienceEntries(raw)
  })

  return { entries }
}
