import dayjs from "dayjs"
import { useQuery } from "urql"
import { ContributionsQuery } from "./api/github"

export function useContributions(month: Date | undefined) {
    const isValidated = Boolean(month)
    const variables = {
      from: month ? dayjs(month).startOf('month').toISOString(): '',
      to: month ? dayjs(month).endOf('month').toISOString(): ''
    }
    const [{ data, fetching }] = useQuery({ 
      query: ContributionsQuery,
      variables,
      pause: !isValidated
    })
    if (!data) return [data, fetching]
    return [data.viewer.contributionsCollection.pullRequestContributionsByRepository, fetching]
  }