import { describe, it, expect } from 'vitest'

/**
 * Pure function extracted from ProjectSection.vue
 * bufferPercent computes how full the rolling buffer bar is.
 */
function bufferPercent(countdown: number, maxSeconds = 25): number {
  return ((maxSeconds - countdown) / maxSeconds) * 100
}

describe('bufferPercent', () => {
  it('is 0% when countdown equals max (buffer just reset)', () => {
    expect(bufferPercent(25)).toBe(0)
  })

  it('is 100% when countdown reaches 0 (buffer is full)', () => {
    expect(bufferPercent(0)).toBe(100)
  })

  it('is 50% at the midpoint', () => {
    expect(bufferPercent(12.5)).toBe(50)
  })

  it('increases as countdown decreases', () => {
    expect(bufferPercent(20)).toBeLessThan(bufferPercent(10))
  })

  it('is always between 0 and 100 for valid inputs', () => {
    for (const n of [0, 5, 10, 15, 20, 25]) {
      const result = bufferPercent(n)
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThanOrEqual(100)
    }
  })

  it('respects a custom maxSeconds', () => {
    expect(bufferPercent(15, 30)).toBe(50)
  })
})
