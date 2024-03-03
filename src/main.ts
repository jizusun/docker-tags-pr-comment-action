import * as core from '@actions/core'
import { formatDockerTags } from './formatter'

/**
 * The main function for the action.
 * @returns void
 */
export function run(): void {
  try {
    const dockerTags: string = core.getInput('docker-tags')

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`docker-tags: ${dockerTags} `)

    const markdownString = formatDockerTags(dockerTags)

    // Set outputs for other workflow steps to use
    core.setOutput('markdown-string', markdownString)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
