import { gql } from "@/__generated__"

export const UserQuery = gql(`
    query User{
        viewer {
            login
        }
    }
`)

export const ContributionsQuery = gql(`
  query Contributions($from: DateTime!, $to: DateTime!, $size: Int = 50) {
    viewer {
        contributionsCollection(from: $from, to: $to) {
            pullRequestContributionsByRepository {
                repository {
                    name
                    nameWithOwner
                    isPrivate
                    owner {
                        login
                    }
                }
                contributions(first: $size) {
                    nodes {
                        pullRequest {
                            title
                            state
                            updatedAt
                            url
                            body
                            author {
                                login
                            }
                            id
                        }
                    }
                }
            }
        }
    }
  }
`)
