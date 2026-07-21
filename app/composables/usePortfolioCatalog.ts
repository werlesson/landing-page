import type { CaseStudy, CaseStudyStatus, ProjectMetric } from '~/types/portfolio'

// Shared read/partition surface over the single project catalog (RF-19, RF-23).
// Featured Projects renders `status: 'shipped'`; Currently Building renders
// `status: 'building'`. De-duplication by `id` here is the single source of the
// mutual-exclusion guarantee (RF-19/RF-29/RF-30): a project id can only appear
// in one partition.

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

/** Coerce a raw list into typed `{ value, label }` metrics; empty entries dropped. */
function normalizeProjectMetrics(raw: unknown): ProjectMetric[] | undefined {
  const list = asList(raw)
    .map((entry) => {
      const o = entry && typeof entry === 'object' ? (entry as Record<string, unknown>) : {}
      return { value: asString(o.value), label: asString(o.label) }
    })
    .filter((m) => m.value || m.label)
  return list.length ? list : undefined
}

/**
 * Coerce a raw locale-array catalog into typed, de-duplicated `CaseStudy`
 * records. Malformed or id-less entries are dropped; duplicate ids keep the
 * first occurrence. Every prose block is empty-safe (RF-24): absent strings
 * become `undefined` so renderers can omit them.
 */
export function normalizeCaseStudies(raw: unknown): CaseStudy[] {
  const list = asList(raw)
  if (!list.length) {
    return []
  }
  const seen = new Set<string>()
  const result: CaseStudy[] = []
  for (const entry of list) {
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
      privateRepoNote: asString(o.privateRepoNote) || undefined,
      summary: asString(o.summary) || undefined,
      metrics: normalizeProjectMetrics(o.metrics),
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

function resolveMessage(t: (key: string) => string, key: string): string {
  const value = t(key)
  // Missing keys resolve back to the path itself in vue-i18n.
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

/**
 * Resolve an array of `{ value, label }` metric objects from the message tree.
 * Length is probed from the raw locale node (nested objects in i18n arrays are
 * not readable as plain props), then each field resolved by dotted key.
 */
function resolveProjectMetrics(
  t: (key: string) => string,
  base: string,
  metricsRaw: unknown,
): ProjectMetric[] {
  const len = asList(metricsRaw).length
  return Array.from({ length: len }, (_, j) => ({
    value: resolveMessage(t, `${base}.metrics.${j}.value`),
    label: resolveMessage(t, `${base}.metrics.${j}.label`),
  }))
}

/**
 * Reactive catalog partitions sourced from the active-locale message tree
 * (`featuredProjects.projects`). Recomputes on locale change.
 *
 * Nested objects inside i18n arrays are not readable as plain props via
 * `getLocaleMessage` — the same pattern as WhatIDo/Impact: probe length, then
 * resolve each field with `t('featuredProjects.projects.${i}.…')`.
 */
export function usePortfolioCatalog() {
  const { locale, messages, getLocaleMessage, t } = useI18n()

  const catalog = computed(() => {
    void messages.value[locale.value]
    const tree = getLocaleMessage(locale.value) as {
      featuredProjects?: { projects?: unknown }
    }
    const list = asList(tree.featuredProjects?.projects)
    const len = list.length

    const raw = Array.from({ length: len }, (_, i) => {
      const base = `featuredProjects.projects.${i}`
      return {
        id: resolveMessage(t, `${base}.id`),
        status: resolveMessage(t, `${base}.status`),
        title: resolveMessage(t, `${base}.title`),
        image: resolveMessage(t, `${base}.image`),
        liveUrl: resolveMessage(t, `${base}.liveUrl`),
        repoUrl: resolveMessage(t, `${base}.repoUrl`),
        privateRepoNote: resolveMessage(t, `${base}.privateRepoNote`),
        summary: resolveMessage(t, `${base}.summary`),
        metrics: resolveProjectMetrics(t, base, (list[i] as Record<string, unknown>)?.metrics),
        tags: resolveMessageList(t, `${base}.tags`),
        description: resolveMessage(t, `${base}.description`),
        problem: resolveMessage(t, `${base}.problem`),
        solution: resolveMessage(t, `${base}.solution`),
        architecture: resolveMessage(t, `${base}.architecture`),
        techStack: resolveMessageList(t, `${base}.techStack`),
        challenges: resolveMessage(t, `${base}.challenges`),
        results: resolveMessage(t, `${base}.results`),
      }
    })

    return normalizeCaseStudies(raw)
  })

  const shipped = computed(() => catalog.value.filter((p) => p.status === 'shipped'))
  const building = computed(() => catalog.value.filter((p) => p.status === 'building'))

  return { catalog, shipped, building }
}
