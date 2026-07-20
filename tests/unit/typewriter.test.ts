import { describe, it, expect } from 'vitest'

/**
 * Pure state-machine logic extracted from HeroSection.vue typewriter effect.
 * This function advances the typewriter by one tick given the current state.
 */
type Phase = 'typing' | 'pause' | 'deleting'

interface TypewriterState {
  display: string
  charIndex: number
  phase: Phase
  roleIdx: number
}

function tickTypewriter(state: TypewriterState, roles: string[]): TypewriterState {
  const { charIndex, phase, roleIdx } = state
  const currentRole = roles[roleIdx % roles.length] ?? ''

  if (phase === 'typing') {
    if (charIndex < currentRole.length) {
      const next = charIndex + 1
      return { ...state, charIndex: next, display: currentRole.slice(0, next) }
    }
    return { ...state, phase: 'pause' }
  }

  if (phase === 'pause') {
    return { ...state, phase: 'deleting' }
  }

  // deleting
  if (charIndex > 0) {
    const next = charIndex - 1
    return { ...state, charIndex: next, display: currentRole.slice(0, next) }
  }

  return {
    display: '',
    charIndex: 0,
    phase: 'typing',
    roleIdx: (roleIdx + 1) % roles.length,
  }
}

const roles = ['Vue Developer', 'Laravel Engineer']

describe('typewriter state machine', () => {
  it('types the first character on first tick', () => {
    const initial: TypewriterState = {
      display: '',
      charIndex: 0,
      phase: 'typing',
      roleIdx: 0,
    }
    const next = tickTypewriter(initial, roles)
    expect(next.display).toBe('V')
    expect(next.charIndex).toBe(1)
    expect(next.phase).toBe('typing')
  })

  it('transitions to pause when word is fully typed', () => {
    const atEnd: TypewriterState = {
      display: 'Vue Developer',
      charIndex: 13,
      phase: 'typing',
      roleIdx: 0,
    }
    const next = tickTypewriter(atEnd, roles)
    expect(next.phase).toBe('pause')
    expect(next.display).toBe('Vue Developer')
  })

  it('transitions from pause to deleting', () => {
    const paused: TypewriterState = {
      display: 'Vue Developer',
      charIndex: 13,
      phase: 'pause',
      roleIdx: 0,
    }
    expect(tickTypewriter(paused, roles).phase).toBe('deleting')
  })

  it('deletes one character per tick', () => {
    const deleting: TypewriterState = {
      display: 'Vue Developer',
      charIndex: 13,
      phase: 'deleting',
      roleIdx: 0,
    }
    const next = tickTypewriter(deleting, roles)
    expect(next.charIndex).toBe(12)
    expect(next.display).toBe('Vue Develope')
  })

  it('cycles to the next role when charIndex reaches 0', () => {
    // charIndex is already 0: the deletion is done, next tick cycles the role
    const empty: TypewriterState = {
      display: '',
      charIndex: 0,
      phase: 'deleting',
      roleIdx: 0,
    }
    const next = tickTypewriter(empty, roles)
    expect(next.roleIdx).toBe(1)
    expect(next.phase).toBe('typing')
    expect(next.charIndex).toBe(0)
    expect(next.display).toBe('')
  })

  it('deletes last visible character before cycling (charIndex: 1 → 0)', () => {
    // With charIndex: 1 we still decrement — cycling only happens on the next tick
    const lastChar: TypewriterState = {
      display: 'V',
      charIndex: 1,
      phase: 'deleting',
      roleIdx: 0,
    }
    const next = tickTypewriter(lastChar, roles)
    expect(next.charIndex).toBe(0)
    expect(next.display).toBe('')
    expect(next.phase).toBe('deleting') // still deleting, not cycling yet
    expect(next.roleIdx).toBe(0) // role unchanged
  })

  it('wraps back to role 0 after the last role', () => {
    const lastRole: TypewriterState = {
      display: '',
      charIndex: 0,
      phase: 'deleting',
      roleIdx: 1,
    }
    const next = tickTypewriter(lastRole, roles)
    expect(next.roleIdx).toBe(0)
  })

  it('handles an empty roles array without throwing', () => {
    const state: TypewriterState = {
      display: '',
      charIndex: 0,
      phase: 'typing',
      roleIdx: 0,
    }
    // With empty roles, currentRole is '' and typing immediately finishes
    const next = tickTypewriter(state, [])
    expect(next.phase).toBe('pause')
  })
})
