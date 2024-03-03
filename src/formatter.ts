/**
 * Converts docker tags string into a markdown bullet list string.
 * @param dockerTags The docker tags string.
 * @returns string The markdown bullet list string.
 */

export function formatDockerTags(dockerTags: string): string {
  return dockerTags
    .split('\n')
    .map(tag => `- \`${tag}\``)
    .join('\n')
}
