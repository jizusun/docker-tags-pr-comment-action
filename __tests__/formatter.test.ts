/**
 * Unit tests for src/wait.ts
 */

import { formatDockerTags, getDockerImageName } from '../src/formatter'
import { expect } from '@jest/globals'

describe('formatter.ts', () => {
  it('converts a string of docker tags into a string of markdown bullet list, each tag as inline code', async () => {
    const input =
      'ghcr.io/jizusun/action-detect-secrets:pr-3\nghcr.io/jizusun/action-detect-secrets:sha-7200ec4'
    const actual = formatDockerTags(input)
    const expected = `- \`ghcr.io/jizusun/action-detect-secrets:pr-3\`
- \`ghcr.io/jizusun/action-detect-secrets:sha-7200ec4\``
    expect(actual).toBe(expected)
  })

  it('converts a string of docker tags into a string of docker image name', async () => {
    const input =
      'ghcr.io/jizusun/action-detect-secrets:pr-3\nghcr.io/jizusun/action-detect-secrets:sha-7200ec4'
    const actual = getDockerImageName(input)
    const expected = `ghcr.io/jizusun/action-detect-secrets`
    expect(actual).toBe(expected)
  })
})
