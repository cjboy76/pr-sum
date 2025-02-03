import { ContributionsQuery, PullRequest } from "@/__generated__/types"
import { DeepPartial } from "@apollo/client/utilities"

function _pullRequestTemplate(pullRequest: DeepPartial<PullRequest>, repoName: string) {
  return `
## Title: ${pullRequest.title}
## Repository: ${repoName}
## Status: ${pullRequest.state}
## Changes: 
${pullRequest.body}
---------------------------------------
  `
}


export function getPrompt(repos: ContributionsQuery['viewer']['contributionsCollection']['pullRequestContributionsByRepository']) {
  let content = ''
  for (const repo of repos) {
    if (!repo.contributions.nodes) continue
    for (const node of repo.contributions.nodes) {
      if (!node) continue
      content += _pullRequestTemplate(node.pullRequest, repo.repository.name)
    }
  }
  return content
}