import type { ExperienceEntry } from '~/types/portfolio'

// Read/normalize surface over the `experience.entries` locale array (RF-25,
// RF-26). Entries are empty-safe: real copy is deferred TBD (M-04) so partial
// or empty entries must render without throwing. `businessImpact` is kept as a
// distinct field, never merged into `responsibilities` (RF-26).

function asString(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : []
}

/** Coerce a raw locale-array into typed, empty-safe `ExperienceEntry` records. */
export function normalizeExperienceEntries(raw: unknown): ExperienceEntry[] {
  if (!Array.isArray(raw)) {
    return []
  }
  return raw.map((entry) => {
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

/** Reactive experience entries sourced from the active-locale message tree. */
export function useExperience() {
  const { locale, getLocaleMessage } = useI18n()

  const entries = computed(() => {
    const tree = getLocaleMessage(locale.value) as {
      experience?: { entries?: unknown }
    }
    return normalizeExperienceEntries(tree.experience?.entries)
  })

  return { entries }
}
