// Portfolio data shapes (RF-23, RF-25).
// These document the locale-array records consumed by the section components.
// Every field maps to an RF; narrative prose is deferred TBD (M-02/M-04) and is
// therefore optional so that placeholder / partial entries render empty-safe
// (RF-24, RF-25) without throwing.

/** A project renders in exactly one section based on its status (RF-19). */
export type CaseStudyStatus = 'shipped' | 'building'

/**
 * A single entry in the project catalog (RF-19, RF-23).
 * Featured Projects renders `status: 'shipped'` as full case studies; Currently
 * Building renders `status: 'building'`. De-duplicated by `id`.
 *
 * The eight narrative blocks of RF-20 are: image, description, problem,
 * solution, architecture, techStack, challenges, results — the seven prose
 * blocks are optional (empty-safe, RF-24) while `image` is the image path.
 */
export interface CaseStudy {
  id: string
  title: string
  status: CaseStudyStatus
  /** Image block (RF-20) / image path used by the renderer. */
  image: string
  /** Live project URL for the "View Project" button (RF-21). */
  liveUrl: string
  /** Optional source-code URL; when present renders "Source Code" (RF-22). */
  repoUrl?: string
  /** Tech-stack tags rendered as chips. */
  tags: string[]
  // Narrative blocks (RF-20) — prose deferred TBD, empty-safe (RF-24).
  description?: string
  problem?: string
  solution?: string
  architecture?: string
  techStack?: string
  challenges?: string
  results?: string
}

/**
 * A professional experience timeline entry (RF-25, RF-26).
 * Carries six fields; `businessImpact` is distinct from `responsibilities` so
 * an entry emphasizes impact rather than a bare task list (RF-26).
 */
export interface ExperienceEntry {
  company: string
  role: string
  period: string
  responsibilities: string[]
  technologies: string[]
  businessImpact: string
}

/** A measurable-impact item, e.g. 6+ years / 20+ projects (RF-14, RF-15). */
export interface ImpactMetric {
  value: string
  label: string
}

/** A "What I Do" capability card (RF-16, RF-17). */
export interface Capability {
  title: string
  description: string
}

/** An engineering principle item (RF-18). */
export interface Principle {
  label: string
}
