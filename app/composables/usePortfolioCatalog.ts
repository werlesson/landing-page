import type { CaseStudy, CaseStudyStatus } from '~/types/portfolio'

// Shared read/partition surface over the single project catalog (RF-19, RF-23).
// Featured Projects renders `status: 'shipped'`; Currently Building renders
// `status: 'building'`. De-duplication by `id` here is the single source of the
// mutual-exclusion guarantee (RF-19/RF-29/RF-30): a project id can only appear
// in one partition.

function asString(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : []
}

/**
 * Coerce a raw locale-array catalog into typed, de-duplicated `CaseStudy`
 * records. Malformed or id-less entries are dropped; duplicate ids keep the
 * first occurrence. Every prose block is empty-safe (RF-24): absent strings
 * become `undefined` so renderers can omit them.
 */
export function normalizeCaseStudies(raw: unknown): CaseStudy[] {
  if (!Array.isArray(raw)) {
    return []
  }
  const seen = new Set<string>()
  const result: CaseStudy[] = []
  for (const entry of raw) {
    if (!entry || typeof entry !== 'object') {
      continue
    }
    const o = entry as Record<string, unknown>
    const id = asString(o.id)
    if (!id || seen.has(id)) {
      continue
    }
    seen.add(id)
    const status: CaseStudyStatus = o.status === 'building' ? 'building' : 'shipped'
    result.push({
      id,
      title: asString(o.title),
      status,
      image: asString(o.image),
      liveUrl: asString(o.liveUrl),
      repoUrl: asString(o.repoUrl) || undefined,
      tags: asStringArray(o.tags),
      description: asString(o.description) || undefined,
      problem: asString(o.problem) || undefined,
      solution: asString(o.solution) || undefined,
      architecture: asString(o.architecture) || undefined,
      techStack: asStringArray(o.techStack),
      challenges: asString(o.challenges) || undefined,
      results: asString(o.results) || undefined,
    })
  }
  return result
}

/** Partition a catalog into shipped/building sets, de-duplicated by id. */
export function partitionCaseStudies(raw: unknown): {
  catalog: CaseStudy[]
  shipped: CaseStudy[]
  building: CaseStudy[]
} {
  const catalog = normalizeCaseStudies(raw)
  return {
    catalog,
    shipped: catalog.filter((p) => p.status === 'shipped'),
    building: catalog.filter((p) => p.status === 'building'),
  }
}

/**
 * Reactive catalog partitions sourced from the active-locale message tree
 * (`featuredProjects.projects`). Recomputes on locale change.
 */
export function usePortfolioCatalog() {
  // Read from the reactive `messages` ref (not `getLocaleMessage()`): in dev,
  // `@nuxtjs/i18n` lazy-loads locale files *after* first render, and a computed
  // that only depends on `locale.value` never recomputes when the messages
  // finally arrive — so the project cards stayed empty in `nuxt dev` while the
  // section header (`$t`, reactive to load) rendered. `messages` tracks the
  // load, so the catalog recomputes once the locale is available.
  const { locale, messages } = useI18n()

  const catalog = computed(() => {
    const tree = messages.value[locale.value] as
      | { featuredProjects?: { projects?: unknown } }
      | undefined
    return normalizeCaseStudies(tree?.featuredProjects?.projects)
  })

  const shipped = computed(() => catalog.value.filter((p) => p.status === 'shipped'))
  const building = computed(() => catalog.value.filter((p) => p.status === 'building'))

  return { catalog, shipped, building }
}
