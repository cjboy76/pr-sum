import dayjs from "dayjs"
import { useQuery } from "@apollo/client"
import { ContributionsQuery } from "./api/github"

export function useContributions(month: Date | undefined) {
  const isValidated = Boolean(month)
  const variables = {
    from: month ? dayjs(month).startOf('month').toISOString() : '',
    to: month ? dayjs(month).endOf('month').toISOString() : ''
  }
  return useQuery(ContributionsQuery, {
    variables,
    skip: !isValidated
  })
}