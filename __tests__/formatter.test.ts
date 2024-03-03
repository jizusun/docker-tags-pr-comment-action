/**
 * Unit tests for src/wait.ts
 */

import { formatDockerTags } from '../src/formatter'
import { expect } from '@jest/globals'

describe('formatter.ts', () => {
  it('converts docker tags string into a markdown bullet list string', async () => {
    const input = 'ghcr.io/jizusun/action-detect-secrets:pr-3 ghcr.io/jizusun/action-detect-secrets:sha-7200ec4'
    const actual = formatDockerTags(input)
    const expected = `- ghcr.io/jizusun/action-detect-secrets:pr-3
- ghcr.io/jizusun/action-detect-secrets:sha-7200ec4`
    expect(actual).toBe(expected)
  })
})
